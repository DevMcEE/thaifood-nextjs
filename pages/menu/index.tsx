import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { FooterBlock } from '../../components/FooterBlock';
import { Meta } from '../../components/Meta';
import { Toolbar } from '../../components/Toolbar';
import { IMenuGroup } from '../../menu/menu.type';
import { MenuGroup } from '../../components/MenuGroup';
import { Maintenance } from '../../components/Maintenance/Maintenance';

interface MenuPageProps {
  menu: IMenuGroup[];
}

export default function Menu({ menu }: MenuPageProps) {
  return (
    <>
      <Meta />
      <Toolbar />
      <div className="menu-body-container">
        <main className="menu-content-container menu-page__content">
          <div className="menu-content-block">
            <div className="content-block__title">
              <h2>Menu</h2>
            </div>
            <div className="menu-content-block__content">{
              menu.length
              ? menu.map((menuGroupData) => {
                return (<MenuGroup menuGroupData={menuGroupData} key={menuGroupData.id} />)
               })
              : <Maintenance/>
            }</div>
          </div>
        </main>
        <FooterBlock />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<MenuPageProps> = async () => {

  let data: IMenuGroup[] = [];

  try {
    const res = await fetch('https://api.milicity.eu/resto/v1/menu');
    data = await res.json();
  } catch (error) {
    console.error('Error fetching menu:', error);
  }

  return {
    props: {
      menu: data || [],
    },
  };
};