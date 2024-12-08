import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { AppDispatch, RootState } from "../redux/store";
import { logoutReq } from "../redux/auth/action";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { authData } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!authData.jwt;

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky left-0 top-0 flex flex-row h-auto md:h-16 w-full items-center justify-between bg-white px-4 shadow-md z-50">
      <h1 className="text-xl font-bold text-primary-dark mb-2 md:mb-0">
        <Link to="/">Travel Article App</Link>
      </h1>
      <div className="hidden md:flex flex-row items-center gap-5 md:gap-20">
        {isAuthenticated && <h1 className="text-primary-dark hover:text-secondary hover:underline">
          <Link to="/dashboard">Dashboard</Link>
        </h1>}
        {isAuthenticated && <h1 className="text-primary-dark hover:text-secondary hover:underline">
          <Link to="/category">Category</Link>
        </h1>}
        <h1 className="text-primary-dark hover:text-secondary hover:underline">
          {authData.jwt ? (
            <Link to="/profile">Profile</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </h1>
        {authData.jwt && (
          <h1
            className="text-primary-dark hover:text-secondary hover:underline cursor-pointer"
            onClick={() => dispatch(logoutReq())}
          >
            Logout
          </h1>
        )}
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={togglePopup} className="text-primary-dark">
          <FaBars size={24} />
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={togglePopup}>
          <div
            className="fixed right-0 top-0 h-full w-3/4 bg-white shadow-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={togglePopup} className="absolute top-4 right-4 text-primary-dark mb-4">
              <FaTimes size={24} />
            </button>
            <nav className="flex flex-col gap-5 mt-8">
              <h1 className="text-primary-dark hover:text-secondary">
                <Link to="/dashboard" onClick={togglePopup}>Dashboard</Link>
              </h1>
              <h1 className="text-primary-dark hover:text-secondary">
                <Link to="/category" onClick={togglePopup}>Category</Link>
              </h1>
              <h1 className="text-primary-dark hover:text-secondary hover:underline">
                {authData.jwt ? (
                  <Link to="/profile" onClick={togglePopup}>Profile</Link>
                ) : (
                  <Link to="/login" onClick={togglePopup}>Login</Link>
                )}
              </h1>
              {authData.jwt && (
                <h1
                  className="text-primary-dark hover:text-secondary hover:underline cursor-pointer"
                  onClick={() => {
                    dispatch(logoutReq());
                    togglePopup();
                  }}
                >
                  Logout
                </h1>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;