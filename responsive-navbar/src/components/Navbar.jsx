import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <h2>Logo</h2>

    <button onClick={() => setIsOpen(!isOpen)}>
  {isOpen ? "X" : "Menu"}
</button>

      <div className={isOpen ? "menu show" : "menu"}>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>

        <button>Create Account</button>
      </div>
    </nav>
  );
}

export default Navbar;