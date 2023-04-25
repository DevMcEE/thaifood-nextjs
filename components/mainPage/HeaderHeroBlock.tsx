import Image from 'next/image';
import bgImage from '../../public/assets/images/landing/tomYamShrimp.png';
import logo from '../../public/assets/images/logo/logo_contrast.svg';
import mapPin from '../../public/assets/images/icons/map-pin.svg';

export const HeaderHeroBlock = (): JSX.Element => {
  console.log(bgImage);
  return (
    <header className="header-hero-block">
      <div className="header-hero-block__bg">
        <Image
          priority={true}
          className="header-hero-block__bg-image"
          src={bgImage}
          alt="Thai Food Thai Cook Restaurant"
        />
        <div className="header-hero-block__bg-overlay"></div>
      </div>
      <div className="header-hero-block__logo">
        <Image
          className="header-hero-block__logo-image"
          src={logo}
          alt="Thai Food Thai Cook Restaurant"
        />
      </div>
      <div className="header-hero-block__content">
        <div className="header-hero-block__content-title">
          <h1>Thai Restaurant</h1>
        </div>
        <div className="header-hero-block__content-contacts">
          <p className="header-hero-block__content-contacts-address">
            <a
              href="https://goo.gl/maps/Z5iabpug6X7DUppJ8"
              target="_blank"
              className="header-hero-block__content-contacts-link"
              rel="noreferrer"
            >
              <Image
                className="header-hero-block__content-contacts-icon"
                src={mapPin}
                alt="Thai Food Thai Cook address"
              />
              <span className='header-hero-block__content-contacts-address-text'>Gonsiori 12a, Tallinn</span> 
            </a>
          </p>
          <p className="header-hero-block__content-contacts-address">
            <a
              href="tel:0037258805065"
              className="header-hero-block__content-contacts-telephone"
            >
              (+372) 5880 5065
            </a>
          </p>
        </div>
      </div>
    </header>
  );
};
