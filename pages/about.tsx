import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function About() {
  return (
    <>
      <main className={styles.main}>
        <div>This is about page</div>
        <div><Link href={'/'}> Home </Link></div>
      </main>
    </>
  );
}
