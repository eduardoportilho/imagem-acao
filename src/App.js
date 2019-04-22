import React, { Component } from 'react';
import './App.css';

const categorias = [
  {id: 'P', descricao: 'Pessoa, Lugar ou Animal'},
  {id: 'O', descricao: 'Objeto'},
  {id: 'A', descricao: 'Ação'},
  {id: 'D', descricao: 'Dificil'},
  {id: 'L', descricao: 'Lazer'},
  {id: 'T', descricao: 'Todos Jogam'}
]

function createTabuleiro() {
  let tabuleiro = []
  for (let i = 0; i < 10; i++) {
    tabuleiro = tabuleiro.concat(categorias)
  }
  tabuleiro = tabuleiro.map((el, index) => ({...el, index}))
  return tabuleiro
}

class App extends Component {
  state = {
    resultadoDado: '',
    jogadores: [
      {name: 'arcoiro', index: -1},
      {name: 'abacalino', index: -1},
      {name: 'etezudo', index: -1},
      {name: 'fernanda', index: -1}
    ]
  }

  jogaDado = () => {
    const resultadoDado = 1 + Math.round(Math.random() * 5)
    this.setState({resultadoDado})
  }

  onJogadorClick = (jogador) => {
    if (this.state.resultadoDado > 0) {
      jogador.index += this.state.resultadoDado
      this.forceUpdate()
    }
  }

  render() {
    const tabuleiro = createTabuleiro()
    const { resultadoDado, jogadores } = this.state
    return (
      <div className="jogo">
        <div className="controles">
          <button className="dice-btn" onClick={this.jogaDado}></button>
          <div className="resultadoDado">{resultadoDado}</div>
        </div>
        <div className="tabuleiro">
          <div className="casa-tabuleiro">
            { jogadores.filter(j => j.index === -1).map(jogador =>(
              <Jogador key={jogador.name} jogador={jogador} onClick={() => this.onJogadorClick(jogador)} />
            ))}
            <span className="label-casa">🏁</span>
          </div>
          { tabuleiro.map((peca, i) => (
            <div key={i} className={`casa-tabuleiro casa-${peca.id}`}>
              { jogadores.filter(j => j.index === i).map(jogador =>(
                <Jogador key={jogador.name} jogador={jogador} onClick={() => this.onJogadorClick(jogador)} />
              ))}
              <span className="label-casa">{peca.id}</span>
            </div>
          )) }
        </div>
      </div>
    );
  }
}

function Jogador({jogador, onClick}) {
  return (
    <div className={`pino pino-${jogador.name}`} onClick={onClick}></div>
  )
}

export default App;
