import { useMemo } from 'react';
import { IMenuGroupBase, IMenuNavGroup } from '../../menu/menu.type';
import { MenuItemLink } from "../MenuItemLink";

interface NavigationSideBarProps {
  menuGroups: IMenuNavGroup[];
  activeId: string;
  setActiveId: (menuGroupId: string, event) => void;
  addToRefs: (element: HTMLAnchorElement) => void;
}

export const NavigationSideBar = ({ menuGroups, activeId, setActiveId, addToRefs }: NavigationSideBarProps): JSX.Element => {
  const navMenu = useMemo(() => menuGroups.map(({ id, name, href }) => {
    return (
      <MenuItemLink key={id} href={href} title={name} className={`nav-side-bar__list-item ${ id === activeId ? 'nav-side-bar__list-item-active':''}`}
        onClick={(event) => setActiveId(id, event)}
        addToRefs={addToRefs} />
    )
  }), [menuGroups, activeId]);
  
  return (
    <nav aria-label="Navigation of menu categories" className="nav-side-bar">
      {navMenu}
    </nav >
  )
}


