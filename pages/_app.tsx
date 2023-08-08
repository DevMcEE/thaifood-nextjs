import '../styles/globals.css';
import '../styles/app.scss';
import  NextJsI18NConfig from '../next-i18next.config'
import { appWithTranslation} from 'next-i18next';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className} >
      <Component  {...pageProps} />
    </main>
  )
}

export default appWithTranslation(App, NextJsI18NConfig);
