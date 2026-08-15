import React from 'react';
import axios from 'axios';

function App() {
  const [showLogin, setShowLogin] = React.useState(true);
  const [ussername, setUssername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [regsiterStatus, setRegsiterStatus] = React.useState("");
  
  const [tokn, setTokn] = React.useState(localStorage.getItem('my_tokn') || "");
  const [secretInfo, setSecretInfo] = React.useState("");
  const [erorMsg, setErorMsg] = React.useState("");

  const handleRegsiterSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/register', { username: ussername, password })
      .then(res => {
        setRegsiterStatus("Regsiter success! Please loggin now.");
        setUssername("");
        setPassword("");
        setErorMsg("");
      })
      .catch(err => {
        setErorMsg("Regsiter failed!");
      });
  };

  const handleLogginSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/loggin', { username: ussername, password })
      .then(res => {
        const receivedTokn = res.data.token;
        setTokn(receivedTokn);
        localStorage.setItem('my_tokn', receivedTokn);
        setUssername("");
        setPassword("");
        setErorMsg("");
        setRegsiterStatus("");
      })
      .catch(err => {
        setErorMsg("Loggin wrong user or password");
      });
  };

  const fetchProtetedData = () => {
    axios.get('http://localhost:5000/proteted', {
      headers: {
        Authorization: 'Bearer ' + tokn
      }
    })
      .then(res => {
        setSecretInfo(res.data.secretData);
        setErorMsg("");
      })
      .catch(err => {
        setErorMsg("Fechting proteted data failed. Invalid Tokn.");
      });
  };

  const handleLogout = () => {
    setTokn("");
    localStorage.removeItem('my_tokn');
    setSecretInfo("");
    setErorMsg("");
  };

  return (
    <div className="autentication-body">
      <h1>JWT Autentication Portal</h1>

      {erorMsg && <div className="eror-box">{erorMsg}</div>}
      {regsiterStatus && <div className="success-box">{regsiterStatus}</div>}

      {!tokn ? (
        <div className="login-register-container">
          <div className="view-selector">
            <button className="select-btn" onClick={() => setShowLogin(true)}>Loggin View</button>
            <button className="select-btn" onClick={() => setShowLogin(false)}>Regsiter View</button>
          </div>

          {showLogin ? (
            <div className="form-wrapper-box login-box">
              <h2>Loggin here</h2>
              <form onSubmit={handleLogginSubmit}>
                <input 
                  type="text" 
                  placeholder="Ussername" 
                  value={ussername}
                  onChange={(e) => setUssername(e.target.value)}
                  className="input-narrow"
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-wide"
                />
                <button type="submit" className="submit-form-btn">Loggin</button>
              </form>
            </div>
          ) : (
            <div className="form-wrapper-box regsiter-box">
              <h2>Regsiter new usser</h2>
              <form onSubmit={handleRegsiterSubmit}>
                <input 
                  type="text" 
                  placeholder="Ussername" 
                  value={ussername}
                  onChange={(e) => setUssername(e.target.value)}
                  className="input-wide"
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-narrow"
                />
                <button type="submit" className="submit-form-btn">Regsiter</button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <div className="protected-dashboard">
          <h2>Welcome! You have a valid Tokn</h2>
          <button className="dashboard-btn" onClick={fetchProtetedData}>Access Proteted Data</button>
          <button className="dashboard-btn logout" onClick={handleLogout}>Logout</button>

          {secretInfo && (
            <div className="secret-data-display">
              <h3>Proteted Information:</h3>
              <p>{secretInfo}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
