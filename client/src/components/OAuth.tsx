import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/store";
import { SignInWithGoogleAsync } from "../features/Auth/authSlice";
// import { createUs } from "../redux/user/User.js";

function OAuth() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handleGoogleClick() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result.user);

      const { email, displayName, photoURL } = result.user;

      dispatch(
        SignInWithGoogleAsync({
          email: email as string,
          username: displayName as string,
          pfp : photoURL as string
        })
      );
      navigate("/");
    } catch (error) {
      console.log("cannot sign in with google", error);
    }
  }

  return (
    <div>
      <div className="">
        <button
          type="button"
          onClick={handleGoogleClick}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-[18px] w-[18px] "
          />
          Continue with Google
        </button>
        <button
          type="button"
          className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <img
            src="https://www.svgrepo.com/show/512317/github-142.svg"
            alt="GitHub"
            className="h-[18px] w-[18px] "
          />
          Continue with GitHub
        </button>
      </div>
    </div>
  );
}

export default OAuth;
