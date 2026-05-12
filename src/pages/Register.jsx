import axios from 'axios';
import Lottie from 'lottie-react';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import BASE_URL from '../api/baseURL';
import registerLottie from '../assets/registerLottie.json';
import AuthContext from '../context/AuthContext';

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegisterForm = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    //console.log(name, photo, email, password);
    try {
      // ✅ create Firebase user
      // result contains verified Firebase user
      const result = await createUser(email, password);
      // ✅ update Firebase profile
      await updateUserProfile(name, photo);
      // ✅ ALWAYS get email from Firebase user
      // safer than using form input email
      const userEmail = { email: result?.user?.email };
      // ✅ create JWT + store cookie
      const res = await axios.post(`${BASE_URL}/auth/login`, userEmail, { withCredentials: true });
      // console.log(res.data);
      if (res?.data) {
        toast.success('Registration done');
      }

      // ✅ redirect after JWT stored
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="w-96">
          <Lottie animationData={registerLottie}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleRegisterForm} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input name="name" type="text" className="input" placeholder="Name" />
              <label className="label">Photo</label>
              <input name="photo" type="text" className="input" placeholder="Photo" />
              <label className="label">Email</label>
              <input name="email" type="email" className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input name="password" type="password" className="input" placeholder="Password" />
              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
