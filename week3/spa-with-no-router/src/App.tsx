import "./App.css";
import { Link, Route, Routes } from "./router";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page404 from "./pages/Page404";

const Header = () => {
  return (
    <nav style={{ display: "flex", gap: "10px" }}>
      <Link to="/page1">페이지 1</Link>
      <Link to="/page2">페이지 2</Link>
      <Link to="/page3">페이지 3</Link>
      <Link to="/404">404</Link>
    </nav>
  );
};

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/page1" component={Page1} />
        <Route path="/page2" component={Page2} />
        <Route path="/page3" component={Page3} />
        <Route path="/404" component={Page404} />
      </Routes>
    </>
  );
}

export default App;
