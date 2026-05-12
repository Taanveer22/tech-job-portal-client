import axios from 'axios';
import Lottie from 'lottie-react';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import BASE_URL from '../api/baseURL';
import signinLottie from '../assets/signinLottie.json';
import AuthContext from '../context/AuthContext';

const Signin = () => {
  const { signInUser, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();
  // console.log(navigate);

  const from = location?.state || '/';

  const handleSignInForm = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // sign in auth
    try {
      // ✅ Firebase authentication
      // result contains verified Firebase user
      const result = await signInUser(email, password);

      // ✅ ALWAYS get email from Firebase user
      // safer than using form input email
      const userEmail = { email: result?.user?.email };

      // ✅ create JWT and store token cookie
      const res = await axios.post(`${BASE_URL}/auth/login`, userEmail, {
        withCredentials: true,
      });
      // console.log(res.data);
      if (res?.data) {
        toast.success('Signin done with token');
      }

      // ✅ Redirect after successful JWT creation
      navigate(from, { replace: true });
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // ✅ Firebase authentication
      // result contains verified Firebase user
      const result = await googleSignIn();

      // ✅ ALWAYS get email from Firebase user
      // safer than using form input email
      const userEmail = {
        email: result?.user?.email || result?.user?.providerData[0]?.email,
      };

      // ✅ Create JWT + store cookie
      const res = await axios.post(`${BASE_URL}/auth/login`, userEmail, {
        withCredentials: true,
      });
      // console.log(res.data);
      if (res?.data) {
        toast.success('Google sign in done with token');
      }

      // ✅ Redirect after JWT cookie stored
      navigate(from, { replace: true });
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12">
        <div className="w-96">
          <Lottie animationData={signinLottie}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSignInForm} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input name="email" type="email" className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input name="password" type="password" className="input" placeholder="Password" />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Signin</button>
            </fieldset>
          </form>
          <button onClick={handleGoogleSignIn} className="btn btn-warning mb-4 mx-6">
            Signin with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
