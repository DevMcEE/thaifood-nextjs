import Link from "next/link";
import { useRouter } from "next/router";

export const LanguageSwitcher = (): JSX.Element => {
  const {locales} = useRouter();

  return (
    <div className="language-switcher-main-block">
      {locales.map((language: string, index: number) => {
        return (
          <div className="language-switcher-button-wrapper" key={language}>
            <Link className="language-switcher-link" href="/menu" locale={language}>{language.toUpperCase()}</Link>
          </div>
        )
      })}
    </div>
  )
}
