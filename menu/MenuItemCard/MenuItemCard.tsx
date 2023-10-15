import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { IMenuItem } from '../menu.type';
import { Cloudinary } from '@cloudinary/url-gen';
import { pad, thumbnail } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/quality';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import { artisticFilter } from '@cloudinary/url-gen/actions/effect';
import classnames from 'classnames';
import { useMemo } from 'react';

interface MenuItemCardProps {
  menuItemData: IMenuItem;
}

export const MenuItemCard = ({ menuItemData }: MenuItemCardProps): JSX.Element => {
  const { name, price, description, image, hidden } = menuItemData;

  const cdn = useMemo(() => {
    return new Cloudinary({
      cloud: {
        cloudName: process.env.cdnName,
      }
    });
  }, []);

  const cdnImg = cdn
    .image(image || 'no_image_placeholder')
    .resize(pad().width(350).height(350))
    .delivery(quality(auto()))
    .delivery(format(auto()))
    .roundCorners(byRadius(10));

  const cdnThumbnail = cdn
    .image(image || 'no_image_placeholder')
    .resize(thumbnail().width(150).height(150))
    .delivery(quality(auto()))
    .delivery(format(auto()))
    .roundCorners(byRadius(10));

  if (!image) {
    cdnThumbnail.effect(artisticFilter('incognito')).roundCorners(byRadius(10));
  }

  return (
    <div className={classnames('menu-item-card', { 'menu-item-card--hidden': hidden })}>
      <div className="card-item-image">
        <AdvancedImage className="image-cdn-img" cldImg={cdnImg} style={{ display: 'none' }} plugins={[lazyload(), placeholder({ mode: 'blur' })]} />
        <AdvancedImage className="image-cdn-thumbnail" cldImg={cdnThumbnail} />
      </div>
      <div className="card-item-details">
        <div className="card-item-info-container">
          <div className="card-item-name" dangerouslySetInnerHTML={{ __html: name }} />
          <div className="card-item-description" dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <div className="card-item-price">{price}€</div>
      </div>
    </div>
  );
};
