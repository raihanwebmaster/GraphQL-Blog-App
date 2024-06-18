import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '../components/shared/Footer/Footer';
import Navbar from '../components/shared/Navbar/Navbar';
import { Background } from '../components/shared/Background/Background';

const Main = () => {
  const location = useLocation();

  const hiddenPaths = ['/login', '/register'];

  const shouldShowNavAndFooter = !hiddenPaths.includes(location.pathname);

  return (
    <div className='isolate bg-white'>
      {shouldShowNavAndFooter && <Navbar />}
      <Background>
        <Outlet />
      </Background>
      {shouldShowNavAndFooter && <Footer />}
    </div>
  );
};

export default Main;