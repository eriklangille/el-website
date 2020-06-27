import '../styles/global.css'
import Head from 'next/head'
import { UserContextProvider } from '../utils/UserContext.js'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import "react-datepicker/dist/react-datepicker.css";

const App = ({ Component, pageProps }) => {
  return (
    <UserContextProvider>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f3f3f3" />
        <meta
          name="description"
          content="Erik Langille | eriklangille.com"
        />
        <link rel="manifest" href="/manifest.json" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"></link>
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </UserContextProvider>
  );
};

export default App