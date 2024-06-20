import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // Import Swiper autoplay styles
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import ListingGrid from "../components/ListingGrid";
// import { useState } from "react";
// import { IListing } from "../interfaces/listing.interface";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../features/Auth/authSlice";
import {
  getAllListingsAsync,
  selectListings,
} from "../features/lisitng/listingSlice";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/store";
import { IListing } from "../interfaces/listing.interface";

function Home() {
  const [herolistings, setherolistings] = useState<IListing[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const listings = useSelector(selectListings);
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllListingsAsync());

    async function fetchCategories() {
      const res = await fetch("/api/listing/getTypes");
      const optionset = await res.json();
      setOptions(optionset);
    }
    fetchCategories();

    async function HerolListing() {
      if (listings) {
        const some =
          loggedInUser?.college !== undefined
            ? listings?.filter((list) => list.college === loggedInUser.college)
            : listings?.filter((list) => list.isNegotiable === true);
        console.log((listings as IListing[])[0].college);

        setherolistings(some as IListing[]);
      }
    }
    HerolListing();
  }, []);

  console.log(herolistings);
  /**********************Creating Hero section Data *************/

  const collegeListings = listings?.filter(
    (list) => list.college === loggedInUser?.college
  );
  // : null;

  /***********************Making Map for storing different listings in their respective section*********** */

  type MyMap = Map<string, IListing[]>;

  // Initialize the map
  const data: MyMap = new Map<string, IListing[]>();

  options.map((option) => {
    const cateListing = listings?.filter((list) => list.type === option);
    if (cateListing !== undefined) {
      data.set(option, cateListing as IListing[]);
    }
  });

  // console.log(data)
  SwiperCore.use([Navigation]);

  return (
    <div className="bg-gray-100 h-screen">
      {loggedInUser && loggedInUser.college !== undefined ? (
        <div>
          <h1 className="block text-center text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight py-3">
            In Your
            <span className="text-blue-600">{" " + loggedInUser.college}</span>
          </h1>
          <div className="bg-white mx-auto max-w-7xl">
            {/* Hero */}
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 2500, // Delay between slides in milliseconds (1000ms = 1 second)
                disableOnInteraction: false, // Autoplay will not be disabled after interactions
              }}
            >
              {collegeListings &&
                (collegeListings as IListing[]).map((listing) => (
                  <SwiperSlide
                    className="my-3 px-6 py-8  sm:px-8 sm:py-8 "
                    key={listing._id}
                  >
                    {/* Grid */}
                    <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center md:px-4">
                      <div>
                        <h1 className="block text-center text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight">
                          {listing.title + " "}
                          {/* <span className="text-blue-600">Preline</span> */}
                        </h1>
                        <p className="mt-3 text-lg text-gray-800">
                          {listing.description}
                        </p>
                        <p className="mt-3 text-lg text-gray-900">
                          Used Time :{" "}
                          <span className="text-gray-700">
                            {listing.used_time}
                          </span>
                        </p>
                        {/* Buttons */}
                        <div className="mt-7 grid gap-3 w-full sm:inline-flex">
                          <Link
                            to={`/product-detail/${listing._id}`}
                            className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            Details
                            <svg
                              className="flex-shrink-0 size-4"
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
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </Link>
                        </div>
                        {/* End Buttons */}
                      </div>
                      {/* End Col */}
                      <div className="relative ms-4">
                        <img
                          className="sm:h-[450px] sm:w-4/5 h-[250px] w-auto object-cover rounded-md mr-0 mt-3 mb-3"
                          src={listing.photos[0]}
                          alt="Image Description"
                        />
                        <div className="absolute inset-0 -z-[1] bg-gradient-to-tr from-gray-200 via-white/0 to-white/0 size-full rounded-md mt-4 -mb-4 me-4 -ms-4 lg:mt-6 lg:-mb-6 lg:me-6 lg:-ms-6" />
                      </div>
                      {/* End Col */}
                    </div>
                    {/* End Grid */}
                  </SwiperSlide>
                ))}
            </Swiper>
            {/* End Hero */}
          </div>
        </div>
      ) : (
        herolistings && (
          <div>
            <h1 className="block text-center text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight py-3">
              Today's biggest
              <span className="text-blue-600"> Offers</span>
            </h1>
            <div className="bg-white mx-auto max-w-7xl">
              {/* Hero */}
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 2500, // Delay between slides in milliseconds (1000ms = 1 second)
                  disableOnInteraction: false, // Autoplay will not be disabled after interactions
                }}
              >
                {/* {console.log(herolistings)} */}
                {herolistings.map((listing) => (
                  <SwiperSlide
                    className="my-3 px-6 py-8 sm:px-8 sm:py-8 "
                    key={listing._id.toString()}
                  >
                    <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center pl-8">
                      <div>
                        <h1 className="block text-center text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight">
                          {listing.title + " "}
                        </h1>
                        <p className="mt-3 text-lg text-gray-800">
                          {listing.description}
                        </p>
                        <p className="mt-3 text-lg text-gray-900">
                          Used Time :{" "}
                          <span className="text-gray-700">
                            {listing.used_time}
                          </span>
                        </p>
                        <div className="mt-7 grid gap-3 w-full sm:inline-flex">
                          <Link
                            to={`/product-detail/${listing._id}`}
                            className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            Details
                            <svg
                              className="flex-shrink-0 size-4"
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
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                      <div className="relative mx-4">
                        <img
                          className="sm:h-[450px] sm:w-4/5 h-[230px] w-auto object-cover rounded-md mr-0 mt-3"
                          src={listing.photos[0]}
                          alt="Image Description"
                        />
                        <div className="absolute inset-0 -z-[1] bg-gradient-to-tr from-gray-200 via-white/0 to-white/0 size-full rounded-md mt-4 -mb-4 me-4 -ms-4 lg:mt-6 lg:-mb-6 lg:me-6 lg:-ms-6" />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )
      )}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        <div>
          {Array.from(data.entries()).map(([key, value]) => (
            <div key={key} className="my-8">
              <div>
                <h2 className="text-2xl font-semibold text-slate-600">{key}</h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?offer=true"}
                >
                  Show more offers
                </Link>
                <div className="flex flex-wrap gap-4">
                  {value.map((listing) => (
                    <ListingGrid
                      listing={listing}
                      key={listing._id.toString()}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
