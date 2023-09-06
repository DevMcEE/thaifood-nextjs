import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import magnifyingGlass from '../../public/assets/images/icons/magnifying-glass.svg';
import Image from 'next/image';

interface SearchBarProps {
  handleSearchText: (searchText: string)=> void;
  storedSearch: string;
}

export const SearchBar = ({handleSearchText, storedSearch}: SearchBarProps): JSX.Element => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {storedSearch === "" ? setInputValue("") : "" },[storedSearch])

  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setInputValue(() => value);
    handleSearchText(value);
  }

  return (
    <div className="search-bar-container">
      <Image alt="magnifying glass" className="search-bar__icon" src={magnifyingGlass} />
      <input type="text" className="search-bar__input" value={inputValue} placeholder={t('search.placeholder')} onChange={handleChange}/>
    </div>
  )
}