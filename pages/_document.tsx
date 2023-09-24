import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        {process?.env?.NODE_ENV === 'production' ? <Script src="https://www.googletagmanager.com/ns.html?id=GTM-59CSMT6" /> : null}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
