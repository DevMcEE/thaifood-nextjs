import { ChangeEvent, useMemo } from 'react';
import close from '../../public/assets/images/icons/close-one.svg';
import Image from 'next/image';
import magnifyingGlass from '../../public/assets/images/icons/magnifying-glass.svg';

interface SearchBarProps {
  handleSearchText: (searchText: string) => void;
  storedSearch: string;
  clearSearch: () => void;
}

export const SearchBar = ({ handleSearchText, storedSearch, clearSearch }: SearchBarProps): JSX.Element => {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleSearchText(value);
  };

  const imageProps = useMemo(() => ({
    className: `search-bar__icon ${!storedSearch ? '' : 'close-sign'}`,
    src: !storedSearch ? magnifyingGlass : close,
    onClick: !storedSearch ? () => void (0) : () => clearSearch(),
  }), [storedSearch]);

  return (
    <>
      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            className="search-bar__input"
            value={storedSearch}
            onChange={handleChange}
          />
          {<Image alt="" {...imageProps} />}
        </div>
      </div>
    </>
  );
};
