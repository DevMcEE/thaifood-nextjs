import Image from 'next/image';
import logo from '../../public/assets/images/logo/logo_contrast_small.svg';
import Link from 'next/link';


export const Toolbar = () => {
  return (
    <div className="toolbar-block">
      <div className="toolbar-logo-block">
        <Link href="/"> 
          <Image
          className="toolbar-block__logo-image"
          src={logo}
          alt="Thai Food Thai Cook Restaurant"
          />
        </Link>
      </div>
    </div>
  );
};