import Image from 'next/image';
import thai from '../../public/assets/images/maintenance/thai_cook_400px.svg'
import Link from 'next/link';

export const Maintenance = (): JSX.Element => {
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
          <Link href="/">
            <button className="home-button">
              <h3>HOME PAGE</h3>
            </button>
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
