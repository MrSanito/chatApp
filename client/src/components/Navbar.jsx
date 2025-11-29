import { Link } from "react-router-dom";

export default function Navbar() {


  return (
    <div className="  p-4  text-white flex justify-between gap-4 mx-5 ">
      <div>

      <Link to="/">Home</Link>
      </div>
      <div className="flex gap-3" >

      <Link to="/login" >Login</Link>
      <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
