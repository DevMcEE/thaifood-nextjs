import { Meta } from '../Meta';
import { HeaderHeroBlock } from './HeaderHeroBlock';
import Link from 'next/link';
import { FooterBlock } from '../FooterBlock';
import { Cloudinary } from '@cloudinary/url-gen';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/quality';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { crop, scale } from '@cloudinary/url-gen/actions/resize';
import { ar1X1 } from '@cloudinary/url-gen/qualifiers/aspectRatio';
import { contrast, improve } from '@cloudinary/url-gen/actions/adjust';
import { useMemo } from 'react';

interface Props {
  cdn: Cloudinary;
}

const prepareImage = (publicId: string, cdn: Cloudinary) => cdn.image(publicId)
  .adjust(improve().mode('indoor'))
  .delivery(quality(auto()))
  .delivery(format(auto()))
  .roundCorners(byRadius(10));

export function MainPageContainer({ cdn }: Props) {
  const lunchImage = useMemo(() => prepareImage('Pad-Thai-Chicken', cdn).resize(
    crop()
      .aspectRatio(ar1X1())
  ).resize(
    scale()
      .width(400)
      .aspectRatio(ar1X1())
  ), [cdn]);
  
  const cousineImage = useMemo(() => prepareImage('taiwaya-cousine', cdn).resize(
    crop()
      .aspectRatio(ar1X1())
  ), [cdn]);

  const chefImage = useMemo(() => prepareImage('taiwaya-main-chef', cdn), [cdn]);

  return (
    <>
      <Meta />

      <div className="body-container">
        <HeaderHeroBlock />
        <main className="content-container main-page__content">
          <div className="content-block">
            <div className="content-block__title">
              <h2>Special offers</h2>
            </div>
            <div className="content-block__content">
              <div className="content-block__content-image-container">
                <AdvancedImage className="content-block__content-image" cldImg={cousineImage} plugins={[lazyload(), placeholder({ mode: 'blur' })]} />
              </div>
              <div className="content-block__content-text">
              <p>Taiwaya is a flavor fusion adventure, serving up authentic Northern and E-san Thai cuisine with a delightful twist of Japanese influence in every dish.</p>

              <h3 className="content-block__content-text-header">Lunch menu</h3>
                <p>On every Tuesday - Friday at 12:00 - 14:00</p>
                <p><b>Pad Thai Chicken</b> - 8.90€</p>
                <p><b>Pad Kra Pao Chicken</b> - 8.90€</p>
                <p><b> Green curry chicken</b> - 8.90€</p>
                <p><b>Khao Soi Chicken.</b> - 8.90€</p>
                <br />
                <h3 className="content-block__content-text-header mb-1">Tourist Groups offer</h3>
                <p className="mb-1">Our restaurant offers special menu for tourist groups.
                Feel free to contact us for special events and bookings!</p><br />
                <p className="content-block__content-text-paragraph content-block__content-text-paragraph--centered  ">
                  <Link className="button-primary" href="/tourist-groups">SEE OFFER</Link>
                </p>
           
              
              </div>

            </div>
          </div>
          <div className="content-block">
            <div className="content-block__title">
              <h2>About</h2>
            </div>
            <div className="content-block__content">
              <div className="content-block__content-text">
                <p><b>Atikhun Kakaew</b> is the leader behind Taiwaya, a brand-new Thai restaurant in the very center of Tallinn.</p>
                <p>Chef Atikhun spanning nearly a decade as a chef in Estonia, including a prestigious stint as a master chef at the 5-star Radisson Collection Hotel in Tallinn.</p>
                <p className="mb-1">
                  His inspiration for Taiwaya grew from the deep roots of his family&apos;s heritage in North and Northeastern Thailand. His goal is to introduce the world to the incredible flavors of Northern and E-san cuisine.
                  What&apos;s more, he&apos;s added a dash of Japanese culinary finesse, personally loving the art of Japanese cooking.
                  With a background from his home cuisine, he creates a gastronomic medley that not only tastes amazing but looks fantastic too.
                  Although the primary ingredients are Thai, there&apos;s a sprinkling of other Asian elements in some dishes.</p>
                <p className="content-block__content-text-paragraph content-block__content-text-paragraph--centered"><Link className="button-primary" href="/menu">SEE MENU</Link></p>
              </div>
              <div className="content-block__content-image-container">

                <AdvancedImage className="content-block__content-image" cldImg={chefImage} plugins={[lazyload(), placeholder({ mode: 'blur' })]} />
              </div>
            </div>

          </div>
        </main>
        <FooterBlock />
      </div>
    </>
  );
}
