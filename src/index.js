import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Quadrado(props) { 
  {
    return (
      <button className="quadrado" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
}

class Tabuleiro extends React.Component {
  constructor(props){
    super(props);
    this.state = {
       quadrados: Array(9).fill(null),
       proximoEhX: true,
    };
  }

  handleClick(i){
    const quadrados = this.state.quadrados.slice();
    if(verificarVencedor(quadrados) || quadrados[i]){
      return;
    }

    quadrados[i] = this.state.proximoEhX ? "X" : "O";
    this.setState({
      quadrados :quadrados,
      proximoEhX: !this.state.proximoEhX
    })
  }

  renderizarQuadrado(i) {
    return (
        <Quadrado
            value={this.state.quadrados[i]}
            onClick={()=> this.handleClick(i)}
        />
      );
  }

  render() {
    const vencedor = verificarVencedor(this.state.quadrados);
    let  status;
    if(vencedor){
      status = 'Vencedor: ' + vencedor;
    }else if(verificaVelha(this.state.quadrados)){
      status = "Empate!"
    }
    else{
      status = 'Próximo jogador: ' + (this.state.proximoEhX ? "X" : "O");
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="linha-tabuleiro">
          {this.renderizarQuadrado(0)}
          {this.renderizarQuadrado(1)}
          {this.renderizarQuadrado(2)}
        </div>
        <div className="linha-tabuleiro">
          {this.renderizarQuadrado(3)}
          {this.renderizarQuadrado(4)}
          {this.renderizarQuadrado(5)}
        </div>
        <div className="linha-tabuleiro">
          {this.renderizarQuadrado(6)}
          {this.renderizarQuadrado(7)}
          {this.renderizarQuadrado(8)}
        </div>
      </div>
    );
  }
}

class Jogo extends React.Component {
  render() {
    return (
      <div className="jogo">
        <div className="jogo-tabuleiro">
          <Tabuleiro />
        </div>
        <div className="jogo-informacao">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Jogo />);

function verificarVencedor(quadrados){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for(let i = 0; i< lines.length; i++){
      const [a,b,c] = lines[i]; 
      if(quadrados[a] && quadrados[a] ===  quadrados[b] && quadrados[a] === quadrados[c]){
        return quadrados[a];
      }
  }

  return null;
}

function verificaVelha(quadrados){
  for(let i = 0; i< quadrados.length; i++){
      if(quadrados[i] == null){
        return false;
      }
  }

  return true;
}