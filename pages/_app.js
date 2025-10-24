// pages/_app.js
import '../styles/globals.css'; // Your global styles
import 'react-toastify/dist/ReactToastify.css'; // Global CSS for react-toastify

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
