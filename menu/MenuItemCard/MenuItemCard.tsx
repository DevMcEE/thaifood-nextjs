import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { IMenuItem } from '../menu.type';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill, scale, thumbnail } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/quality';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import { grayscale } from '@cloudinary/url-gen/actions/effect';
import classnames from 'classnames';
import { opacity } from '@cloudinary/url-gen/actions/adjust';

interface MenuItemCardProps {
  menuItemData: IMenuItem;
  cdn: Cloudinary;
  isModal?: boolean;
  handleClick?: (item: IMenuItem) => void;
}

export const MenuItemCard = ({ menuItemData, cdn, isModal = false, handleClick }: MenuItemCardProps): JSX.Element => {
  const { name, price, description, image, hidden } = menuItemData;

  const cdnThumbnail = cdn
    .image(image || 'no_image_placeholder')
    .delivery(quality(auto()))
    .delivery(format(auto()));

  const cdnModal = cdn
    .image(image || 'no_image_placeholder')
    .delivery(quality('auto'))
    .delivery(format('auto'))
    .roundCorners(byRadius(10, 10, 0, 0));

  cdnThumbnail
    .resize(image ? thumbnail().width(150).height(150) : thumbnail().width(144).height(144))
    .roundCorners(byRadius(10));

  if (isModal) {
    if (!image) {
      cdnModal
        .resize(fill().width('auto:100:300').gravity('auto'));
    } else {
      cdnModal
        .resize(scale().width('auto:100:550'));
    }
  }

  const cdnImage = isModal ? cdnModal : cdnThumbnail;

  if (!image) {
    cdnImage.effect(grayscale()).adjust(opacity(15));
  }

  const handleItemClick = () => {
    if (isModal) return;
    handleClick(menuItemData);
  };

  return (
    <div onClick={handleItemClick} className={classnames('menu-item-card', { 'menu-item-card--standard-view': !isModal }, { 'menu-item-card--hidden': hidden }, { 'menu-item-card--modal-view': isModal })}>
      <div className={classnames('card-item-image', { 'card-item-image__placeholder': !image }, { 'card-item-image--modal-view': isModal }, { 'card-item-image__placeholder--modal-view': isModal && !image })}>
        <AdvancedImage className={classnames('image-cdn', { 'image-cdn--modal-view': isModal && image }, { 'image-cdn--standard-view': !isModal }, { 'image-cdn--modal-view__placeholder': !image && isModal }, { 'image-cdn__placeholder': !image && !isModal })} cldImg={cdnImage} plugins={[lazyload(), placeholder({ mode: 'blur' })]} />
      </div>
      <div className="card-item-details">
        <div className="card-item-info-container">
          <div className={classnames('card-item-name', { 'card-item-name--modal-view': isModal })} dangerouslySetInnerHTML={{ __html: name }} />
          <div className="card-item-description" dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <div className={classnames('card-item-price', { 'card-item-price--modal-view': isModal })}>{price}€</div>
      </div>
    </div >
  );
};
