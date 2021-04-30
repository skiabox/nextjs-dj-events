import { AuthProvider } from '@/context/AuthContext';
import '../styles/globals.css';

//next js uses an app component to initialize pages
//this returned component is the current page
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
