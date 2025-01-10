import React from "react";
import { Link } from "@inertiajs/react";
import Navbar from "./navbar";
import { Footer } from "./footer";
export default function Layouts({children}) {
    return (
       <>
      
    <Navbar />



      <main>{children}</main>
      <Footer />
       </>
    );
}