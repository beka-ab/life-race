import "./header.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="btn-container">
        <button className="shadowed-btn"> Garage</button>
      </div>
      <div>
        <button className="shadowed-btn"> Winners </button>
      </div>
    </div>
  );
};

export default Header;
