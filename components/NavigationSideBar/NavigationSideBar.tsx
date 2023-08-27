import { MenuItemLink } from "../MenuItemLink"; 

interface NavigationSideBarProps {
  menuGroupNames: string[];
  selectedMenuGroup: string;
  setGroupName: (menuGroupId: string) => void;
  addToRefs: (element: HTMLLIElement) => void;
}

export const NavigationSideBar = ({ menuGroupNames, selectedMenuGroup, setGroupName, addToRefs}: NavigationSideBarProps): JSX.Element => {
  const handleClick = (menuGroupName: string): void => {
    setGroupName(menuGroupName);
  };

  return (
    <nav aria-label="Navigation of menu categories" className="nav-side-bar">
      <ul className="nav-side-bar__list">
        {menuGroupNames.map((menuGroupName) => { 
          return (
            <MenuItemLink key={menuGroupName} href={menuGroupName} className={selectedMenuGroup === menuGroupName ? "nav-side-bar__list-item nav-side-bar__list-item-active" : "nav-side-bar__list-item"} onClick={()=>handleClick(menuGroupName)} addToRefs={addToRefs}/>
          )})
        }
      </ul>
    </nav >
  )
}


