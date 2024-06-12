import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import SignInPage from "./pages/SignInPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import CreateListingPage from "./pages/CreateListingPage.tsx";

function App() {
  const user=true
  return (
    <BrowserRouter>
      {user && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/create-listing" element={<CreateListingPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
