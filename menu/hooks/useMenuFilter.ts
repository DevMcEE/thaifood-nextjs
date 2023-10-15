import { useState } from 'react';
import { IMenuGroup } from '../menu.type';
import { highlightText } from '../../utils/text.utils';

export const useMenuFilter = (menuList: IMenuGroup[]) => {
  const [menu, setMenu] = useState<IMenuGroup[]>(menuList);
  const [searchText, setSearchText] = useState('');

  const handleFilter = (searchText: string) => {
    const searchTextLowerCased = searchText.toLowerCase();

    let filteredMenu = menuList.map((menuGroup) => {
      const { items } = menuGroup;
      let filteredItems = items
        .map(item => ({
          ...item,
          name: highlightText(item.name, searchText),
          description: highlightText(item.description, searchText),
          hidden: (!item.name.toLowerCase().includes(searchTextLowerCased) && !item.description.toLowerCase().includes(searchTextLowerCased))
        }));
      return { ...menuGroup, hidden: !filteredItems.filter(item => !item.hidden).length, items: filteredItems };
    });

    setSearchText(searchText);
    setMenu(filteredMenu);
  };

  const clearSearch = () => {
    setSearchText('');
    setMenu(menuList);
  };

  return [{ menu, searchText }, handleFilter, clearSearch] as const;
}; 