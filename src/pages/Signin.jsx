import axios from 'axios';
import Lottie from 'lottie-react';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
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
      // ✅ Firebase/Auth signin
      await signInUser(email, password);
      toast.success('Signed in successfully');

      // ✅ Create JWT payload
      const userEmail = { email: email };

      // ✅ Wait until cookie is stored
      const res = await axios.post(`http://localhost:5000/jwt`, userEmail, {
        withCredentials: true,
      });
      console.log(res.data);

      // ✅ Redirect after successful JWT creation
      navigate(from, { replace: true });
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // ✅ Google login
      const result = await googleSignIn();
      toast.success('Google sign in done');

      // ✅ Get logged in user email
      const userEmail = {
        email: result?.user?.email || result?.user?.providerData[0]?.email,
      };

      // ✅ Create JWT + store cookie
      const res = await axios.post(`http://localhost:5000/jwt`, userEmail, {
        withCredentials: true,
      });
      console.log(res.data);
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
