import React from "react";
import { IUser } from "../interfaces/user.interface";

interface IProps {
  seller: IUser;
  onClose: () => void;
}

function ContactSeller({ seller, onClose }: IProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-950 bg-opacity-50 z-50 flex-col">
      <>
        {/* Contact */}
        <div className="max-w-7xl px-4 lg:px-6 lg:px-8 py-12 lg:py-24 mx-auto">
          <div className="mb-6 sm:mb-10 max-w-2xl text-center mx-auto">
            <h2 className="font-medium text-white text-2xl sm:text-4xl dark:text-white">
              Contacts
            </h2>
          </div>
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-6 md:gap-8 lg:gap-12"> */}
          {/* End Col */}
          <div className="space-y-8 lg:space-y-16">
            <div>
              <h3 className="mb-5 font-semibold text-white dark:text-white">
                Seller address
              </h3>
              {/* Grid */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                <div className="flex gap-4">
                  <svg
                    className="flex-shrink-0 size-5 text-gray-100 dark:text-neutral-100"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx={12} cy={10} r={3} />
                  </svg>
                  <div className="grow">
                    <address className="mt-1 text-white not-italic dark:text-white">
                      {seller.college}
                      <br />
                      {seller.city}
                    </address>
                  </div>
                </div>
              </div>
              {/* End Grid */}
            </div>
            <div>
              <h3 className="mb-5 font-semibold text-white dark:text-white">
                Seller contacts
              </h3>
              {/* Grid */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                <div className="flex gap-4">
                  <svg
                    className="flex-shrink-0 size-5 text-gray-50 dark:text-neutral-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
                    <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
                  </svg>
                  <div className="grow">
                    <p className="text-sm text-gray-50 dark:text-neutral-400">
                      Email
                    </p>
                    <p>
                      <a
                        className="relative inline-block font-medium text-white before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400 hover:before:bg-black focus:outline-none focus:before:bg-black dark:text-white dark:hover:before:bg-white dark:focus:before:bg-white"
                        href="mailto:example@site.so"
                      >
                        {seller.email}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <svg
                    className="flex-shrink-0 size-5 text-gray-500 dark:text-neutral-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      className="text-white"
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                    />
                  </svg>
                  <div className="grow">
                    <p className="text-sm text-white dark:text-neutral-400">
                      Call
                    </p>
                    <p>
                      <a
                        className="relative inline-block font-medium text-white before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400 hover:before:bg-black focus:outline-none focus:before:bg-black dark:text-white dark:hover:before:bg-white dark:focus:before:bg-white"
                        href="mailto:example@site.so"
                      >
                        {seller.contact_number}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              {/* End Grid */}
            </div>
          </div>
          {/* End Col */}
          {/* </div> */}
        </div>
        {/* End Contact */}
      </>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Close
      </button>
    </div>
  );
}

export default ContactSeller;
