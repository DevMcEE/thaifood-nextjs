import { Meta } from '../Meta';
import { HeaderHeroBlock } from './HeaderHeroBlock';
import Image from 'next/image';
import food from '../../public/assets/images/landing/combo_thai_food_thai_cook.jpg';
import Link from 'next/link';
import { FooterBlock } from '../FooterBlock';

export function MainPageContainer() {
  return (
    <>
      <Meta />

      <div className="body-container">
        <HeaderHeroBlock />
        <main className="content-container main-page__content">
          <div className="content-block">
            <div className="content-block__title">
              <h2>Cuisine</h2>
            </div>
            <div className="content-block__content">
              <div className="content-block__content-image-container">
                <Image
                  className="content-block__content-image"
                  src={food}
                  alt="Thai Food"
                />
              </div>
              <div className="content-block__content-text">
               <p> Our menu includes traditional Thai soups such as Tom Yam or Tom Kha, curry soups and vegetable soups with meat, seafood and noodles.</p>
                <p>Very popular fried noodles: Pad Thai and Pad Se-ew.</p>
                <p>Large selection of dishes with rice, many different salads with seafood</p>
                <p>We also offer very specific dishes for true lovers of Asian cuisine: chicken feet, pork&apos;s ear and others.</p>
                <p>Most of our dishes are spicy. There are 3 levels of spiciness offered: low, medium and super spicy. This is not a European, but a Thai measure of spiciness, so Super Spicy is a level that will be very spicy for the Thais themselves.</p>
                <p><Link style={{textDecoration: 'underline'}} href="/menu">See the full menu</Link></p>
              </div>
            </div>
          </div>
        </main>
        <FooterBlock />
      </div>
    </>
  );
}
