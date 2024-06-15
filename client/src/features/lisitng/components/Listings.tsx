import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { RootState, useAppDispatch } from "../../../app/store";
import { IUser } from "../../../interfaces/user.interface";
import { IListing } from "../../../interfaces/listing.interface";
import { deleteUserListingAsync, getUserListingAsync } from "../listingSlice";

function Listings() {
  const { loggedInUser } = useSelector((state: RootState) => state.auth);
  const [data, setData] = useState<IListing[] | null>(null);
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res=await dispatch(getUserListingAsync((loggedInUser as IUser)._id));
        setData(res.payload as IListing[])
      } catch (error) {
        // if (loggedInUser === null) return navigate("/");
        console.log(error);
      }
    }
    console.log(loggedInUser)
    fetchData()
  }, [loggedInUser,dispatch]); // Empty dependency array means this effect runs only once when the component mounts

  const handleDelete = async (index: number) => {
    const listings = data as IListing[];
    const res= await dispatch(deleteUserListingAsync(listings[index]._id))

    if(res.type=="listing/delete/fulfilled" && typeof data!==null)
      setData((prev)=>(prev as IListing[]).filter((_,i)=>index!=i))
    console.log(res)
  };

  return (
    <>
      {data &&
        data.map((list, index) => {
          return (
            <div
              key={list._id}
              className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] flex-row my-4 items-center mx-auto "
            >
              <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0 ">
                <Link to={`/listing/${list._id}`}>
                  <img
                    src={list.photos[0]}
                    alt="card-image"
                    className=" w-full max-w-[25rem] my-2 h-full max-h-[20rem] object-contain"
                  />
                </Link>
              </div>
              <div className="p-6">
                <div className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {list.title}
                </div>
                <div className="block mb-4 font-sans text-base antialiased leading-relaxed tracking-normal text-gray-700 ">
                  Discription : {list.description}
                </div>
                <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                  {loggedInUser?.college}
                </p>
                <div className="block mb-8 font-sans text-base antialiased leading-relaxed text-gray-700 font-semibold">
                  <p>Price : ${list.price}</p>
                </div>
                <Link to={`/listing/${list._id}`} className="inline-block">
                  <button
                    className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                    type="button"
                  >
                    Learn More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </button>
                </Link>
                {/* </Link> */}
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-6"
                  onClick={() => handleDelete(index)}
                >
                  DELETE
                </button>
                <Link to={`/edit-listing/${list._id}`}>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-6">
                    EDIT
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default Listings;
