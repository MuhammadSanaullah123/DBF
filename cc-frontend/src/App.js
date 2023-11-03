import { useEffect, useSearchParams } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import History from "./Components/History/History";
import Feed from "./Components/Feed/Feed";
import Model from "./Components/Model/Model";
import Profiler from "./Components/Profiler/Profiler";
import ProfilerUser from "./Components/ProfilerUser/ProfilerUser";
import ProductView from "./Components/ProductView/ProductView";
import Login from "./Components/Login/Login";
import Checkout from "./Components/Checkout/Checkout";
import Payment from "./Components/Payment/Payment";
import ProductView2 from "./Components/ProductView2/ProductView2";
import Signup from "./Components/SignUp/Signup";
import PasswordRecover from "./Components/PasswordRecover/PasswordRecover";
import Tos from "./Components/Tos/Tos";
import Camera from "./Components/Camera/Camera";
import Verification from "./Components/Login/verification";
import ForgotPassword from "./Components/Login/forgotPassword";
import ResetPassword from "./Components/Login/ResetPassword";
import Message from "./Components/Message/Message";
import ThankYou from "./Components/ThankYou/ThankYou";
import Inbox from "./Components/Inbox/Inbox";
// JS Cookies
import Cookies from "js-cookie";
// Redux
import store from "./store";
import { GetLoggedInUser } from "./actions/auth";

const App = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const token = queryParameters.get("token");
  if (token) {
    sessionStorage.setItem("token", token);
    store.dispatch(GetLoggedInUser());
  }

  const navigate = useNavigate();

  useEffect(() => {
    store.dispatch(GetLoggedInUser());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<History />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/model" element={<Model />} />
        {/* Profile */}

        <Route path="/profiler" element={<Profiler />} />
        <Route path="/profiler/:id" element={<Profiler />} />
        <Route path="/profileruser" element={<ProfilerUser />} />
        <Route path="/message/:id" element={<Message />} />

        {/* Product */}
        <Route path="/productview" element={<ProductView />} />
        <Route path="/product/:id" element={<ProductView2 />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recoverpassword" element={<PasswordRecover />} />
        <Route path="/tos" element={<Tos />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>

      {/* <Home/> */}
      {/* <History/> */}
      {/* <Feed/> */}
      {/* <Model/> */}
      {/* <Profiler/> */}
      {/* <ProfilerUser/> */}
      {/* <ProductView/> */}
      {/* <ProductView2/> */}
      {/* <Checkout/> */}
      {/* <Payment/> */}
      {/* <Login/> */}
      {/* <Signup/> */}
      {/* <PasswordRecover/> */}
      {/* <Tos/> */}
      {/* <Camera/> */}
    </>
  );
};

export default App;
