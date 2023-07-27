import { GetServerSideProps } from 'next';
import { FooterBlock } from '../../components/FooterBlock';
import { Meta } from '../../components/Meta';
import { Toolbar } from '../../components/Toolbar';
import { MenuGroup } from '../../menu/menu.type';

interface MenuPageProps {
  menu: MenuGroup[];
}

export default function Menu({menu}:MenuPageProps) {
  console.log({menu});
  return (
    <>
    <Meta />
    <Toolbar />
    <div className="body-container">
      <main className="content-container main-page__content">
        <div className="content-block">
          <div className="content-block__title">
            <h2>Menu</h2>
          </div>
          <div className="content-block__content">{
            menu.map(({name,items,_id})=> {
              return (<div key={_id}>
                <h3>{name}</h3>
                <div>
                  {items.map(({code,name,price})=> { 
                    return (
                      <div key={code}>
                        <span>{code}</span>
                        <span>{name}</span>
                        <span>{price}</span>
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
  const {data} = await res.json();
  return { props: { menu: data || [] } }
}
