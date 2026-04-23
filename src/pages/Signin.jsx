import Lottie from "lottie-react";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import signinLottie from "../assets/signinLottie.json";
import AuthContext from "../context/AuthContext";

const Signin = () => {
  const { signInUser, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();
  // console.log(navigate);

  const from = location?.state || "/";

  const handleSignInForm = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // sign in auth
    signInUser(email, password)
      .then((result) => {
        alert(result?.user?.displayName);
        navigate(from);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        alert(result?.user?.displayName);
        navigate(from);
      })
      .catch((error) => {
        alert(error);
      });
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
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
              />
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                className="input"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Signin</button>
            </fieldset>
          </form>
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-warning mb-4 mx-6"
          >
            Signin with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
