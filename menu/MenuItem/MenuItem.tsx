import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { IMenuItem } from '../menu.type';
import { Cloudinary } from '@cloudinary/url-gen';
import { pad, thumbnail } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/quality';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';

interface MenuItemProps {
  menuItemData: IMenuItem;
}
const cdn = new Cloudinary({
  cloud: {
    cloudName: process.env.cdnName,
  }
});

export const MenuItem = ({ menuItemData }: MenuItemProps): JSX.Element => {
  const { name, price, description, image } = menuItemData;

  // examples of getting images of different size and proportions
  // https://cloudinary.com/documentation/resizing_and_cropping
  const cdnImg = cdn.image(image || 'no_image_placeholder').resize(pad()
    .width(350)
    .height(350)
  ).delivery(quality(auto()))
    .delivery(format(auto()))
    .roundCorners(byRadius(10));

  const cdnThumbnail = cdn.image(image || 'no_image_placeholder').resize(thumbnail()
    .width(150)
    .height(150)
  ).delivery(quality(auto()))
    .delivery(format(auto()))
    .roundCorners(byRadius(10));

  return (
    <div className="menu-item">
      <div className="item-details">
        <div className="item-image">
          <AdvancedImage cldImg={cdnImg}  style={{ display: 'none' }}  plugins={[ lazyload(), placeholder({ mode: 'blur'}) ]}/>
          <AdvancedImage cldImg={cdnThumbnail}  style={{ display: 'none' }}   plugins={[ lazyload(), placeholder({ mode: 'blur'}) ]}/>
        </div>
        <div className="item-name" dangerouslySetInnerHTML={{ __html: name }} />
        <div className="item-spacer"></div>
        <div className="item-price">{price}€</div>
      </div>
      <div className="item-description" dangerouslySetInnerHTML={{ __html: description }} />

    </div>
  );
};
