
function Profile() {
  return (
    <div>
      <div className="bg-white md:mx-auto rounded shadow-xl w-full md:w-1/2 overflow-hidden">
        <div className="h-[140px] bg-gradient-to-r from-cyan-500 to-blue-500" />
        <div className="px-5 py-2 flex flex-col gap-3 pb-6">
          <div className="h-[90px] shadow-md w-[90px] rounded-full border-4 overflow-hidden -mt-14 border-white">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              className="w-full h-full rounded-full object-center object-cover"
            />
          </div>
          <div className="">
            <h3 className="text-xl text-slate-900 relative font-bold leading-6">
              Dadda Hicham
            </h3>
            <p className="text-sm text-gray-600">@daddasoft</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <span className="rounded-sm bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
              Developer
            </span>
            <span className="rounded-sm bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
              Design
            </span>
            <span className="rounded-sm bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
              Managements
            </span>
            <span className="rounded-sm bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800">
              Projects
            </span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 transition hover:border-gray-300 active:bg-white hover:bg-gray-100 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Send Message
            </button>
            <button
              type="button"
              className="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-blue-700 px-3 py-2 text-sm font-medium text-white transition hover:border-blue-300 hover:bg-blue-600 active:bg-blue-700 focus:blue-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Add to projects
            </button>
          </div>
          <h4 className="text-md font-medium leading-3">About</h4>
          <p className="text-sm text-stone-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere
            dolores aliquid sequi sunt iusto ipsum earum natus omnis asperiores
            architecto praesentium dignissimos pariatur, ipsa cum? Voluptate
            vero eius at voluptas?
          </p>
          <h4 className="text-md font-medium leading-3">Experiences</h4>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 px-2 py-3 bg-white rounded border w-full ">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                className="h-8 w-8 text-slate-500"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
              </svg>
              <div className="leading-3">
                <p className=" text-sm font-bold text-slate-700">Ui Designer</p>
                <span className="text-xs text-slate-600">5 years</span>
              </div>
              <p className="text-sm text-slate-500 self-start ml-auto">
                As Ui Designer on Front Page
              </p>
            </div>
            <div className="flex items-center gap-3 px-2 py-3 bg-white rounded border w-full ">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                className="h-8 w-8 text-slate-500"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
              </svg>
              <div className="leading-3">
                <p className=" text-sm font-bold text-slate-700">Ui Designer</p>
                <span className="text-xs text-slate-600">5 years</span>
              </div>
              <p className="text-sm text-slate-500 self-start ml-auto">
                As Ui Designer on Front Page
              </p>
            </div>
            <div className="flex items-center gap-3 px-2 py-3 bg-white rounded border w-full ">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                className="h-8 w-8 text-slate-500"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
              </svg>
              <div className="leading-3">
                <p className=" text-sm font-bold text-slate-700">Ui Designer</p>
                <span className="text-xs text-slate-600">5 years</span>
              </div>
              <p className="text-sm text-slate-500 self-start ml-auto">
                As Ui Designer on Front Page
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
