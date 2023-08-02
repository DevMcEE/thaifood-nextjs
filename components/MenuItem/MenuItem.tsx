import { IMenuItem } from "../../menu/menu.type";

interface MenuItemProps {
  menuItemData: IMenuItem;
}

export const MenuItem = ({ menuItemData }: MenuItemProps): JSX.Element => {
  const { code, name, price } = menuItemData;

  return (
    <div>
      <div className="menu-item">
        <span className="item-code">{code}</span>
        <span className="item-name">{name}</span>
        <span className="item-spacer"></span>
        <span className="item-price">{price}</span>
      </div>
    </div>
  );
};