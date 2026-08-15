import React from 'react'

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleMnu = () => {
    setIsOpen(!isOpen)
  }

  const clsoeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav class="navbar">
      <div class="navbar-logo">
         ProjectLogo
      </div>

      <div class="menu-toggle-btn" onClick={toggleMnu}>
        Menu
      </div>

      <div class={`navbar-menu-wrapper ${isOpen ? 'menu-open' : ''}`}>
        <div class="menu-close-btn" onClick={clsoeMenu}>
          X
        </div>
        
        <ul class="navbar-links">
          <li><a href="#" onClick={clsoeMenu}>Home</a></li>
          <li><a href="#" onClick={clsoeMenu}>About</a></li>
          <li><a href="#" onClick={clsoeMenu}>Servises</a></li>
          <li><a href="#" onClick={clsoeMenu}>Contat</a></li>
        </ul>

        <div class="navbar-cta">
          <button class="cta-btn" onClick={clsoeMenu}>Creat Account</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
