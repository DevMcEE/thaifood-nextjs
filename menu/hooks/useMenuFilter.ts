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
        .filter(({ name, description }) => name.toLowerCase().includes(searchTextLowerCased) || description.toLowerCase().includes(searchTextLowerCased))
        .map(item => ({
          ...item,
          name: highlightText(item.name, searchText),
          description: highlightText(item.description, searchText)
        }));
      return { ...menuGroup, items: filteredItems };
    }).filter(group => group.items.length);

    setSearchText(searchText);
    setMenu(filteredMenu);
  };

  const clearSearch = () => {
    setSearchText('');
    setMenu(menuList);
  };

  return [{ menu, searchText }, handleFilter, clearSearch] as const;
}; 