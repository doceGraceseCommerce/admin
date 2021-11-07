import React, { useEffect, useState } from 'react';
import ControleProdutos from '../components/ControlPanel/ControleProdutos';
import api from '../services/api';

function Controle() {


  const [listaAtivos, setListaAtivos] = useState([]);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    api("produtos")
      .then(res => {
        console.log(res.data)
        setProdutos(res.data)
      })
  }, [])

  const fecharLoja = () => {
    produtos.map(item => {
      api.patch(`produtos/${item.id}/status`, { produtoAtivo: false })
        .then(res => {
          console.log(res.data.message)
          // alert(res.data.message)
        })
        .catch(e => {
          alert(e.response.data.message)
        })
    })
    window.location.reload()
  }

  return (
    <div>
      {produtos.map(item =>
        item.produtoEncerrado !== true &&
        <ControleProdutos item={item} listaAtivos={listaAtivos} setListaAtivos={setListaAtivos} />
      )}
      {/* <button className="botao-pronta-entrega">ABRIR LOJA</button> */}
      <button className="botao-pronta-entrega" onClick={fecharLoja}>FECHAR LOJA</button>
    </div>
  )
}

export default Controle
