import { IMenuGroup } from '../menu.type';
import { MenuItem } from '../MenuItem';

interface MenuGroupProps {
  menuGroupData: IMenuGroup;
  href: string;
  addToRefs: (element: HTMLElement) => void;
}

export const MenuGroup = ({ menuGroupData, addToRefs, href }: MenuGroupProps): JSX.Element => {
  const { name, items, id, description } = menuGroupData;

  return (
    <div className="menu-group">
      <div className="menu-group-title">
        <h2 >{name}</h2>
        <h5 >{description}</h5>
      </div>

      <div id={href} data-group-id={id} ref={addToRefs}>
        {items.map((item) => {
          return <MenuItem key={item.id} menuItemData={item} />;
        })}
      </div>
    </div>
  );
};

