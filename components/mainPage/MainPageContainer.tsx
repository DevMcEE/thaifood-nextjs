import { Meta } from '../Meta';
import { HeaderHeroBlock } from './HeaderHeroBlock';
import Image from 'next/image';
import interior from '../../public/assets/images/landing/interior1_opt.jpg';
import jenWithFood from '../../public/assets/images/landing/thaiFood.jpg';
import food from '../../public/assets/images/landing/combo_thai_food_thai_cook.jpg';
import kentmani from '../../public/assets/images/landing/kentmani.jpg';
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
                {/* <p>See the full menu on <Link style={{textDecoration: 'underline'}} href="/menu">Menu</Link> page</p> */}
              </div>
            </div>
          </div>
          <div className="content-block">
            <div className="content-block__title">
              <h2>About</h2>
            </div>
            <div className="content-block__content">

              <div className="content-block__content-text">
                <p>
                  Thai Food Thai Cook appeared in 2020 as a Facebook group,
                  where Jen, the founder,
                  periodically posted photos and videos of her culinary
                  experiments with Thai cuisine. These were mostly soups, which
                  are still the most popular dishes in the menu. </p>
                <p> At some point, subscribers began
                  ordering food from Jen. When there were many
                  such orders, Jen decided to rent a small place on the
                  Kentmanni Street. That time Thai Food Thai Cook worked only on
                  takeaway orders due to pandemic
                  restrictions. When the pandemic ended and all restrictions
                  were droped, many customers wanted to eat on the spot, but the
                  room was not suitable for that.
                </p>
              </div>
              <div className="content-block__content-image-container">
                <Image
                  className="content-block__content-image"
                  src={kentmani}
                  alt="Thai Food Thai Cook in Kentmanni"
                />
              </div>
            </div>
          </div>
          <div className="content-block">
            <div className="content-block__content">
              <div className="content-block__content-image-container">
                <Image
                  className="content-block__content-image"
                  src={interior}
                  alt="Thai Food Thai Cook restaurant"
                />
              </div>
              <div className="content-block__content-text">
                <p>
                  In 2021 Thai Food Thai Cook moved to the bigger place on Gonsiori
                  12a. Menu list became bigger as well. We hired more people. But
                  <strong> Thai Food Thai Cook </strong> remained to be an authentic Thai
                  restaurant. No, you won&apos;t find here any expensive Asian-style
                  interior (as in the most restaurants in Thailand either). But
                  you are guaranteed to get real spicy Thai food, without any
                  adaptation to locals (although, there are not-spicy meals in the menu too).
                  The key point is that all our chefs are native Thais, and they
                  cook like they would cook for themselves and their families.
                  Therefore the dishes are so delicious and authentic.
                </p>
              </div>
     
            </div>
          </div>

          {/*<div className="content-block">
            <div className="content-block__title">
              <h2>Жаренная лапша</h2>
            </div>
            <div className="content-block__content">
              <div className="content-block__content-image">imagae</div>
              <div className="content-block__content-text">
                Популярнейшее блюдо из жаренной лапши: Пад Тхай и Пад Сею
              </div>
            </div>
          </div>
          <div className="content-block">
            <div className="content-block__title">
              <h2>Блюда с рисом</h2>
            </div>
            <div className="content-block__content">
              <div className="content-block__content-text">
                Различные блюда с вареным и жаренным рисом: Пад Кра Пао, Кхао
                Пад
              </div>
              <div className="content-block__content-image">imagae</div>
            </div>
          </div>
          <div className="content-block">
            <div className="content-block__title">
              <h2>Салаты</h2>
            </div>
            <div className="content-block__content">
              <div className="content-block__content-image">image</div>
              <div className="content-block__content-text">
                Традиционные тайские салаты: Сом Там,
              </div>
            </div>
          </div> */}
        </main>
        <FooterBlock />
      </div>
    </>
  );
}
