import { useState } from "react";

import "./App.css";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Home from "./Pages/Home";
import Services from "./Pages/Services";
import Booking from "./Pages/Booking";
import Payment from "./Pages/Payment";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar></Navbar>

      <Home></Home>
      <Services></Services>
      <Booking></Booking>

      <Payment></Payment>
      <Footer></Footer>
    </>
  );
}

export default App;
