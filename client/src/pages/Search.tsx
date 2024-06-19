import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FunnelIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { IListing } from "../interfaces/listing.interface";
import ListingGrid from "../components/ListingGrid";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../features/Auth/authSlice";

export default function Search() {
  const navigate = useNavigate();

  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    IsCollegeOnly: false,
    isNegotiable: false,
    sort: "createdAt",
    order: "desc",
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState<IListing[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const loggedInUser = useSelector(selectLoggedInUser);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/listing/getTypes");
      const optionset = await res.json();
      setOptions(optionset);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const IsCollegeOnlyFromUrl = urlParams.get("IsCollegeOnly");
    const isNegotiableFromUrl = urlParams.get("isNegotiable");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      IsCollegeOnlyFromUrl ||
      isNegotiableFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        IsCollegeOnly: IsCollegeOnlyFromUrl === "true" ? true : false,
        isNegotiable: isNegotiableFromUrl === "true" ? true : false,
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      console.log(searchQuery);
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      console.log(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e: any) => {
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    } else if (
      e.target.id === "IsCollegeOnly" ||
      e.target.id === "isNegotiable"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    } else if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    } else {
      setSidebardata({ ...sidebardata, type: e.target.value });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set(
      "IsCollegeOnly",
      sidebardata.IsCollegeOnly === true && loggedInUser ? loggedInUser.college as string : "false"
    );
    // urlParams.set(
    //   "furnished",
    //   sidebardata.furnished === true ? "true" : "false"
    // );
    urlParams.set(
      "isNegotiable",
      sidebardata.isNegotiable === true ? "true" : "false"
    );
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    console.log(searchQuery);
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex.toString());
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form
                    className="mt-4 border-t border-gray-200"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex mx-auto items-center my-2 w-4/5 ">
                      <input
                        type="text"
                        id="searchTerm"
                        defaultValue={sidebardata.searchTerm}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        placeholder="Search..."
                        className="border rounded-lg p-3 w-full"
                      />
                    </div>
                    <Disclosure
                      as="div"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                Category
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {options.map(
                                (option: string, optionIdx: number) => (
                                  <div
                                    key={optionIdx.toString()}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={option}
                                      name="type"
                                      onChange={(e) => handleChange(e)}
                                      value={option}
                                      type="radio"
                                      defaultChecked={
                                        sidebardata.type === option
                                      }
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label
                                      htmlFor={option}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option}
                                    </label>
                                  </div>
                                )
                              )}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    <Disclosure
                      as="div"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                Search Details
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                  <input
                                    id="IsCollegeOnly"
                                    name="IsCollegeOnly"
                                    // {...register("IsCollegeOnly")}
                                    onChange={(e) => handleChange(e)}
                                    defaultChecked={sidebardata.IsCollegeOnly}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  />
                                </div>
                                <div className="text-sm leading-6">
                                  <label
                                    htmlFor="IsCollegeOnly"
                                    className="font-medium text-gray-900"
                                  >
                                    Only in college
                                  </label>
                                </div>
                              </div>
                              <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                  <input
                                    id="isNegotiable"
                                    name="isNegotiable"
                                    // {...register("isNegotiable")}
                                    onChange={(e) => handleChange(e)}
                                    defaultChecked={sidebardata.isNegotiable}
                                    // onChange={() => setisNegotiable(!isNegotiable)}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  />
                                </div>
                                <div className="text-sm leading-6">
                                  <label
                                    htmlFor="isNegotiable"
                                    className="font-medium text-gray-900"
                                  >
                                    Offer
                                  </label>
                                </div>
                              </div>
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    <Disclosure
                      as="div"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                Sorting
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              <select
                                onChange={handleChange}
                                defaultValue={"createdAt_desc"}
                                id="sort_order"
                                className="border rounded-lg p-3"
                              >
                                <option value="regularPrice_desc">
                                  Price high to low
                                </option>
                                <option value="regularPrice_asc">
                                  Price low to hight
                                </option>
                                <option value="createdAt_desc">Latest</option>
                                <option value="createdAt_asc">Oldest</option>
                              </select>
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>

                    <div className="flex justify-center">
                      <button
                        className="mt-4 bg-slate-200 w-4/5 h-9 rounded-md text-black"
                        type="submit"
                      >
                        SEARCH
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-4 lg:px-7">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Search Results
            </h1>

            <div className="flex items-center">
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="listings-heading" className="pb-24 pt-6">
            <h2 id="listings-heading" className="sr-only">
              listings
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form
                className="lg:grid-cols-1 hidden lg:block"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className="flex items-center my-2 ">
                  <input
                    type="text"
                    id="searchTerm"
                    defaultValue={sidebardata.searchTerm}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Search..."
                    className="border rounded-lg p-3 w-full"
                  />
                </div>
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Category
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-6">
                          {options.map((option: string, optionIdx: number) => (
                            <div
                              key={optionIdx.toString()}
                              className="flex items-center"
                            >
                              <input
                                id={option}
                                name="type"
                                onChange={(e) => handleChange(e)}
                                value={option}
                                type="radio"
                                defaultChecked={sidebardata.type === option}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label
                                htmlFor={option}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Search Details
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                              <input
                                id="IsCollegeOnly"
                                name="IsCollegeOnly"
                                onChange={(e) => handleChange(e)}
                                defaultChecked={sidebardata.IsCollegeOnly}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                            </div>
                            <div className="text-sm leading-6">
                              <label
                                htmlFor="IsCollegeOnly"
                                className="font-medium text-gray-900"
                              >
                                Only In College
                              </label>
                            </div>
                          </div>
                          <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                              <input
                                id="isNegotiable"
                                name="isNegotiable"
                                // {...register("isNegotiable")}
                                onChange={(e) => handleChange(e)}
                                // onChange={() => setisNegotiable(!isNegotiable)}
                                defaultChecked={sidebardata.isNegotiable}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                            </div>
                            <div className="text-sm leading-6">
                              <label
                                htmlFor="isNegotiable"
                                className="font-medium text-gray-900"
                              >
                                Offer
                              </label>
                            </div>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Sorting
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          <select
                            onChange={handleChange}
                            defaultValue={
                              sidebardata.sort + "_" + sidebardata.order
                            }
                            id="sort_order"
                            className="border rounded-lg p-3"
                          >
                            <option value="regularPrice_desc">
                              Price high to low
                            </option>
                            <option value="regularPrice_asc">
                              Price low to hight
                            </option>
                            <option value="createdAt_desc">Latest</option>
                            <option value="createdAt_asc">Oldest</option>
                          </select>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <button
                  type="submit"
                  className="mt-4 bg-slate-200 w-full h-9 rounded-md text-black "
                >
                  SEARCH
                </button>
              </form>

              {/* listing grid  starts*/}
              <div className="lg:col-span-3 flex flex-wrap gap-4 justify-start h-max">
                {!loading &&
                  listings.map((listing) => (
                    <ListingGrid
                      listing={listing}
                      key={listing._id}
                    ></ListingGrid>
                  ))}
              </div>
              {/* listing Grid End */}
              <div className="">{/* Your content */}</div>
            </div>
          </section>
        </main>
        {showMore && (
          <button
            onClick={onShowMoreClick}
            className="text-green-700 hover:underline p-7 text-center text-2xl w-full"
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
}
