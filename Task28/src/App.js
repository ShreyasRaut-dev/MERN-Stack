import React from 'react';

function Crd(props) {
  return (
    <div className="gradint-boder-box">
      <div className="inner-crad-content">
        <img className="crad-img" src={props.image} alt={props.title} />
        <h3 className="crad-title-text">{props.title}</h3>
        <p className="crad-desc-text">{props.desc}</p>
      </div>
    </div>
  );
}

function App() {
  const cradsData = [
    { id: 1, title: "Crad 1", desc: "This is some infomation about card one.", image: "https://via.placeholder.com/80?text=One" },
    { id: 2, title: "Crad 2", desc: "This is some infomation about card two.", image: "https://via.placeholder.com/80?text=Two" },
    { id: 3, title: "Crad 3", desc: "This is some infomation about card three.", image: "https://via.placeholder.com/80?text=Three" },
    { id: 4, title: "Crad 4", desc: "This is some infomation about card four.", image: "https://via.placeholder.com/80?text=Four" }
  ];

  return (
    <div className="app-dark-bg">
      <h1 className="main-title">React JS Props Assignment</h1>
      <p className="subtitle">Show casing crads with Gradint Boder</p>
      
      <div className="crads-grid-container">
        {cradsData.map((crad) => (
          <Crd 
            key={crad.id} 
            title={crad.title} 
            desc={crad.desc} 
            image={crad.image} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;
