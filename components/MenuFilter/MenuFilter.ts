import { IMenuGroup, IMenuItem } from '../../menu/menu.type';

export const filterMenu = (searchText:string, menuData:IMenuGroup[]):IMenuGroup[] => {
  const filteredMenuData = menuData.map((group) => {
   const { items } = group;
   let filteredItems = items
     ? items.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
     : []
    filteredItems = highlightText(filteredItems, searchText)
    return {...group, items: filteredItems};
 });
 return filteredMenuData.filter(group => group.items.length)
};

export const highlightText = (menuItemArray: IMenuItem[], searchText: string) => {
  return menuItemArray.map(menuItem => {
    const highlightedName = menuItem.name.replace(
    new RegExp(searchText, 'gi'),
    match => `<mark style="background: #dfa123">${match}</mark>`
  )
  return {
    ...menuItem,
    name: highlightedName,
  }
})
}
