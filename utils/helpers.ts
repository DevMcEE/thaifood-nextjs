import { NextRouter } from "next/router";

export const setDefaultLocale = (router: NextRouter): void => {
    router.push(
      {
        pathname: "/",
      },
      null,
      { locale: 'en' }
    )
  }