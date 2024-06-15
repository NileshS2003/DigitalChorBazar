import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import SignInPage from "./pages/SignInPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import CreateListingPage from "./pages/CreateListingPage.tsx";
import { useAppDispatch } from "./app/store.ts";
import { useEffect } from "react";
import { fetchUserAsync } from "./features/Auth/authSlice.ts";
import Listings from "./features/lisitng/components/Listings.tsx";
import Profile from "./pages/Profile.tsx";
// import PrivateRoute from "./components/PrivateRoute.tsx";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserAsync());
  }, [dispatch]);
  return (
    <BrowserRouter>
      {<Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/about" element={<About />} />
        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/listing" element={<Listings/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/create-listing" element={<CreateListingPage />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
