import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'next-i18next';
import magnifyingGlass from '../../public/assets/images/icons/magnifying-glass.svg';
import Image from 'next/image';

interface SearchBarProps {
  returnSearchText: (searchText: string)=> void;
}

export const SearchBar = ({returnSearchText}: SearchBarProps): JSX.Element => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState<string>('');
 
  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setInputValue(() => value);
    returnSearchText(value);
  }

  return (
    <div className="search-bar-block">
      <Image alt="magnifying glass" className="search-bar-block__icon" src={magnifyingGlass} />
      <input type="text" className="search-bar-block__input" value={inputValue} placeholder={t('search.placeholder')} onChange={handleChange}/>
    </div>
  )
}