import { Link }
  from "react-router-dom";

import "../../styles/navbar.css";

const Navbar = () => {

  return (

    <nav className="navbar">

      <h2>
        BiztelAI
      </h2>

      <div className="nav-links">

        <Link to="/">
          Upload
        </Link>

        <Link to="/history">
          History
        </Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

      </div>

    </nav>

  );

};

export default Navbar;