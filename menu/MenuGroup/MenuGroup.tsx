import classnames from 'classnames';
import { IMenuGroup } from '../menu.type';
import { MenuItem } from '../MenuItem';
import { useMemo } from 'react';
import { MenuItemCard } from '../MenuItemCard';
import { VIEW_MODE_TYPE } from '../../pages/menu/index';
import { Cloudinary } from '@cloudinary/url-gen';

interface MenuGroupProps {
  menuGroupData: IMenuGroup;
  href: string;
  viewMode: string;
  hidden: boolean;
  addToRefs: (element: HTMLElement) => void;
  cdn: Cloudinary;
}

export const MenuGroup = ({ menuGroupData, addToRefs, href, viewMode, hidden, cdn }: MenuGroupProps): JSX.Element => {
  const { name, items, id, description } = menuGroupData;
  const { grid, list } = VIEW_MODE_TYPE;

  const menuView = useMemo(() => {
    const menuView = items.map(item => {
      if (viewMode === grid) {
        return (<MenuItemCard key={item.id} cdn={cdn} menuItemData={item} />);
      } else {
        return (<MenuItem key={item.id} menuItemData={item} />);
      }
    });
    return menuView;
  }, [items, viewMode, grid, cdn]);

  return (
    <div className={classnames('menu-group', { 'menu-group--hidden': hidden })}>
      <div className="menu-group-title">
        <h2>{name}</h2>
        <h5>{description}</h5>
      </div>
      <div
        className={classnames({
          'menu-group_grid-view': viewMode === grid,
          'menu-group_list-view': viewMode === list
        })}
        id={href}
        data-group-id={id}
        ref={addToRefs}
      >{menuView}
      </div>
    </div>
  );
};
