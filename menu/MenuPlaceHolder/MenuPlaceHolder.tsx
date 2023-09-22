import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useMemo } from 'react';

interface MenuPlaceHolderProps {
  searchText: string,
  clearSearch: () => void;
}

export const MenuPlaceHolder = ({ searchText, clearSearch }: MenuPlaceHolderProps): JSX.Element => {
  const { t } = useTranslation();

  const url = useMemo(() => `/assets/images/menuPlaceHolder/${searchText ? 'no_result' : 'ninja_chef'}.svg`, [searchText]);

  return (
    <div className="menu-place-holder__body-container">
      <div className="menu-place-holder__message-block">
        <Image className="message-block__image" alt="No Result Found" src={url} width={200} height={200} />
        <div className="message-block__message-content">
          {searchText && <div className="message-block__message-search-word">{`"${searchText}"`}</div>}
          <div className="message-block__message-text">
            {t(`menu.emptyPage.${searchText ? 'noSearchResult' : 'fetchError'}`)}
          </div>
          {searchText && <div className="message-block__message-content__button-wrapper">
            <button className="button" onClick={clearSearch}>{t('search.clearSearchButton')}</button>
          </div>}
        </div>
      </div>
    </div>
  );
};
