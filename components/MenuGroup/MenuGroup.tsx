import { IMenuGroup } from "../../menu/menu.type"
import { MenuItem } from "../MenuItem";

interface MenuGroupProps {
  menuGroupData: IMenuGroup;
  addToRefs: (element: HTMLElement) => void;
}

export const MenuGroup = ({ menuGroupData, addToRefs }: MenuGroupProps): JSX.Element => {
  const { name, items } = menuGroupData;
  const menuGroupName = name.replace(/\s+/g, '-');

  return (
    <div className="menu-group">
      <div className="menu-group__anchor-element" id={menuGroupName} ref={addToRefs}></div>
      <h3>{name}</h3>
      <div>
        {items.map((item) => {
          return <MenuItem key={item.id} menuItemData={item} />
        })}
      </div>
    </div>
  );
};

