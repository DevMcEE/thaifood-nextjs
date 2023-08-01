import { GetServerSideProps } from 'next';
import { FooterBlock } from '../../components/FooterBlock';
import { Meta } from '../../components/Meta';
import { Toolbar } from '../../components/Toolbar';
import { IMenuGroup } from '../../menu/menu.type';
import { MenuGroup } from '../../components/MenuGroup';

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
              menu.map((menuGroupData) => {
                return (<MenuGroup menuGroupData={menuGroupData} key={menuGroupData._id} />)
              })
            }</div>
          </div>
        </main>
        <FooterBlock />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<MenuPageProps> = async () => {
  const res = await fetch('https://api.milicity.eu/resto/v1/menu')
  const { data } = await res.json();
  return { props: { menu: data || [] } }
}
