import { GetStaticProps } from 'next';
import { FooterBlock } from '../../components/FooterBlock';
import { Meta } from '../../components/Meta';
import { Toolbar } from '../../components/Toolbar';
import { IMenuGroup } from '../../menu/menu.type';
import { MenuGroup } from '../../components/MenuGroup';
import { Maintenance } from '../../components/Maintenance';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface MenuPageProps {
  menu: IMenuGroup[];
}

export default function Menu({ menu }: MenuPageProps) {
  const { t } = useTranslation();

  return (
    <>
      <Meta />
      <Toolbar />
      <div className="menu-body-container">
        <main className="menu-content-container menu-page__content">
          <div className="menu-content-block">
            <div className="content-block__title">
              <h2>{t('menu')}</h2>
            </div>
            <LanguageSwitcher />
            <div className="menu-content-block__content">{
              menu.length
                ? menu.map((menuGroupData) => {
                  return (<MenuGroup menuGroupData={menuGroupData} key={menuGroupData.id} />)
                })
                : <Maintenance />
            }</div>
          </div>
        </main>
        <FooterBlock />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<MenuPageProps> = async (context) => {
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

