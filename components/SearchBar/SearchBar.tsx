import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import magnifyingGlass from '../../public/assets/images/icons/magnifying-glass.svg';
import close from '../../public/assets/images/icons/close-one.svg';
import Image from 'next/image';

interface SearchBarProps {
  handleSearchText: (searchText: string) => void;
  storedSearch: string;
  clearSearch: () => void;
}

export const SearchBar = ({ handleSearchText, storedSearch, clearSearch }: SearchBarProps): JSX.Element => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');

  const handleClearSearch = () =>  {
    clearSearch();
    setInputValue('')
  }

  const imageProps = useMemo(() => ({
    className: `search-bar__icon ${!storedSearch? '':  'close-sign'}`,
    src: !storedSearch? magnifyingGlass : close,
    onClick: !storedSearch? ()=> void(0) : handleClearSearch,
  }), [storedSearch]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(() => value);
    handleSearchText(value);
  }

  return (
    <div className="search-bar-container">
      <Image alt=''  {...imageProps} />
      <input type="text" className="search-bar__input" value={inputValue} placeholder={t('search.placeholder')} onChange={handleChange} />
    </div>
  )
}