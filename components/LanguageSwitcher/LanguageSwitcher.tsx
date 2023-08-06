import { useRouter } from "next/router";
import { MouseEvent } from "react";

export const LanguageSwitcher = (): JSX.Element => {
  const router = useRouter();
  const  {locales} = useRouter();

  const handleClick = (event: MouseEvent<HTMLOptionElement>): void => {
    router.push(
      {
        pathname: router.pathname,
        query: router.query,
      },
      null,
      { locale: event.currentTarget.value }
    )
  }

  return (
    <div className="language-switcher-main-block">
      {locales.map((language: string, index: number) => {
        return (
          <div className="language-switcher-button-wrapper" key={language}>
            <option key={index} value={language} className="language" onClick={handleClick}>{language.toUpperCase()}</option>
            {index < locales.length - 1 ? <span key={language+index}>|</span> : <></>}
          </div>
        )
      })}
    </div>
  )
}
