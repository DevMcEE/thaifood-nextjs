import { IMenuGroup } from "../../menu/menu.type"
import { MenuItem } from "../MenuItem";

interface MenuGroupProps {
  menuGroupData: IMenuGroup;
  href: string;
  addToRefs: (element: HTMLElement) => void;
}

export const MenuGroup = ({ menuGroupData, addToRefs, href }: MenuGroupProps): JSX.Element => {
  const { name, items, id } = menuGroupData;

  return (
    <div className="menu-group">
      <h3 >{name}</h3>
      <div id={href} data-group-id={id} ref={addToRefs}>
        {items.map((item) => {
          return <MenuItem key={item.id} menuItemData={item} />
        })}
      </div>
    </div>
  );
};

