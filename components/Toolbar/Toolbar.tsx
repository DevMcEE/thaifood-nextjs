import Image from 'next/image';
import logo from '../../public/assets/images/logo/logo_contrast_small.svg';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LanguageSwitcher } from '../LanguageSwitcher';

export const Toolbar = () => {
  const {locale} = useRouter();

  return (
    <div className="toolbar-block">
      <div className="toolbar-logo-block">
        <Link href="/" locale={locale}>
          <Image
            className="toolbar-block__logo-image"
            src="/assets/images/logo/Taiwaya-logo-cut3.jpg"
            alt="Thai Food Thai Cook Restaurant"
            width={100}
            height={100}
          /></Link>
          <LanguageSwitcher />
      </div>
    </div>
  );
};