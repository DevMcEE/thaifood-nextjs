import { MenuItem } from "../../menu/menu.type";


interface MenuItemBlockProps {
  menuItem: MenuItem;
}

export const MenuItemBlock = ({ menuItem }: MenuItemBlockProps): JSX.Element => {
  const { code, name, price } = menuItem;

  return (
    <>
      <div>
        <div className="menu-item">
          <span className="item-code">{code}</span>
          <span className="item-name">{name}</span>
          <span className="item-blank-space"></span>
          <span className="item-price">{price}</span>
        </div>
      </div>
    </>
  );
};