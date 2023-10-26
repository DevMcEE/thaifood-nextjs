import Head from 'next/head';
import { MainPageContainer } from '../components/mainPage/MainPageContainer';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useMemo } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';

export default function Home() {
  const cdn = useMemo(() => {
    return new Cloudinary({
      cloud: {
        cloudName: process.env.cdnName,
      }
    });
  }, []);
  return (
    <>
      <Head>
        <title>Taiwaya</title>
      </Head>
      <MainPageContainer cdn={cdn} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  const translations = await serverSideTranslations(locale, ['common']);


  return {
    props: {
      ...translations,
    }
  };
};
