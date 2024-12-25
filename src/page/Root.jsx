import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import { Toaster } from "react-hot-toast";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <NavBar />
      </div>
      <div id="detail">
        <Outlet />
      </div>
      <Toaster />
    </>
  );
}
