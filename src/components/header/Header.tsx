import "./header.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="btn-container">
        <button className="header-btn"> Garage</button>
      </div>
      <div>
        <button className="header-btn"> Winners </button>
      </div>
    </div>
  );
};

export default Header;
