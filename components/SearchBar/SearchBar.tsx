import { ChangeEvent, useEffect, useState } from 'react';
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

  useEffect(() => { storedSearch === "" ? setInputValue("") : "" }, [storedSearch])
  const iconImage = !storedSearch
    ? (<Image alt="magnifying glass" className="search-bar__icon" src={magnifyingGlass} />)
    : (<Image alt="close sign" onClick={clearSearch} className="search-bar__icon close-sign" src={close} />)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(() => value);
    handleSearchText(value);
  }

  return (
    <div className="search-bar-container">
      {iconImage}
      <input type="text" className="search-bar__input" value={inputValue} placeholder={t('search.placeholder')} onChange={handleChange} />
    </div>
  )
}