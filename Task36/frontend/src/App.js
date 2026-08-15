import React from 'react';
import axios from 'axios';

function App() {
  const [ussers, setUssers] = React.useState([]);
  const [potss, setPotss] = React.useState([]);
  
  const [usserName, setUsserName] = React.useState("");
  const [usserEmail, setUsserEmail] = React.useState("");

  const [postTitle, setPostTitle] = React.useState("");
  const [postContent, setPostContent] = React.useState("");
  const [selectedUsser, setSelectedUsser] = React.useState("");

  const [erorMsg, setErorMsg] = React.useState("");

  React.useEffect(() => {
    fechUssers();
    fechPotss();
  }, []);

  const fechUssers = () => {
    axios.get('http://localhost:5000/users')
      .then(res => {
        setUssers(res.data);
        if (res.data.length > 0) {
          setSelectedUsser(res.data[0]._id);
        }
      })
      .catch(err => setErorMsg("Fechting ussers eror"));
  };

  const fechPotss = () => {
    axios.get('http://localhost:5000/posts')
      .then(res => {
        setPotss(res.data);
      })
      .catch(err => setErorMsg("Fechting pots eror"));
  };

  const handleSubmittUsser = (e) => {
    e.preventDefault();
    if (!usserName || !usserEmail) return;
    axios.post('http://localhost:5000/users', { name: usserName, email: usserEmail })
      .then(res => {
        setUssers([...ussers, res.data]);
        setSelectedUsser(res.data._id);
        setUsserName("");
        setUsserEmail("");
      })
      .catch(err => setErorMsg("Eror submitting usser"));
  };

  const handleSubmittPosst = (e) => {
    e.preventDefault();
    if (!postTitle || !postContent || !selectedUsser) return;
    axios.post('http://localhost:5000/posts', {
      title: postTitle,
      content: postContent,
      usserId: selectedUsser
    })
      .then(() => {
        setPostTitle("");
        setPostContent("");
        fechPotss();
      })
      .catch(err => setErorMsg("Eror submitting pots"));
  };

  return (
    <div className="scehma-app-body">
      <h1 className="title-txt">Scehma Refrance MERN App</h1>

      {erorMsg && <div className="eror-banner">{erorMsg}</div>}

      <div className="forms-wrapper">
        <div className="usser-form-box">
          <h2>Create Usser</h2>
          <form onSubmit={handleSubmittUsser}>
            <input 
              type="text" 
              placeholder="Usser Name" 
              value={usserName} 
              onChange={(e) => setUsserName(e.target.value)} 
              className="usser-input" 
            />
            <input 
              type="email" 
              placeholder="Usser Email" 
              value={usserEmail} 
              onChange={(e) => setUsserEmail(e.target.value)} 
              className="usser-email-input" 
            />
            <button type="submit" className="usser-btn">Submit Usser</button>
          </form>
        </div>

        <div className="pots-form-box">
          <h2>Submitt Posst</h2>
          <form onSubmit={handleSubmittPosst}>
            <input 
              type="text" 
              placeholder="Pots Title" 
              value={postTitle} 
              onChange={(e) => setPostTitle(e.target.value)} 
              className="pots-title-input" 
            />
            <textarea 
              placeholder="Pots Content" 
              value={postContent} 
              onChange={(e) => setPostContent(e.target.value)} 
              className="pots-content-area" 
            />
            <select 
              value={selectedUsser} 
              onChange={(e) => setSelectedUsser(e.target.value)} 
              className="usser-select"
            >
              {ussers.map(u => (
                <option key={u._id} value={u._id}>{u.name}</option>
              ))}
            </select>
            <button type="submit" className="pots-btn">Submitt Posst</button>
          </form>
        </div>
      </div>

      <div className="squished-pots-list">
        <h2>List of Pots:</h2>
        {potss.map(p => (
          <div key={p._id} className="squished-pots-item">
            <h4>{p.title}</h4>
            <p>{p.content}</p>
            <span className="pots-author">
              Written by: {p.usser ? p.usser.name : "Unknown Usser"} ({p.usser ? p.usser.email : "No Email"})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
