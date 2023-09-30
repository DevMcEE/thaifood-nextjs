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
                <p className="mb-1">At Taiwaya, we&apos;ve taken the best flavors from the Northeast of Thailand, and added a touch of Japanese- inspired seasoning to create our unique <strong>Taiwaya</strong> style cuisine</p>
                <p className="content-block__content-text-paragraph content-block__content-text-paragraph--centered"><Link className="button-primary" style={{textDecoration: 'underline'}} href="/menu">See the full menu</Link></p>
              </div>
            </div>
          </div>
        </main>
        <FooterBlock />
      </div>
    </>
  );
}
