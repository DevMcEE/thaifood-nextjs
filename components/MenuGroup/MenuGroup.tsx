import { IMenuGroup } from "../../menu/menu.type"
import { MenuItem } from "../MenuItem";

interface MenuGroupProps {
  menuGroupData: IMenuGroup;
}

export const MenuGroup = ({ menuGroupData }: MenuGroupProps): JSX.Element => {
  const { name, items } = menuGroupData;

  return (
    <div className="menu-group">
      <h3>{name}</h3>
      <div>
        {items.map((item) => {
          return <MenuItem key={item.id} menuItemData={item} />
        })}
      </div>
    </div>
  );
};

