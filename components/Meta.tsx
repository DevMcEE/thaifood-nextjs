import Head from 'next/head';

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