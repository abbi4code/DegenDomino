
import { useState } from 'react';
import Meteors from '../components/ui/bg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BackendUrl } from '../config';
import toast, { Toaster } from 'react-hot-toast';

export default function Signin() {
    const navigate = useNavigate()
    const [signIninputs, setsignIninputs] = useState({email:"", password:""})


    const handleSubmit = async (e: any) => {
      e.preventDefault();
      try {
        const res = await axios.post(`${BackendUrl}/auth/signin`, {
          email: signIninputs.email,
          password: signIninputs.password,
        });
        console.log(res);
        const token = res.data.token;
        localStorage.setItem("usertoken", token);

        if (res.status === 200) {
          toast.success("User signin successfully");
          setTimeout(() => {
            navigate("/");
          }, 500);
        }
        
      } catch (error) {
        //@ts-ignore
        if (error.response.status === 401) {
         
           toast.error("User dont exists");
        }else if(error.response.status === 400){
          toast.error("Invalid credentials");
        }
        else {
          toast.error("something went wrong");
        }
         
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
              Welcome Degens
            </h1>
            <form className="space-y-4 md:space-y-6 " onSubmit={handleSubmit}>
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
                    setsignIninputs((c) => ({ ...c, email: e.target.value }))
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
                    setsignIninputs((c) => ({ ...c, password: e.target.value }))
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
                className="w-full text-white bg-transparent border  border-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center ring-offset-gray-800"
              >
                Lets goo
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have a account?{" "}
                <u
                  className="font-medium text-primary-600 hover:underline text-primary-500 cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  {" "}
                  Signup here
                </u>
              </p>
            </form>
          </div>
        </div>
        ;
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
          },
        }}
      />
    </div>
  );
}
