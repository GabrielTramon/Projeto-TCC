import logo from "./img/logo.png";
import "./App.css";
import Carrinho ""

function App() {
  return (
    <div className="Home">
      <div className="Cabeçalho">
        <div className="Logo">
          <img src={logo} alt="logo" title="Seja bem-vindo" width={100} />
        </div>
        <div className="menu">
          <a href="">HOME</a>
          <a href="">CACHORRO</a>
          <a href="">GATO</a>
          <a href="">OUTROS</a>
        </div>
        <div className="Carrinho">
          <img src={Carrinho} alt="logo" title="Carrinho" width={100} />
        </div>
      </div>
      <div className="page"></div>
      <div className="banner"></div>
    </div>
  );
}

export default App;
