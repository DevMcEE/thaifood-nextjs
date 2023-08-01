import { MenuGroup } from "../../menu/menu.type"
import { MenuItemBlock } from "../../components/MenuItemBlock";

interface MenuGroupBlockProps {
  menuGroup: MenuGroup;
}

export const MenuGroupBlock = ({ menuGroup }: MenuGroupBlockProps): JSX.Element => {
  const { name, items } = menuGroup;

  return (
    <>
      <div className="menu-group">
        <h3>{name}</h3>
        <div>
          {items.map((item) => {
            return <MenuItemBlock key={item._id} menuItem={item} />
          })}
        </div>
      </div>
    </>
  );
};

