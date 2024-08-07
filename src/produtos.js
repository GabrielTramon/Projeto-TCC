import logo from "./img/logo.png";
import carrinho from "./img/carrinho.png"
import "./App.css";


function App() {
  return (
    <div className="Home">
      <div className="Cabeçalho">
        <div className="Logo">
          <img src={logo} alt="logo" title="Seja bem-vindo" width={100} />
        </div>
        <div className="menu">
          <nav>
            <a href="">HOME</a>
            <a href="">PRODUTOS</a>
            <a href="">BANHO E TOSA</a>
            <a href="">OUTRO</a>
          </nav>
        </div>
        <div className="Carrinho">
          <a href=""><img src={carrinho} alt="logo" title="Carrinho" width={40} /></a>
        </div>
      </div>
      <div className="page"></div>
      <div className="banner"></div>
    </div>
  );
}

export default App;
