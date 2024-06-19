import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogPanel } from '@headlessui/react';
import { BanknotesIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(localStorage.getItem('token'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setUserToken(localStorage.getItem('token'));
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserToken(null);
  };

  return (
    <header className="inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <BanknotesIcon className="w-8 h-8 mr-2" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link to='/' className='text-sm font-semibold leading-6 text-gray-900'>
            Home
          </Link>
          <Link to='/posts' className='text-sm font-semibold leading-6 text-gray-900'>
            Posts
          </Link>
          {userToken && (
            <Link to='/me' className='text-sm font-semibold leading-6 text-gray-900'>
              Me
            </Link>
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {userToken ? (
            <a
              onClick={handleLogout}
              className="cursor-pointer text-sm font-semibold leading-6 text-gray-900"
            >
              Log out<span aria-hidden="true">&rarr;</span>
            </a>
          ) : (
            <a
              onClick={handleLogin}
              className="cursor-pointer text-sm font-semibold leading-6 text-gray-900"
            >
              Log in<span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>
      </nav>
      <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link to='/' className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                  Home
                </Link>
                <Link to='/posts' className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                  Posts
                </Link>
                {userToken && (
                  <Link to='/me' className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                    Me
                  </Link>
                )}
              </div>
              <div className="py-6">
                {userToken ? (
                  <a
                    onClick={handleLogout}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log out
                  </a>
                ) : (
                  <a
                    href="#"
                    onClick={handleLogin}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;
