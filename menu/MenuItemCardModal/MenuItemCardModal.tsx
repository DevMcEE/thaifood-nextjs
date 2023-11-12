import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { IMenuItem } from '../menu.type';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill, scale } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import { grayscale } from '@cloudinary/url-gen/actions/effect';
import classnames from 'classnames';
import { opacity } from '@cloudinary/url-gen/actions/adjust';

interface MenuItemCardProps {
  menuItemData: IMenuItem;
  cdn: Cloudinary;
}

export const MenuItemCardModal = ({ menuItemData, cdn} : MenuItemCardProps): JSX.Element => {
  const { name, price, description, image, hidden } = menuItemData;

  const cdnModal = cdn
    .image(image || 'no_image_placeholder')
    .delivery(quality('auto'))
    .delivery(format('auto'))
    .roundCorners(byRadius(10, 10, 0, 0))
    .resize(image ? scale().width('auto:100:550') : fill().width('auto:100:300').gravity('auto'));

  if (!image) {
    cdnModal.effect(grayscale()).adjust(opacity(15));
  }

  return (
    <div className="modal-menu-item-card">
      <div className={classnames('modal-card-item-image', { 'modal-card-item-image__placeholder': !image })}>
        <AdvancedImage className={classnames({ 'modal-image-cdn': image }, { 'modal-image-cdn__placeholder': !image})} cldImg={cdnModal} plugins={[lazyload(), placeholder({ mode: 'blur' })]} />
      </div>
      <div className="modal-card-item-details">
        <div className="modal-card-item-info-container">
          <div className="modal-card-item-name" dangerouslySetInnerHTML={{ __html: name }} />
          <div className="modal-card-item-description" dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <div className="modal-card-item-price">{price}€</div>
      </div>
    </div >
  );
};
