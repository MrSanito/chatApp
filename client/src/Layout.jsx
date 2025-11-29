    import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

    export default function Layout() {
      return (
        <div>
          <Navbar />
          <div className="mt-10">
            <Outlet /> {/* This renders the page content */}
          </div>
        </div>
      );
    }
