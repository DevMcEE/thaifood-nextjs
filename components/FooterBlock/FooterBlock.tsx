import Image from 'next/image';
import wolt from '../../public/assets/images/footer/wolt-logo.png';
import bolt from '../../public/assets/images/footer/bolt-logo-white.svg';

export const FooterBlock = () => {
  const thisYear = new Date().getFullYear();

  return (
    <footer className="page-footer">
      <div className="content-container">
        <div className="page-footer__block">
          <h2>Contacts</h2>
          <div className="page-footer__block-content">
            <h4>Barngkok Food OÜ</h4>
            <p>Reg. num. 16123207</p>
            <p>VAT EE102508015</p>
            <p>Gonsiori 12a, TALLINN </p>
            <p>
              <a href="tel:0037258805065">+372 58805065</a>
            </p>
            <p>
              <a href="mailto:info@thaifood.ee">info@thaifood.ee</a>
            </p>
          </div>
        </div>
        <div className="page-footer__block">
          <h2>Opening hours</h2>
          <div className="page-footer__block-content">
            <p>Monday - Friday: 11:00 - 20:15</p>
            <p>Saturday: 12:00 - 20:15</p>
            <p>Sunday: 12:00 - 20:00</p>
          </div>
        </div>
        <div className="page-footer__block">
          <h2>Delivery</h2>
          <div className='ptb-1'>
            <Image
              className="page-footer__block-delivery-wolt-link-image"
              src={bolt}
              height={50}
              alt="Thai Food Thai Cook at Wolt"
            />
          </div>
          <div>
            <a
              href="https://wolt.com/et/est/tallinn/restaurant/thai-food-thai-cook"
              target="_blank"
              rel="noreferrer"
              className="page-footer__block-delivery-wolt-link"
            >
              <Image
                className="page-footer__block-delivery-wolt-link-image"
                src={wolt}
                height={50}
                alt="Thai Food Thai Cook at Wolt"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="page-footer__rigths">
        ©All rights reserved Barngkok Food OÜ: 2021 - {thisYear}
      </div>
    </footer>
  );
};
