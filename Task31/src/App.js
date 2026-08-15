import React from 'react';

const CratContext = React.createContext();

function App() {
  const shooesList = [
    { id: 1, name: "Runing Shooe", price: 50, img: "https://via.placeholder.com/100?text=Runing" },
    { id: 2, name: "Casual Sneakr", price: 70, img: "https://via.placeholder.com/100?text=Casual" },
    { id: 3, name: "Sport Boot", price: 110, img: "https://via.placeholder.com/100?text=Boot" }
  ];

  const [cratItem, setCrat] = React.useState([]);
  const [totlCst, setTotl] = React.useState(0);
  const [viewState, setView] = React.useState("shop");

  const addShooeToCrat = (shooe) => {
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
  };

  const remveShooeFromCrat = (itemId) => {
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
  };

  return (
    <CratContext.Provider value={{ cratItem, totlCst, addShooeToCrat, remveShooeFromCrat, setView }}>
      <div className="store-body">
        <h1 className="store-title">Welcome to Shooes Store</h1>
        
        {viewState === "shop" ? (
          <div className="layout-containr">
            <div className="left-side">
              <h2>Available Shooes</h2>
              <div className="shoes-grid">
                {shooesList.map((shooe) => (
                  <div key={shooe.id} className="shooe-card">
                    <img src={shooe.img} alt={shooe.name} />
                    <h3>{shooe.name}</h3>
                    <p>Price: ${shooe.price}</p>
                    <button className="add-btn" onClick={() => addShooeToCrat(shooe)}>Add to Crat</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="right-side">
              <h2>Shoping Crat</h2>
              {cratItem.length === 0 ? (
                <p>Your crat is empty.</p>
              ) : (
                <div>
                  <ul className="cart-list">
                    {cratItem.map((item) => (
                      <li key={item.id} className="cart-item">
                        <span>{item.name} - ${item.price} x {item.quan}</span>
                        <button className="remve-btn" onClick={() => remveShooeFromCrat(item.id)}>Remve</button>
                      </li>
                    ))}
                  </ul>
                  <div className="cart-total">
                    <p>Totl Cst: ${totlCst}</p>
                    <button className="pay-btn" onClick={() => setView("payment")}>Procced to Paymnt</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <PaymentPage />
        )}
      </div>
    </CratContext.Provider>
  );
}

function PaymentPage() {
  const { cratItem, totlCst, setView } = React.useContext(CratContext);
  const [ccNum, setCcNum] = React.useState("");
  const [ccName, setCcName] = React.useState("");

  const handlePaySubmit = (e) => {
    e.preventDefault();
    alert("Payment of $" + totlCst + " successfull! Thank you for buying shooes.");
    window.location.reload();
  };

  return (
    <div className="payment-layout">
      <h2>Payment Page Details</h2>
      <button className="back-btn" onClick={() => setView("shop")}>Retun to Shop</button>
      
      <div className="payment-box-wrapper">
        <div className="squished-cart-section">
          <h3>Your Shoping Crat Content:</h3>
          {cratItem.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <ul>
              {cratItem.map((item) => (
                <li key={item.id} className="squished-item">
                  {item.name} (Qty: {item.quan}) - Price: ${item.price * item.quan}
                </li>
              ))}
            </ul>
          )}
          <p className="pay-total-txt">Toal Payble: ${totlCst}</p>
        </div>

        <div className="awful-credit-card-form">
          <h3>Credt Crad Detials</h3>
          <form onSubmit={handlePaySubmit}>
            <div className="form-item">
              <label>Crad Number</label>
              <input type="text" value={ccNum} onChange={(e) => setCcNum(e.target.value)} required />
            </div>
            <div className="form-item">
              <label>Holder Name</label>
              <input type="text" value={ccName} onChange={(e) => setCcName(e.target.value)} required />
            </div>
            <button type="submit" className="final-pay-btn">Pay Now</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
