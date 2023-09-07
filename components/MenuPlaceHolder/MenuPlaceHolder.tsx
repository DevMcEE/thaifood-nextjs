import { useTranslation } from 'next-i18next';
import Image from 'next/image'
import NoResult from '../../public/assets/images/menuPlaceHolder/no_result.svg'
import { useMemo } from 'react';

interface MenuPlaceHolderProps {
  searchText: string,
  clearSearch: () => void;
}

export const MenuPlaceHolder = ({ searchText, clearSearch }: MenuPlaceHolderProps): JSX.Element => {
  const { t } = useTranslation();

  const message = useMemo(() => searchText ? t('menu.emptyPage.noSearchResult') : t('menu.emptyPage.fetchError'), [searchText])

  return (
    <div className="menu-place-holder__body-container">
      <div className="menu-place-holder__message-block">
        <Image className='message-block__image' alt="No Result Found" src={NoResult}></Image>
        <div className="message-block__message-content">
          <div className="message-block__message-search-word">{`"${searchText}"`}</div>
          <div className="message-block__message-text">{message}</div>
          <div className="message-block__message-content__button-wrapper">
            <button className="button" onClick={clearSearch}>{t('search.clearSearchButton')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
