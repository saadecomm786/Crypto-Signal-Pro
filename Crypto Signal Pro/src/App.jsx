import { useEffect, useState } from "react";

function App() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch("https://api.binance.com/api/v3/ticker/price");
        const data = await res.json();

        // Only show top few coins
        const filtered = data.filter((coin) =>
          ["BTCUSDT", "ETHUSDT", "BNBUSDT", "XRPUSDT", "SOLUSDT"].includes(
            coin.symbol
          )
        );
        setPrices(filtered);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", marginTop: "40px" }}>
      <h1>📈 Crypto Signals Tool</h1>
      <p>Live prices from Binance</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {prices.length > 0 ? (
          prices.map((coin) => (
            <li key={coin.symbol} style={{ margin: "10px 0" }}>
              <strong>{coin.symbol}</strong>: ${parseFloat(coin.price).toFixed(2)}
            </li>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </div>
  );
}

export default App;
