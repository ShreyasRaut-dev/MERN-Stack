import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function HomPage() {
  return (
    <div className="page-box">
      <h2>Welcome to Hom Page</h2>
      <p>This is the hom view of our react routing app.</p>
    </div>
  );
}

function DashbordPage() {
  return (
    <div className="dashbord-layout">
      <div className="dash-sidebar">
        <h3>Menu Links</h3>
        <a href="#seting">Setings</a>
        <a href="#profile">Profile</a>
        <a href="#notify">Alerts</a>
      </div>
      <div className="dash-content">
        <h2>Dashbord overview details</h2>
        <p>Statistics and chart details go here.</p>
        <img className="dash-preview-img" src="https://via.placeholder.com/200x100?text=Preview" alt="Preview info" />
        <div className="overlapping-warning">Warning: Overlapping text content is broken.</div>
      </div>
    </div>
  );
}

function LoginnPage() {
  return (
    <div className="page-box">
      <h2>Loginn to Account</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Username" />
        <br />
        <input type="password" placeholder="Password" />
        <br />
        <button type="submit">Loginn Now</button>
      </form>
    </div>
  );
}

function SingupPage() {
  return (
    <div className="page-box">
      <h2>Singup New User</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Full Name" />
        <br />
        <input type="email" placeholder="Email" />
        <br />
        <button type="submit">Singup Now</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <nav className="messy-navbar">
          <Link to="/" className="nav-item">Hom</Link>
          <Link to="/dashbord" className="nav-item">Dashbord</Link>
          <Link to="/loginn" className="nav-item">Loginn</Link>
          <Link to="/singup" className="nav-item">Singup</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomPage />} />
          <Route path="/dashbord" element={<DashbordPage />} />
          <Route path="/loginn" element={<LoginnPage />} />
          <Route path="/singup" element={<SingupPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
