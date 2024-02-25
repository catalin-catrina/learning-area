import logo from "../assets/logo.png";
import "../App.css";

const Navbar = () => {
  return (
    <div className="nav__container">
      <div className="nav__container__inner">
        <div className="nav__flex-container">
          <div className="item logo-item">
            <div className="logo-container">
              <img src={logo} alt="logo" />
            </div>
            <h2 className="logo-text">ReactFacts</h2>
          </div>
          <div className="item">
            <p>React Course - Project 1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
