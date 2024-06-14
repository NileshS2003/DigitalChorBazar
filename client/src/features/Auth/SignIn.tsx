import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { navigate } from "@reach/router";
import { useAppDispatch } from "../../app/store";
import { ErrorPayloadType } from "../../interfaces/error.interface";
import { SignInUserAsync, fetchUserAsync } from "./authSlice";
import { IUserData } from "../../interfaces/user.interface";
import { useEffect, useState } from "react";
import OAuth from "../../components/OAuth";
// import OAuth from "../components/OAuth";

export default function SignIn() {
  const {
    register,
    handleSubmit,
  } = useForm();
  const [loading, setLoading] = useState(false);

  

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
     const  fetchUserIfLoggedIUn= async() => {
       const user=await dispatch(fetchUserAsync())
       if(user)navigate('/')
    }

    fetchUserIfLoggedIUn()
  })

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const mahiti: IUserData = {
        email: data.email,
        password: data.password,
      };
      const resultAction = await dispatch(SignInUserAsync(mahiti));

      if (SignInUserAsync.fulfilled.match(resultAction)) {
        console.log("User Logged In:", resultAction.payload);
        navigate("/");
      } else {
        if (resultAction.payload) {
          const errorPayload = resultAction.payload as ErrorPayloadType;
          console.log("Error 1:", errorPayload.message);
        } else {
          console.log("Error:", resultAction.error.message);
        }
      }
    } catch (error: any) {
      console.log(error);
    }

    setLoading(false);
  };

  // errors && console.log(errors);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign In to account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={
              handleSubmit(onSubmit)
            }
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  {...register("password", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={() => console.log("cliked")}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading === true ? <p>loading...</p> : <p>Log In</p>}
              </button>
            </div>
            <div className="flex w-full items-center gap-2 py-3 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200" />
              OR
              <div className="h-px w-full bg-slate-200" />
            </div>
            <OAuth />
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to={`/sign-up`}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
