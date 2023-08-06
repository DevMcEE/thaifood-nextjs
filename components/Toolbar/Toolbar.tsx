import Image from 'next/image';
import logo from '../../public/assets/images/logo/logo_contrast_small.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Toolbar = () => {

  const router = useRouter();

  const handleImageClick = (): void => {
    router.push(
      {
        pathname: "/",
      },
      null,
      { locale: 'en' }
    )
  }


  return (
    <div className="toolbar-block">
      <div className="toolbar-logo-block">
        <Image
          onClick={handleImageClick}
          className="toolbar-block__logo-image"
          src={logo}
          alt="Thai Food Thai Cook Restaurant"
        />
      </div>
    </div>
  );
};