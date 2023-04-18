import Head from 'next/head';
// import Image from 'next/image';
// import styles from '../styles/Home.module.css';

import { MainPageContainer } from '../components/mainPage/MainPageContainer';

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
