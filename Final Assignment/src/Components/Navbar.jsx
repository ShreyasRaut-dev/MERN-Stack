import { useState } from "react";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="navbar">

      <h3>Logo</h3>

      <div className={showMenu ? "links show" : "links"}>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </div>

      <button className="account">Create Account</button>

      <button
        className="menu"
        onClick={() => setShowMenu(!showMenu)}
      >
        ☰
      </button>

    </nav>
  );
}

export default Navbar;