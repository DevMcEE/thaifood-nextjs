import Link from "next/link";

interface NavigationSideBarProps {
  menuGroupNames: string[];
  selectedMenuGroup: string;
  setGroupName: (menuGroupId: string) => void;
  addToRefs: (element: HTMLElement) => void;
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
            <Link ref={addToRefs} key={menuGroupName} href={`#${menuGroupName}`} id={menuGroupName} scroll={true} >
              <li onClick={()=> handleClick(menuGroupName)} className={selectedMenuGroup === menuGroupName ? "nav-side-bar__list-item nav-side-bar__list-item-active" : "nav-side-bar__list-item"}>{menuGroupName}</li>
            </Link>)
        })}
    </ul>
    </nav >

  )
}