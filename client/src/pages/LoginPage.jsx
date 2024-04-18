import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaGoogle, FaHamburger } from "react-icons/fa";

function LoginPage() {
    const navigate = useNavigate();

    const [input, setInput] = useState({
      email: "",
      password: "",
    });
  
    const handleInput = (event) => {
      const { name, value } = event.target;
      setInput({
        ...input,
        [name]: value,
      });
    };
  
    const handleFormLogin = async (event) => {
      event.preventDefault();
      try {
        let respon = await axios({
          method: "post",
          url: "http://localhost:3100/login",
          data: input,
        });

        localStorage.access_token = respon.data.access_token;
        navigate("/");
        Swal.fire({
          title: "login success",
          icon: "success",
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: error.response.data.message,
          icon: "error",
        });
      }
    };
  
    const handleCredentialResponse = async (credential) => {
        // console.log("Encoded JWT ID token: ", response);
      try {
        const { data } = await axios.post(`http://localhost:3100/google-login`, {
        googleToken: credential});
      localStorage.access_token = data.access_token;
      navigate("/");
      Swal.fire({
        title: "login success",
        icon: "success",
      });
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      //ditaruh di useEffect karena ada interaksi dengan dom untuk memastikan dom nya sudah terload semua
      google.accounts.id.initialize({
        client_id:
          "706095064565-p8fbhoc2gprsdtb2s6jern58happfcrp.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
    }, []);
  
    return (
      <>
        <div className="h-screen w-full fixed grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          <div className="hidden lg:flex col-span-1 xl:col-span-2">
            <img
              src="https://sportsclean.com.au/wp-content/uploads/2020/08/Articifial-Futsal-Field-Care.jpg"
              alt="Fields"
              className="h-screen object-cover"
            />
          </div>
          <div className="bg-red-300 flex flex-col items-center justify-center px-24">
            <button className=" lg:hidden rounded-lg border border-red-400 p-4">
              <FaHamburger />
            </button>
            <h2 className="text-5xl font-semibold tracking-wider text-white mb-10">
              LOGIN
            </h2>
            <form onSubmit={handleFormLogin}>
              <div className="flex flex-col w-full md:w-1/2 lg:w-full gap-2">
                <label htmlFor="email" className="text-white text-base">
                  Email or Username
                </label>
                <input
                  type="text"
                  name="email"
                  className="py-2 px-4 rounded-md text-xl mb-2"
                  onChange={handleInput}
                />
                <label htmlFor="password" className="text-white text-base">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="py-2 px-4 rounded-md text-xl"
                  onChange={handleInput}
                />
  
                <a href="" className="text-right text-white hover:text-red-100">
                  Forgot Password?
                </a>
  
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 text-xl text-white rounded-md mt-3"
                >
                  Sign In
                </button>
  
                <button className="border border-red-500 hover:bg-red-400 px-4 py-2 text-xl text-white rounded-md mt-3">
                  Sign Up
                </button>
  
                <p className="text-center">- OR -</p>
                <Link to={"/"} className="text-center text-blue underline">
                  back
                </Link>
  
                {/* <button
                  id="buttonDiv"
                  className=" hover:bg-red-400 px-4 py-2 text-lg text-white rounded-md mt-3 flex items-center justify-center gap-2"
                >
                  <FaGoogle /> Sign in with Google
                </button> */}
                <div id="buttonDiv"></div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
}

export default LoginPage;