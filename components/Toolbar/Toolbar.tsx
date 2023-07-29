import Image from 'next/image';
import logo from '../../public/assets/images/logo/logo_contrast_small.svg';


export const Toolbar = () => {
  return (
  <div className="toolbar-block">
    <div className="toolbar-logo-block">
      <Image
        className="toolbar-block__logo-image"
        src={logo}
        alt="Thai Food Thai Cook Restaurant"
      />
    </div>
    </div>
  );
};