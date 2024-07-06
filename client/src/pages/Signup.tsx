
import { useState } from "react";
import Meteors from "../components/ui/bg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BackendUrl } from "../config";
axios.defaults.withCredentials = true;

const Signup = () => {
  const navigate = useNavigate()
  const [inputs, setinputs] = useState({email: "", full_name:"", password:""})
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      `${BackendUrl}/auth/signup`,
      {
        email: inputs.email,
        password: inputs.password,
        full_name: inputs.full_name,
      },
      {
        withCredentials: true,
      }
    );
    console.log(res);
    if (res.status === 200) {
      navigate('/')
      
    }
  } catch (error) {
    console.error(error);
    
  }
};

  return (
    <div className="relative flex items-center justify-center h-screen bg-black p-20 overflow-hidden">
      <Meteors number={30} />

      <div className="relative h-screen w-full flex justify-center items-center">
        <div className="w-full bg-transparentrounded-lg shadow border rounded-xl md:mt-0 sm:max-w-md xl:p-0 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium  text-white">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="bg-transparent border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-white dark:border-gray-600"
                  placeholder="Abhishek"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setinputs((c) => ({ ...c, full_name: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium  text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-transparent border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-white dark:border-gray-600"
                  placeholder="name@company.com"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setinputs((c) => ({ ...c, email: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium  text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-transparent border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-white dark:border-gray-600"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setinputs((c) => ({ ...c,password: e.target.value }))
                  }
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-transparent focus:ring-3 focus:ring-primary-300  focus:ring-primary-600 ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-light text-gray-300">
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-transparent  focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <u
                  className="font-medium text-primary-600 hover:underline text-primary-500 cursor-pointer"
                  onClick={() => navigate("/signin")}
                >
                  {" "}
                  Signin here
                </u>
              </p>
            </form>
          </div>
        </div>
        ;
      </div>
    </div>
  );
};

export default Signup;
