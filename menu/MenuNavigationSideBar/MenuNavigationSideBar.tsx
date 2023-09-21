import { useMemo } from 'react';
import { IMenuNavGroup } from '../menu.type';

import classnames from 'classnames';
import { MenuItemLink } from '../MenuItemLink';
interface NavigationSideBarProps {
  menuGroups: IMenuNavGroup[];
  activeId: string;
  setActiveId: (menuGroupId: string, event) => void;
  addToRefs: (element: HTMLAnchorElement) => void;
}

export const MenuNavigationSideBar = ({ menuGroups, activeId, setActiveId, addToRefs }: NavigationSideBarProps): JSX.Element => {
  const navMenu = useMemo(() => menuGroups.map(({ id, name, href, isDisabled }) => {
    return (  
      <MenuItemLink 
        key={id} 
        href={isDisabled ? '' : href} 
        title={name} 
        className={classnames(
          'nav-side-bar__list-item', 
          {
            'nav-side-bar__list-item-active': id === activeId, 
            'nav-side-bar__list-item-disabled': isDisabled 
          })
        }
        onClick={(event) => setActiveId(id, event)}
        addToRefs={addToRefs} />
    );
  }), [menuGroups, activeId]);
  
  return (
    <nav aria-label="Navigation of menu categories" className="nav-side-bar">
      {navMenu}
    </nav >
  );
};


