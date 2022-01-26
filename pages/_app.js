import '../styles/globals.css';
import Navbar from '../components/Navbar.js';
import { UserContext } from '../lib/context.js';
import { useUserData } from '../lib/hooks.js';

function MyApp({ Component, pageProps }) {

  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp
