import { GetServerSideProps } from 'next';
import { FooterBlock } from '../../components/FooterBlock';
import { Meta } from '../../components/Meta';
import { Toolbar } from '../../components/Toolbar';
import { IMenuGroup } from '../../menu/menu.type';
import { MenuGroup } from '../../components/MenuGroup';
import { Maintenance } from '../../components/Maintenance';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NavigationSideBar } from '../../components/NavigationSideBar';
import { useEffect, useRef, useState } from 'react';
import { useRefStorage } from '../../hooks/useRefStorage';
import { removeSpaces } from '../../utils/text.utils';

interface MenuPageProps {
  menu: IMenuGroup[];
}

export default function Menu({ menu }: MenuPageProps) {
  
  const menuGroupNames:string[] = menu.map(category => removeSpaces(category.name));
  const { t } = useTranslation();
  const clickedRef = useRef(false);
  const unsetClickedRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState<number | undefined>(0);
  const minScreenWidth: number = 768;
  const [inFocusMenuGroup, setInFocusMenuGroup] = useState<string | null>(null);
  const { refCollection: menuGroupsRefs, addToRefs: addDivToRefs} = useRefStorage();
  const { refCollection: refLinks, addToRefs: addLinksToRefs } = useRefStorage(); 

  const scrollToLeft = (groupID: string) => {
    const activeElement: HTMLElement | undefined = refLinks.current.find(item => item.id === `${groupID}-nav-link`);

    if (activeElement) {
      const containerElement = activeElement.parentElement;
      containerElement?.scrollTo({
        left: activeElement?.offsetLeft - 5, 
        behavior: "smooth"
    })
    }
  }

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateScreenWidth);
    }

    return () => {

      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateScreenWidth);
      }
    };
  }, []);

  const handleClick = (groupName: string) => {
    clickedRef.current = true;
    unsetClickedRef.current = setTimeout(() => {
      clickedRef.current = false;      
    }, 100);
  
    setInFocusMenuGroup(groupName);
      
    if(screenWidth <= minScreenWidth) {
      scrollToLeft(groupName);
    }
  };

  useEffect(
    () => () => {
      clearTimeout(unsetClickedRef.current);
    },
    [],
  );

  useEffect(() => {
   
    if (typeof window !== 'undefined') {
      const observerCallback = (entries: IntersectionObserverEntry[]) => {

        if (clickedRef.current) {
          return;
        }

        entries.forEach((entry) => {
          const {isIntersecting, intersectionRatio } = entry;
          
          const groupID = entry.target.id;

          if (isIntersecting && intersectionRatio > 0.1) {
            setInFocusMenuGroup(groupID);

            if (screenWidth <= minScreenWidth) {
              scrollToLeft(groupID);
              }

          } 
          
        }
        );
      };

    const observerOptions: IntersectionObserverInit = {
      rootMargin: "0% 0% -89% 0%",
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    menuGroupsRefs.current.forEach((group: HTMLElement) => {
      observer.observe(group);
    });
 
    return () => {
      observer.disconnect();
    };
  }
  }, [menuGroupsRefs, screenWidth]);


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
                <NavigationSideBar addToRefs={addLinksToRefs} menuGroupNames={menuGroupNames} selectedMenuGroup={inFocusMenuGroup} setGroupName={handleClick} />
              </div>
              <div className="menu-content-block__menu-content">{
                menu.length
                  ? menu.map((menuGroupData) => {
                    return (<MenuGroup addToRefs={addDivToRefs} menuGroupData={menuGroupData} key={menuGroupData.id} />)
                  })
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