import { GetServerSideProps } from 'next';
import { FooterBlock } from '../../components/FooterBlock';
import { Meta } from '../../components/Meta';
import { Toolbar } from '../../components/Toolbar';
import { MenuGroup } from '../../menu/menu.type';

interface MenuPageProps {
  menu: MenuGroup[];
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
              menu.map(({ name, items, _id }) => {
                return (<div className="menu-group" key={_id}>
                  <h3>{name}</h3>
                  <div>
                    {items.map(({ code, name, price }) => {
                      return (
                        <div className="menu-item" key={code}>
                          <span className="item-code">{code}</span>
                          <span className="item-name">{name}</span>
                          <span className="item-blank-space"></span>
                          <span className="item-price">{price}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>)
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
