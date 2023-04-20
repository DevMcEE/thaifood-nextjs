import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-59CSMT6"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        >
          {/* <!-- End Google Tag Manager (noscript) --> */}
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
