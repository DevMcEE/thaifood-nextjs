import { IMenuItem } from '../menu.type';

interface MenuItemProps {
  menuItemData: IMenuItem;
}

export const MenuItem = ({ menuItemData }: MenuItemProps): JSX.Element => {
  const { name, price, description } = menuItemData;

  return (
    <div className="menu-item">
      <div className="item-details">
        <div className="item-name" dangerouslySetInnerHTML={{ __html: name }} />
        <div className="item-spacer"></div>
        <div className="item-price">{price}€</div>
      </div>
      <div className="item-description" dangerouslySetInnerHTML={{ __html: description }} />

    </div>
  );
};
