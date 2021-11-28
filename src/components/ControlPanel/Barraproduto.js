import React, { useState } from 'react';
import './Barraproduto.css';
import api from '../../services/api';

function Barraproduto(props) {

  const handleExcluir = async (id) => {
    await api.delete(`produtos/${id}`)
      .then(res => {
        console.log(res.data.message)
        alert(res.data.message)
        window.location.reload()
      })
      .catch(e => {
        alert(e.response.data.message)
      })
  }

  return (
    <div className="all-elements">
      <div className="container">
        <div>
          <div className="produto-image"><img src={props.item.imagem} alt="produto" className="produto-image"></img></div>
        </div>
        <div className="produto-texto">
          <div className="produto-nome">
            <div className="title produto-nome">{props.item.nome}</div>
          </div>
          <div className="produto-descricao">
            <div className="title produto-descricao">{props.item.descricao}</div>
          </div>
          <div className="produto-infNutricional">
            <div className="title produto-infNutricional">{props.item.inf_nutricionais_produto}</div>
          </div>
        </div>
      </div>
      <button onClick={() => handleExcluir(props.item.id)} className="produto-excluir">excluir</button>
    </div>
  )
}

export default Barraproduto;
