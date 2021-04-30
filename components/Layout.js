import Head from 'next/head';
import Header from './Header';
import Showcase from './Showcase';
import styles from '@/styles/Layout.module.css';
import Footer from './Footer';

//get next router to check of the page is the root page and only then display Showcase component
import { useRouter } from 'next/router';

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();

  //if we don't have an else we can use the && operator to execute the second part, if the first is true
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  description: 'Find the latest DJ and other musical events',
  keywords: 'music, dj, edm, events'
};
