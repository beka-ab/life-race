import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="btn-container">
        <Link to="/">
          <button className="shadowed-btn"> Garage</button>
        </Link>
      </div>
      <div>
        <Link to="/winner">
          <button className="shadowed-btn"> Winners </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
