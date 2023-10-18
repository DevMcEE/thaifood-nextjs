import { useMemo } from 'react';
import { IMenuNavGroup } from '../menu.type';

import classnames from 'classnames';
import { MenuItemLink } from '../MenuItemLink';
interface NavigationBarProps {
  menuGroups: IMenuNavGroup[];
  activeId: string;
  setActiveId: (menuGroupId: string, event) => void;
  addToRefs: (element: HTMLAnchorElement) => void;
}

export const MenuNavigationBar = ({ menuGroups, activeId, setActiveId, addToRefs }: NavigationBarProps): JSX.Element => {

  const navMenu = useMemo(() => menuGroups.map(({ id, name, href, isDisabled }) => {

    return (
      <MenuItemLink
        key={id}
        href={href}
        title={name}
        className={classnames(
          'nav-bar__list-item',
          {
            'nav-bar__list-item-active': !isDisabled && id === activeId,
            'nav-bar__list-item-disabled': isDisabled,
          }
        )}
        onClick={(event) => setActiveId(id, event)}
        addToRefs={addToRefs} />
    );
  }), [menuGroups, activeId]);

  return (
    <nav aria-label="Navigation of menu categories" className="nav-bar">
      {navMenu}
    </nav>
  );
};
