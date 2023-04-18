import Image, { StaticImageData } from 'next/image';
import styles from './MenuItem.module.css';

export interface MenuItemProps {
  imageSrc: string  | StaticImageData;
  title?: string;
};

export function MenuItem ({ title, imageSrc }: MenuItemProps) {
  return (
    <div className={styles.menuItem}>
      <div className={styles.menuItemImageContainer}>
        <Image 
          alt={title}
          fill
          style={{
            objectFit: 'cover',
          }}
          src={imageSrc}
        />
      </div>
      <div className="menu-item__title">
        <h3 className="menu-item__title-text">{title}</h3>
      </div>
    </div>
  );
};
