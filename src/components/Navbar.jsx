import { useContext } from 'react';
import { NavLink } from 'react-router';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  // console.log(user);
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success('sign out done');
      })
      .catch(() => {
        toast.error('sign out failed');
      });
  };
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/applications/me">My Applications</NavLink>
      </li>
      <li>
        <NavLink to="/jobs/add">Hr Add Job</NavLink>
      </li>
      <li>
        <NavLink to="/jobs/post">Hr Posted Jobs</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="max-lg:collapse bg-base-200 shadow-sm w-full rounded-md">
        <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
        <label
          htmlFor="navbar-1-toggle"
          className="fixed inset-0 hidden max-lg:peer-checked:block"
        ></label>
        <div className="collapse-title navbar">
          <div className="navbar-start">
            <label htmlFor="navbar-1-toggle" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <button className="btn btn-ghost text-xl">Tech Job Portal</button>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="flex gap-2 items-center">
                <span>{user?.displayName}</span>
                <button onClick={handleSignOut} className="btn btn-sm">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <NavLink to="/register" className="btn btn-sm">
                  Register
                </NavLink>
                <NavLink to="/signin" className="btn btn-sm">
                  Signin
                </NavLink>
              </div>
            )}
          </div>
        </div>

        <div className="collapse-content lg:hidden z-1">
          <ul className="menu">{links}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
