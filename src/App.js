import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavBar } from './components/NavBar'
import TableCoins from "./components/TableCoins";
import { Footer } from "./components/Footer";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const vs_currency = "usd";

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" + vs_currency + "&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      setCoins(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <NavBar />
      
      <Container>
        <Row className="aligh-items-center">
          <section className="banner" id="home">
            <input
              type="text"
              placeholder="Search a Coin"
              className="form-control bg-dark text-light border-0 mt-4 text-center"
              autoFocus
              onChange={(e) => setSearch(e.target.value)}
            />

            <TableCoins coins={coins} search={search} />
          </section>
        </Row>
      </Container>
      
      <Footer/>
    </div>
  );
}

export default App;