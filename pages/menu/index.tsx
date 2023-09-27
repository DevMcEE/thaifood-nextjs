import { GetServerSideProps } from 'next';
import { FooterBlock } from '../../components/FooterBlock';
import { Meta } from '../../components/Meta';
import { Toolbar } from '../../components/Toolbar';
import { IMenuGroup, IMenuNavGroup } from '../../menu/menu.type';
import { MenuGroup } from '../../menu/MenuGroup';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NavigationSideBar } from '../../menu/MenuNavigationSideBar';
import { SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useRefStorage } from '../../hooks/useRefStorage';
import { SearchBar } from '../../menu/SearchBar/SearchBar';
import { useMenuFilter } from '../../menu/hooks/useMenuFilter';
import { MenuPlaceHolder } from '../../menu/MenuPlaceHolder';

export interface MenuPageProps {
  menuList: IMenuGroup[];
}

export default function Menu({ menuList }: MenuPageProps) {
  const { t } = useTranslation();
  const [{ menu, searchText }, handleSearchText, clearSearch] = useMenuFilter(menuList);
  const [isSmallScreenWidth, setIsSmallScreenWidth] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState('');

  const { refCollection: menuGroupsRefs, addToRefs: addDivToRefs } = useRefStorage();
  const { refCollection: refLinks, addToRefs: addLinksToRefs } = useRefStorage();

  const scrollToLeft = (groupID: string) => {
    const activeElement = refLinks.current.find(item => item.id === `${groupID}-nav-link`);

    if (activeElement) {
      activeElement.parentElement.scrollTo({
        left: activeElement?.offsetLeft - 5,
        behavior: 'smooth'
      });
    }
  };

  const updateScreenWidth = () => {
    const minScreenWidth: number = 768;

    setIsSmallScreenWidth(() => window.innerWidth < minScreenWidth);
  };

  const [menuGroupItemsList, menuGroups] = useMemo(() => {
    const menuGroups: IMenuNavGroup[] = [];

    menuList.map((menuGroupData) => {
      const { id, name, description } = menuGroupData;

      const groupAnchor = name.toLowerCase().replaceAll(/\s+/g, '-');

      menuGroups.push({
        id,
        name,
        description,
        href: groupAnchor,
        isDisabled: !menu.find(group => group.id === id),
      });
    });

    const menuGroupItemsList = menu.map((menuGroupData) => {
      const { id, name } = menuGroupData;

      const groupAnchor = name.toLowerCase().replaceAll(/\s+/g, '-');

      return (<MenuGroup addToRefs={addDivToRefs} href={groupAnchor} menuGroupData={menuGroupData} key={`${id}-menu-group`} />);
    });

    return [menuGroupItemsList, menuGroups];
  }, [searchText]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    updateScreenWidth();
    document.body.scroll({ top: 0 });

    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
    ;
  }, []);

  const handleClick = (id: string, event: SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    setActiveGroupId(() => id);

    const menuGroup = menuGroups.find(({ id: menuGroupId }) => menuGroupId === id);
    const menuGroupHref = menuGroupsRefs.current.find((item) => item.id === menuGroup.href);

    const offset = isSmallScreenWidth ? 140 : 70;

    document.body.scrollTo({
      top: menuGroupHref.offsetTop - offset,
      behavior: 'smooth',
    });

    if (isSmallScreenWidth) {
      scrollToLeft(menuGroup.name);
    }
  };

  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const groupName = entry.target.id;
      const { groupId } = (entry.target as HTMLElement).dataset;
      const { isIntersecting } = entry;

      if (isIntersecting) {
        setActiveGroupId(() => groupId);
        if (isSmallScreenWidth) {
          scrollToLeft(groupName);
        }
      }
    }
    );
  }, [isSmallScreenWidth]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const observerOptions: IntersectionObserverInit = {
      rootMargin: '0% 0% -85% 0%',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    menuGroupsRefs.current.forEach((group) => {
      observer.observe(group);
    });

    return () => {
      observer.disconnect();
    };
  }, [menuGroupsRefs, isSmallScreenWidth, menu, searchText]);

  return (
    <>
      <Meta />
      <Toolbar />
      <div className="menu-body-container">
        <main className="menu-content-container menu-page__content">
          <div className="menu-content-block">
            <div className="menu-content-block__title content-block__title">
              <h2>{t('menu.title')}</h2>
            </div>
            <div className="menu-content-block__menu-list">
              { menuList?.length ? 
              <div className="menu-content-block__navigation">
                <SearchBar clearSearch={clearSearch} storedSearch={searchText} handleSearchText={handleSearchText} />
                <NavigationSideBar activeId={activeGroupId} addToRefs={addLinksToRefs} menuGroups={menuGroups} setActiveId={handleClick} />
              </div> : <></>}
              <div className="menu-content-block__menu-content">{
                menu.length
                  ? menuGroupItemsList
                  : <MenuPlaceHolder clearSearch={clearSearch} searchText={searchText} />
              }
              </div>
            </div>
          </div>
        </main >
        <FooterBlock />
      </div >
    </>
  );
}


export const getServerSideProps: GetServerSideProps<MenuPageProps> = async (context) => {
  let data: IMenuGroup[] = [];

  const { locale } = context;
  const translations = await serverSideTranslations(locale, ['common']);

  try {
    const res = await fetch(`${process.env.apiUrl}/resto/v1/menu?lang=${locale}`);
    data = await res.json();

  } catch (error) {
    console.error('Error fetching menu:', error);
  };

  return {
    props: {
      menuList: data || [],
      ...translations,
    }
  };
};