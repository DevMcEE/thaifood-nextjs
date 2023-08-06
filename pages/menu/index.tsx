import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { FooterBlock } from '../../components/FooterBlock';
import { Meta } from '../../components/Meta';
import { Toolbar } from '../../components/Toolbar';
import { IMenuGroup } from '../../menu/menu.type';
import { MenuGroup } from '../../components/MenuGroup';
import { Maintenance } from '../../components/Maintenance';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

interface MenuPageProps {
  menu: IMenuGroup[];
}

export default function Menu({ menu }: MenuPageProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const  { locales } = useRouter();
  
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
              menu
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

export const getServerSideProps: GetServerSideProps<MenuPageProps> = async (context) => {
  const { locale } = context;
  const res = await fetch('https://api.milicity.eu/resto/v1/menu')
  const data = await res.json();
  return { 
    props: { 
      ...(await serverSideTranslations(locale, ['common'])),
      menu: data || [],
    } 
  }  
}