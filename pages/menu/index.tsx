import { GetServerSideProps } from 'next';
import { FooterBlock } from '../../components/FooterBlock';
import { Meta } from '../../components/Meta';
import { Toolbar } from '../../components/Toolbar';
import { IMenuGroup, IMenuNavGroup } from '../../menu/menu.type';
import { MenuGroup } from '../../components/MenuGroup';
import { Maintenance } from '../../components/Maintenance';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NavigationSideBar } from '../../components/NavigationSideBar';
import { SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRefStorage } from '../../hooks/useRefStorage';

interface MenuPageProps {
  menu: IMenuGroup[];
}

export default function Menu({ menu }: MenuPageProps) {
  const { t } = useTranslation();

  const [isSmallScreenWidth, setIsSmallScreenWidth] = useState(false);

  const { refCollection: menuGroupsRefs, addToRefs: addDivToRefs } = useRefStorage();
  const { refCollection: refLinks, addToRefs: addLinksToRefs } = useRefStorage();

  const [activeGroupId, setActiveGroupId] = useState('');

  const scrollToLeft = (groupID: string) => {
    const activeElement = refLinks.current.find(item => item.id === `${groupID}-nav-link`);

    if (activeElement) {
      activeElement.parentElement.scrollTo({
        left: activeElement?.offsetLeft - 5,
        behavior: 'smooth'
      })
    }
  }

  const updateScreenWidth = () => {
    const minScreenWidth: number = 768;

    setIsSmallScreenWidth(() => window.innerWidth < minScreenWidth);
  };

  const [menuGroupItemsList, menuGroups] = useMemo(() => {
    const menuGroups: IMenuNavGroup[] = [];

    const menuGroupItemsList = menu.map((menuGroupData) => {
      const { id, name, description } = menuGroupData;

      const groupAnchor = name.toLowerCase().replaceAll(/\s+/g, '-');

      menuGroups.push({
        id,
        name,
        description,
        href: groupAnchor,
      });

      return (<MenuGroup addToRefs={addDivToRefs} href={groupAnchor} menuGroupData={menuGroupData} key={`${id}-menu-group`} />)
    });

    return [menuGroupItemsList, menuGroups]
  }, [menu]);

  useEffect(() => {
    updateScreenWidth();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateScreenWidth);
    }
  
    return () => window.removeEventListener('resize', updateScreenWidth);
    ;
  }, []);

  const handleClick = (id: string, event: SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    setActiveGroupId(() => id)

    const menuGroup = menuGroups.find(({ id: menuGroupId }) => menuGroupId === id);
    const menuGroupHref = menuGroupsRefs.current.find((item) => item.id === menuGroup.href)

    document.body.scrollTo({
      top: menuGroupHref.offsetTop - 70,
      behavior: 'smooth',
    })

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
      rootMargin: "0% 0% -85% 0%",
      threshold: 0.1
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    menuGroupsRefs.current.forEach((group) => {
      observer.observe(group);
    });

    return () => {
      observer.disconnect();
    };
  }, [menuGroupsRefs, isSmallScreenWidth]);

  return (
    <>
      <Meta />
      <Toolbar />
      <div className="menu-body-container">
        <main className="menu-content-container menu-page__content">
          <div className="menu-content-block">
            <div className="menu-content-block__title content-block__title">
              <h2>{t('menu')}</h2>
            </div>
            <div className="menu-content-block__menu-list">
              <div className="menu-content-block__navigation">
                <NavigationSideBar activeId={activeGroupId} addToRefs={addLinksToRefs} menuGroups={menuGroups} setActiveId={handleClick} />
              </div>
              <div className="menu-content-block__menu-content">{
                menu.length
                  ? menuGroupItemsList
                  : <Maintenance />
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
    const res = await fetch(`https://api.milicity.eu/resto/v1/menu?lang=${locale}`);
    data = await res.json();

  } catch (error) {
    console.error('Error fetching menu:', error);
  };

  return {
    props: {
      menu: data || [],
      ...translations,
    }
  }
};