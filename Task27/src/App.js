import React from 'react';

function App() {
  const shooesList = [
    { id: 1, name: "Runing Shooe", price: 50, img: "https://via.placeholder.com/100?text=Runing" },
    { id: 2, name: "Casual Sneakr", price: 70, img: "https://via.placeholder.com/100?text=Casual" },
    { id: 3, name: "Sport Boot", price: 110, img: "https://via.placeholder.com/100?text=Boot" }
  ];

  const [cratItem, setCrat] = React.useState([]);
  const [totlCst, setTotl] = React.useState(0);
  const [totalQuanity, setQuanity] = React.useState(0);

  const addShooe = (shooe) => {
    let found = false;
    let newCrat = cratItem.map((item) => {
      if (item.id === shooe.id) {
        found = true;
        return { ...item, quan: item.quan + 1 };
      }
      return item;
    });
    if (!found) {
      newCrat = [...cratItem, { ...shooe, quan: 1 }];
    }
    setCrat(newCrat);
    setTotl(totlCst + shooe.price);
    setQuanity(totalQuanity + 1);
  };

  const remveShooe = (itemId) => {
    let price = 0;
    let newCrat = cratItem.map((item) => {
      if (item.id === itemId) {
        price = item.price;
        return { ...item, quan: item.quan - 1 };
      }
      return item;
    }).filter((item) => item.quan > 0);

    setCrat(newCrat);
    setTotl(totlCst - price);
    setQuanity(totalQuanity - 1);
  };

  return (
    <div className="store-body">
      <h1 className="store-title">Welcome to Shooes Store</h1>
      
      <div className="layout-containr">
        <div class="left-side">
          <h2>Available Shooes</h2>
          <div className="shoes-grid">
            {shooesList.map((shooe) => (
              <div key={shooe.id} className="shooe-card">
                <img src={shooe.img} alt={shooe.name} />
                <h3>{shooe.name}</h3>
                <p>Price: ${shooe.price}</p>
                <button className="add-btn" onClick={() => addShooe(shooe)}>Add to Crat</button>
              </div>
            ))}
          </div>
        </div>

        <div class="right-side">
          <h2>Shopping Crat</h2>
          {cratItem.length === 0 ? (
            <p>Your crat is empty.</p>
          ) : (
            <div>
              <ul className="cart-list">
                {cratItem.map((item) => (
                  <li key={item.id} className="cart-item">
                    <span>{item.name} - ${item.price} x {item.quan}</span>
                    <button className="remve-btn" onClick={() => remveShooe(item.id)}>Remve</button>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <p>Total Items: {totalQuanity}</p>
                <p>Totl Cst: ${totlCst}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
