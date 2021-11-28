import React, { useEffect, useState } from 'react';
import ControleProdutos from '../components/ControlPanel/ControleProdutos';
import api from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/ControlPanel/ControleProduto.css'

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

  useEffect(() => {
    console.log(produtos)
  }, [produtos])

  const fecharLoja = async () => {
    try {
      produtos.map(async (item) => {

        await api.patch(`produtos/${item.id}/status`, { produtoAtivo: false })

      })
      window.location.reload()
    } catch (e) {
      toast.dark(e.response.data.message)
    }
  }

  const abrirLoja = async () => {
    produtos.map(async (item) => {
      await api.put(`produtos/${item.id}`, item)
        .then(res => {
          console.log(res.data.message)
          toast.dark(res.data.message)
        })
        .catch(e => {
          toast.dark(e.response.data.message)
        })
    })
  }

  return (
    <div>
      {produtos.map(item =>
        // item.produtoEncerrado !== true &&
        <ControleProdutos key={item.id} item={item} listaAtivos={listaAtivos} setListaAtivos={setListaAtivos} produtos={produtos} setProdutos={setProdutos} />
      )}
      <div className="controle-botao-centro">
        <button className="botao-pronta-entrega" onClick={abrirLoja}>ALTERAR PRODUTOS</button>
        <button className="botao-pronta-entrega" onClick={fecharLoja}>FECHAR LOJA</button>
        <ToastContainer />
      </div>      
    </div>
  )
}

export default Controle
