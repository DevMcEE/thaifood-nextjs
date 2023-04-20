import Head from "next/head";

export function Meta() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/assets/images/thaifood-favicon-150x150-1.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/assets/images/thaifood-favicon-150x150-1.png"
      />
      {/* <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      /> */}
      {/* <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      /> */}
      {/* <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" /> */}
      <meta
        name="description"
        content="Thai Food Thai Cook - tasty, authentic thai cuisine."
      />
      {/* <meta property="og:image" content={HOME_OG_IMAGE_URL} /> */}
      
      {/* <!-- Meta Pixel Code --> */}
<script dangerouslySetInnerHTML={{__html: `
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-59CSMT6');
  `}}
>
</script>
{/* <!-- End Meta Pixel Code --> */}
    </Head>
  );
}