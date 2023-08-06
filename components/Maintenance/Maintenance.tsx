import Image from 'next/image';
import thai from '../../public/assets/images/maintenance/thai_cook_400px.svg'
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { setDefaultLocale } from '../../utils/helpers';

export const Maintenance = (): JSX.Element => {

  const { t } = useTranslation();
  
  const router = useRouter();

  const handleButtonClick = (): void => {
    return setDefaultLocale(router);
  }

  return (
    <div className="maintenance-body-container">
      <div className="maintenance-message-container">
        <h1>HI THERE!</h1>
        <div className="maintenance-message-text">
          <p>WE ARE UPDATING OUR MENU...</p>
          <p>PLEASE, BEAR WITH US!</p>
          <p>IT SHOULD ONLY TAKE A FEW MINUTES</p>
        </div>
        <div className="maintenance-message-button">
            <button onClick={handleButtonClick} className="home-button">
              <h3>{t('home')}</h3>
            </button>
        </div>
      </div>
      <div className="maintenance-image-block">
        <Image
          src={thai}
          alt="Thai Cook Little Chef"
        />
      </div>
    </div>
  );
}
