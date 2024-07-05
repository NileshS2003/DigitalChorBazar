import { useSelector } from "react-redux";
import { SignOutUserAsync, selectLoggedInUser } from "../Auth/authSlice";
import { useForm } from "react-hook-form";
import { IUser } from "../../interfaces/user.interface";
import { useAppDispatch } from "../../app/store";
import { updateUserAsync } from "./userSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const loggedInUser = useSelector(selectLoggedInUser);
  const { handleSubmit, register } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [editProfile, setEditProfile] = useState(false);

  const onSubmit = async (data: any) => {
    const mahiti: IUser = { ...loggedInUser, ...data };
    setEditProfile(false);
    console.log(mahiti);
    const res = await dispatch(
      updateUserAsync({ mahiti, userId: (loggedInUser as IUser)._id })
    );
    console.log(res);
  };

  return (
    <div>
      <section className="w-full overflow-hidden dark:bg-gray-900">
        <div className="flex flex-col">
          <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
            <img
              src={
                loggedInUser?.pfp === undefined
                  ? "/images/pfpdummy.jpg"
                  : loggedInUser.pfp
              }
              alt="User Profile"
              className="w-[200px] h-[200px] object-cover rounded-full mx-auto my-5 "
            />
          </div>
          <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
            {/* Detail */}
            {editProfile && loggedInUser ? (
              <form
                className="max-w-md mx-auto mt-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="name"
                    id="floating_name"
                    {...register("name", { required: true })}
                    className="block py-2.5 px-0 w-full   text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required={true}
                    defaultValue={loggedInUser.name}
                  />
                  <label
                    htmlFor="floating_name"
                    className="peer-focus:font-medium absolute   text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Name
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    id="floating_username"
                    {...register("username", { required: true })}
                    className="block py-2.5 px-0 w-full   text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required={true}
                    defaultValue={
                      loggedInUser.username === undefined
                        ? " "
                        : loggedInUser.username
                    }
                  />
                  <label
                    htmlFor="floating_username"
                    className="peer-focus:font-medium absolute   text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    username
                  </label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      id="city"
                      {...register("city")}
                      className="block py-2.5 px-0 w-full   text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      defaultValue={
                        loggedInUser.city === undefined
                          ? " "
                          : loggedInUser.city
                      }
                      required={true}
                    />
                    <label
                      htmlFor="city"
                      className="peer-focus:font-medium absolute   text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      city
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      id="state"
                      {...register("state", { required: true })}
                      className="block py-2.5 px-0 w-full   text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      defaultValue={
                        loggedInUser.state === undefined
                          ? " "
                          : loggedInUser.state
                      }
                      required={true}
                    />
                    <label
                      htmlFor="state"
                      className="peer-focus:font-medium absolute   text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      State
                    </label>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="tel"
                      id="floating_phone"
                      {...register("contact_number", { required: true })}
                      className="block py-2.5 px-0 w-full   text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      defaultValue={
                        loggedInUser.contact_number === undefined
                          ? " "
                          : loggedInUser.contact_number
                      }
                      required={true}
                    />
                    <label
                      htmlFor="floating_phone"
                      className="peer-focus:font-medium absolute   text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Contact Number
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      id="college"
                      {...register("college", { required: true })}
                      className="block py-2.5 px-0 w-full   text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      defaultValue={
                        loggedInUser.college === undefined
                          ? " "
                          : loggedInUser.college
                      }
                      required={true}
                    />
                    <label
                      htmlFor="college"
                      className="peer-focus:font-medium absolute   text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      College
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg   w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            ) : (
              loggedInUser && (
                <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
                  <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
                    <div className="w-full">
                      <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                        <div className="flex flex-col pb-3">
                          <dt className="mb-1 text-gray-500 md:  dark:text-gray-400">
                            Name
                          </dt>
                          <dd className="font-semibold">{loggedInUser.name}</dd>
                        </div>
                        <div className="flex flex-col py-3">
                          <dt className="mb-1 text-gray-500 md:  dark:text-gray-400">
                            Username
                          </dt>
                          <dd className="font-semibold">
                            {loggedInUser.username}
                          </dd>
                        </div>
                        <div className="flex flex-col py-3">
                          <dt className="mb-1 text-gray-500 md:  dark:text-gray-400">
                            State
                          </dt>
                          <dd className="font-semibold">
                            {loggedInUser.state}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div className="w-full">
                      <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                        <div className="flex flex-col pb-3">
                          <dt className="mb-1 text-gray-500 md:  dark:text-gray-400">
                            College
                          </dt>
                          <dd className="font-semibold">
                            {loggedInUser.college}
                          </dd>
                        </div>
                        <div className="flex flex-col pt-3">
                          <dt className="mb-1 text-gray-500 md:  dark:text-gray-400">
                            Phone Number
                          </dt>
                          <dd className="font-semibold">
                            {loggedInUser.contact_number}
                          </dd>
                        </div>
                        <div className="flex flex-col pt-3">
                          <dt className="mb-1 text-gray-500 md:  dark:text-gray-400">
                            City
                          </dt>
                          <dd className="font-semibold">{loggedInUser.city}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              )
            )}
            {!editProfile && (
              <button
                type="button"
                onClick={() => setEditProfile((prev) => !prev)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-1/5 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit Info
              </button>
            )}
            <Link
              to={"/listing"}
              type="button"
              className="text-white bg-dwitiy hover:bg-pratham focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-1/5 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3"
            >
              Show Listings
            </Link>
            <button
              type="button"
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-1/5 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3"
              onClick={() => {
                dispatch(SignOutUserAsync());
                navigate("/sign-in");
              }}
            >
              Sign Out
            </button>
            {/* <div className="lg:w-[70%] md:h-[14rem] xs:w-full xs:h-[10rem] my-10">
              <h1 className="w-fit font-serif my-4 pb-1 pr-2 rounded-b-md border-b-4 border-blue-600 dark:border-b-4 dark:border-yellow-600 dark:text-white lg:text-4xl md:text-3xl xs:text-xl">
                My Location
              </h1>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252230.02028974562!2d38.613328040215286!3d8.963479542403238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa!5e0!3m2!1sen!2set!4v1710567234587!5m2!1sen!2set"
                className="rounded-lg w-full h-full"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div> */}
          </div>
        </div>
      </section>
      <div className="h-[100px]"></div>
    </div>
  );
}

export default Profile;
