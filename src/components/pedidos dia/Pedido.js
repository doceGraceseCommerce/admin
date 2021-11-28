import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import ProdutoPedido from './ProdutoPedido';
import './Pedido.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Pedido(props) {

  const [statusPedido, setStatusPedido] = useState(props.item.statusPedido)
  const [dataEnvio, setDataEnvio] = useState(props.item.dataEnvio)
  const [showPedido, setShowPedido] = useState(false)
  const [alterando, setAlterando] = useState(false)



  const alterarPedido = async (id) => {
    console.log(id)
    api.patch(`pedidos/${id}/status`, { statusPedido: statusPedido })
      .then(res => {
        console.log(res.data.message)
        toast.dark(res.data.message)
        setAlterando(false)
        setShowPedido(true)
      })
      .catch(e => {
        toast.dark(e.response.data.message)
      })
  }

  return (
    <>
      <div className='pedido-dados-cliente'>
        {!alterando &&
          <>
            <div className='compra'>NÚMERO PEDIDO : {props.item.pedidoNum}</div>
            <div className='compra'>CLIENTE : {props.item.usuario.nome}</div>
            <button className="atualizar-status" onClick={() => setShowPedido(!showPedido)}>expandir</button>
          </>
        }
        {alterando &&
          <>
            <div className='compra'>Salvando status...</div>
          </>
        }
      </div>
      <div className="centralizado">
        {showPedido &&
          <div className='pedido-container'>

            <div className='pedido-linha-pri'>
              <div className='pedido-id'>ID : {props.item.id}</div>
              <div className='pedido-num'>N° : {props.item.pedidoNum}</div>
              <div className='pedido-nome'>NOME : {props.item.usuario.nome}</div>
            </div>
            <div className='pedido-linha-seg'>
              <div className='pedido-email'>EMAIL : {props.item.usuario.email}</div>
              <div className='pedido-telefone'>TELEFONE : {props.item.usuario.telefone}</div>
            </div>
            <div className="data-status-botao">
              <div>
                <div>{props.item.dataPedido}</div>
                <div className="pedido-valor-status">
                  <div>R$ {props.item.valorTotal || "nulo"}</div>
                  <div>{props.item.statusPagamento || "nulo"}</div>
                </div>
              </div>
              <div>
                <label for="status">STATUS DO PEDIDO :</label>
                <select name="status" id="status" value={statusPedido} onChange={e => setStatusPedido(e.target.value)}>
                  <option value="Aguardando Pagamento">Aguardando Pagamento</option>
                  <option value="Pagamento Aprovado">Pagamento Aprovado</option>
                  <option value="Separando Pedido">Separando Pedido</option>
                  <option value="Pedido Enviado">Pedido Enviado</option>
                  <option value="Pedido Entregue">Pedido Entregue</option>
                  <option value="Pedido Cancelado">Pedido Cancelado</option>
                </select>
              </div>
              <div>
                <button className="atualizar-status" onClick={() => { setAlterando(true); setShowPedido(false); alterarPedido(props.item.id) }}>ATUALIZAR STATUS</button>
              </div>
            </div>
            <div className="pedidos">
              {props.item.itens.length &&
                props.item.itens.map(produto =>
                  <ProdutoPedido produto={produto} />
                )}
              {/* <div>
            <div>{props.item.dataEnvio || "Ainda não foi enviado"}</div>
            <div>{props.item.dataEntrega || "Ainda não foi entregue"}</div>
          </div> */}
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default Pedido
