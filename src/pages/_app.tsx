import Wrap from '@/components/wrap';
import '@/configs/i18n.config';
import { store } from '@/redux/store';
import '@/styles/global.scss';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import "react-multi-carousel/lib/styles.css";

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps & { Component: any }) {
  const { i18n } = useTranslation();

  if (Component.getLayout) {
    return Component.getLayout(<Component pageProps />);
  }

  // useEffect(() => {
  //   const lang = localStorage.getItem(LOCALSTORAGE_VARIABLE.LANGUAGE);
  //   i18n.changeLanguage(lang || LANGUAGE.VI);
  // }, []);


  return (
    <>
      <Provider store={store}>
        <Head>
          <title>Ecommerce</title>
          <meta name="description" content="Ecommerce Page" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Wrap>
          <Component {...pageProps} />
        </Wrap>
        {/* <ChatBox /> */}
      </Provider>
    </>
  );
}
