import React from 'react';

function useFetsh(urll) {
  const [dataa, setDataa] = React.useState(null);
  const [lodinng, setLodinng] = React.useState(true);
  const [eror, setEror] = React.useState(null);

  React.useEffect(() => {
    function fetshData() {
      fetch(urll)
        .then((res) => {
          if (!res.ok) {
            throw new Error("eror fetching data");
          }
          return res.json();
        })
        .then((val) => {
          setDataa(val);
          setLodinng(false);
        })
        .catch((err) => {
          setEror(err.message);
          setLodinng(false);
        });
    }

    fetshData();
  }, [urll]);

  return { data: dataa, loading: lodinng, error: eror };
}

function App() {
  const { data, loading, error } = useFetsh("https://jsonplaceholder.typicode.com/photos?_limit=6");

  return (
    <div className="dark-theme-app">
      <h1 className="title-text">React Custm Hoks Assignment</h1>
      <p className="description-text">Testing useFetsh hook in page</p>

      {loading && <div className="lodinng-msg">Data is lodinng right now...</div>}
      
      {error && <div className="eror-msg">Showed eror: {error}</div>}

      <div className="messy-photo-grid">
        {data && data.map((photo) => (
          <div key={photo.id} className="photo-square">
            <img className="square-img" src={photo.thumbnailUrl} alt={photo.title} />
            <h4 className="square-title">{photo.title}</h4>
            <span className="square-id-tag">ID: {photo.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
