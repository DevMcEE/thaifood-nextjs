import Image from 'next/image';
import thai from '../../public/assets/images/maintenance/thai_cook_400px.svg'
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const Maintenance = (): JSX.Element => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <div className="maintenance-body-container">
      <div className="maintenance-message-container">
        <h1>{t('maintenance.greetings')}</h1>
        <div className="maintenance-message-text">
          <div>{t('maintenance.message')}</div>
        </div>
        <div className="maintenance-message-button">
          <Link href='/' locale={locale}>
            <div className="home-button">
              <h3>{t('home')}</h3>
            </div>
          </Link>
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
