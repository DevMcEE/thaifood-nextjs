import Link from 'next/link';
import { useRouter } from 'next/router';

export const LanguageSwitcher = (): JSX.Element => {
  const router = useRouter();
  const {locales, locale, pathname} = router;

  return (
    <div className="language-switcher-main-block">
      {locales.map((language: string) => {
        return (
          <div className="language-switcher-button-wrapper" key={language}>
            <Link className={`language-switcher-link ${ language.includes(locale) ? 'language-switcher-link--active' : '' }`} href={pathname} locale={language}>{language}</Link>
          </div>
        );
      })}
    </div>
  );
};
