import Head from 'next/head';
import { MainPageContainer } from '../components/mainPage/MainPageContainer';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  return (
    <>
      <Head>
        <title>Thai Food - Thai Cook</title>
      </Head>
      <MainPageContainer />
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
  }
};
