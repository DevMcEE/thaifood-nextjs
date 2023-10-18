import { GetServerSideProps } from 'next';
import { FooterBlock } from '../../components/FooterBlock';
import { Meta } from '../../components/Meta';
import { Toolbar } from '../../components/Toolbar';
import { IMenuGroup, IMenuNavGroup } from '../../menu/menu.type';
import { MenuGroup } from '../../menu/MenuGroup';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NavigationBar } from '../../menu/MenuNavigationBar';
import { SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useRefStorage } from '../../hooks/useRefStorage';
import { SearchBar } from '../../menu/SearchBar/SearchBar';
import { useMenuFilter } from '../../menu/hooks/useMenuFilter';
import { MenuPlaceHolder } from '../../menu/MenuPlaceHolder';
import Image from 'next/image';
import { Cloudinary } from '@cloudinary/url-gen';

export interface MenuPageProps {
  menuList: IMenuGroup[];
}

export const VIEW_MODE_TYPE = {
  grid: 'grid',
  list: 'list',
} as const;

type ViewModeType = typeof VIEW_MODE_TYPE[keyof typeof VIEW_MODE_TYPE];

export default function Menu({ menuList }: MenuPageProps) {
  const { t } = useTranslation();
  const { grid, list } = VIEW_MODE_TYPE;
  const [{ menu, searchText }, handleSearchText, clearSearch] = useMenuFilter(menuList);
  const [activeGroupId, setActiveGroupId] = useState('');
  const [viewMode, setViewMode] = useState<ViewModeType>(grid);

  const toggleViewMode = () => {
    setViewMode((prevViewMode) => (prevViewMode === grid ? list : grid));
  };

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

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    document.body.scroll({ top: 0 });

  }, []);

  const cdn = useMemo(() => {
    return new Cloudinary({
      cloud: {
        cloudName: process.env.cdnName,
      }
    });
  }, []);

  const [menuGroupItemsList, menuGroups] = useMemo(() => {
    const menuGroups: IMenuNavGroup[] = [];

    const menuGroupItemsList = menu.map((menuGroupData) => {
      const { id, name, description, hidden } = menuGroupData;
      const groupAnchor = name.toLowerCase().replaceAll(/\s+/g, '-');

      menuGroups.push({
        id,
        name,
        description,
        href: groupAnchor,
        isDisabled: hidden,
      });

      return (
        <MenuGroup
          hidden={hidden} 
          addToRefs={addDivToRefs} 
          href={groupAnchor} 
          viewMode={viewMode} 
          menuGroupData={menuGroupData} 
          key={`${id}-menu-group`}
          cdn={cdn}
        />
      );
    });

    return [menuGroupItemsList, menuGroups];
  }, [menu, addDivToRefs, viewMode]);


  const handleClick = (id: string, event: SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    setActiveGroupId(() => id);

    const menuGroup = menuGroups.find(({ id: menuGroupId }) => menuGroupId === id);
    const menuGroupHref = menuGroupsRefs.current.find((item) => item.id === menuGroup.href);

    const offset = 135;

    document.body.scrollTo({
      top: menuGroupHref.offsetTop - offset,
      behavior: 'smooth',
    });

    scrollToLeft(menuGroup.id);
  };

  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const groupName = entry.target.id;
      const { groupId } = (entry.target as HTMLElement).dataset;
      const { isIntersecting } = entry;

      if (isIntersecting) {
        setActiveGroupId(() => groupId);
        scrollToLeft(groupName);
      }
    }
    );
  }, []);


  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const viewObserverOptions = {
      list: {
        rootMargin: '-20% 0% -80% 0%',
        threshold: 0
      },
      grid: {
        rootMargin: '5% 0% -50% 0%',
        threshold: 0.1,
      }
    };

    const observerOptions: IntersectionObserverInit = viewObserverOptions[viewMode];
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    menuGroupsRefs.current.forEach((group) => {
      observer.observe(group);
    });

    return () => {
      observer.disconnect();
    };
  }, [menuGroupsRefs, menu, searchText, viewMode, observerCallback]);

  const url = useMemo(() => `/assets/images/icons/${viewMode === grid ? 'list' : 'grid'}.svg`, [grid, viewMode]);

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
              {menuList?.length ?
                <div className="menu-content-block__navigation">
                  <div className="menu-content-block__search-bar">
                    <SearchBar clearSearch={clearSearch} storedSearch={searchText} handleSearchText={handleSearchText} />
                    <button className="view-mode-toggle-button" onClick={toggleViewMode}>
                      <Image alt="toggle view button" src={url} width={24} height={24}></Image>
                    </button>
                  </div>
                  <NavigationBar activeId={activeGroupId} addToRefs={addLinksToRefs} menuGroups={menuGroups} setActiveId={handleClick} />
                </div> : <></>}
              <div className="menu-content-block__menu-content">{
                menu.find(group => !group.hidden)
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