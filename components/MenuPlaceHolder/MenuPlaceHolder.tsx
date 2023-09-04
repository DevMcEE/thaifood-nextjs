import { useTranslation } from 'next-i18next';
import Image from 'next/image'
import NinjaChef from '../../public/assets/images/menuPlaceHolder/ninja_chef.svg'

export const MenuPlaceHolder = ({ searchText }): JSX.Element => {
  const { t } = useTranslation();

  const message = ():string => {
    if (searchText) {
      return t('menu.emptyPage.searchResult').replace('%customWord%', `<strong>«${searchText}»</strong>`);
    } else {
      return t('menu.emptyPage.fetchResult');
    }
  }

  return (
    <div className="menu-place-holder__body-container">
      <div className="menu-place-holder__message-container">
        <h1>{t('menu.emptyPage.greetings')}</h1>
        <div className="menu-place-holder__message-text">
          <div className="search-result" dangerouslySetInnerHTML={{ __html: message() }}></div>
        </div>
        <Image className='menu-place-holder__image' alt="Ninja Chef" src={NinjaChef}></Image>
      </div>
    </div>
  );
}
