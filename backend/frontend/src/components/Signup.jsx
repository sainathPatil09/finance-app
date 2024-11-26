import { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

export default function Signup(){

  const{authUser, setAuthUser} = useAuth()
  const navigateTo = useNavigate();

  const[fullname, setFullName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[confirmPassword, setConfirmPassword] = useState("");
  const[photo, setPhoto] = useState("");


  const handleSignup = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("photo", photo);

    try {
      const {data} = await axios.post('/api/users/signup', formData)
      console.log(data)
      setAuthUser(data)
      localStorage.setItem("auth", JSON.stringify(data));
      // alert("User registered successfully")
      setTimeout(() => {
        navigateTo('/')
        window.location.reload()
        
      }, 2000);
      toast.success("Registered successfully")

      setFullName("");
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setPhoto("")
    } catch (error) {
      console.log(error)
      toast.error("error in signup")

    }

  }

  return (
    <>
      <div className="absolute inset-0 -z-10 h-screen w-full items-center px-5 py-12 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          /> */}
            <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Create Account
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSignup} method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none border-none text-lg"
                    value={fullname}
                    onChange={(e)=>setFullName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    required
                    className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Password
                  </label>
                  {/* <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-400 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    required
                    className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none border-none"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Confirm Password
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none border-none"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>


              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Profile pic
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    type="file"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none border-none text-white"
                    onChange={(e)=>setPhoto(e.target.files[0])}
                  />
                </div>
              </div>

              

              <div>
                <button
                  type="submit"
                  required
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Signup
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
               have account?{" "}
              <Link
                to={'/login'}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
