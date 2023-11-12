import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { IMenuItem } from '../menu.type';
import { Cloudinary } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/quality';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import { grayscale } from '@cloudinary/url-gen/actions/effect';
import classnames from 'classnames';
import { opacity } from '@cloudinary/url-gen/actions/adjust';

interface MenuItemCardProps {
  menuItemData: IMenuItem;
  cdn: Cloudinary;
  handleClick: (item: IMenuItem) => void;
}

export const MenuItemCard = ({ menuItemData, cdn, handleClick }: MenuItemCardProps): JSX.Element => {
  const { name, price, description, image, hidden } = menuItemData;

  const cdnThumbnail = cdn
    .image(image || 'no_image_placeholder')
    .delivery(quality(auto()))
    .delivery(format(auto()))
    .resize(image ? thumbnail().width(150).height(150) : thumbnail().width(144).height(144))
    .roundCorners(byRadius(10));

  if (!image) {
    cdnThumbnail.effect(grayscale()).adjust(opacity(15));
  }

  const handleItemClick = () => {
    handleClick(menuItemData);
  };

  return (
    <div onClick={handleItemClick} className={classnames('menu-item-card', { 'menu-item-card--hidden': hidden })}>
      <div className={classnames('card-item-image', { 'card-item-image__placeholder': !image })}>
        <AdvancedImage className={classnames('image-cdn', { 'image-cdn__placeholder': !image })} cldImg={cdnThumbnail} plugins={[lazyload(), placeholder({ mode: 'blur' })]} />
      </div>
      <div className="card-item-details">
        <div className="card-item-info-container">
          <div className="card-item-name" dangerouslySetInnerHTML={{ __html: name }} />
          <div className="card-item-description" dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <div className="card-item-price">{price}€</div>
      </div>
    </div >
  );
};