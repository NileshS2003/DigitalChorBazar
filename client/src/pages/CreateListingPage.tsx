import { useSelector } from "react-redux";
import CreateListing from "../features/lisitng/components/CreateListing.tsx";
import { selectLoggedInUser } from "../features/Auth/authSlice.ts";
import Profile from "../features/user/profile.tsx";
import SignInPage from "./SignInPage.tsx";

function CreateListingPage() {
  const loggedInUser = useSelector(selectLoggedInUser);
  const college = loggedInUser?.college;
  return loggedInUser ?
  college === undefined ? (
    <div>
      <div className="mx-auto text-center text-red-500 my-4">Complete Your profile Details First</div>
      <Profile />
    </div>
  ) : (
    <CreateListing />
  ):<SignInPage/>
}

export default CreateListingPage;
