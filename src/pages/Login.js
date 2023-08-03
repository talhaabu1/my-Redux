import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.svg";
import { googleLogin, loginUser } from "../features/auth/authSlice";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success, email, isError, errorMessage } = useSelector(
    (state) => state.auth
  );
  const onSubmit = ({ email, password }) => {
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (success && email) {
      navigate("/");
    }
  }, [success, email, navigate]);

  const handelGoogleLogin = () => {
    dispatch(googleLogin());
  };

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
    }
  }, [isError, errorMessage]);

  return (
    <div className="flex h-screen items-center">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="w-1/2">
        <img src={loginImage} className="h-full w-full" alt="" />
      </div>
      <div className="w-1/2 grid place-items-center">
        <div className="bg-[#FFFAF4] rounded-lg grid place-items-center p-10">
          <h1 className="mb-10 font-medium text-2xl">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <div className="flex flex-col items-start">
                <label htmlFor="email" className="ml-5">
                  Email
                </label>
                <input type="email" {...register("email")} id="email" />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="password" className="ml-5">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                />
              </div>
              <div className="relative !mt-8">
                <button
                  type="submit"
                  className="font-bold text-white py-3 rounded-full bg-primary w-full"
                >
                  Login
                </button>
              </div>
              <div className="relative !mt-3">
                <button
                  type="click"
                  className="font-bold text-white py-3 rounded-full bg-primary w-full"
                  onClick={handelGoogleLogin}
                >
                  <div className=" flex justify-center items-center space-x-5">
                    <img
                      className=" h-5"
                      src="https://cdn-icons-png.flaticon.com/128/281/281764.png"
                      alt=""
                    />
                  </div>
                </button>
              </div>
              <div>
                <p>
                  Don't have an account?
                  <span
                    className="text-primary hover:underline cursor-pointer"
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
