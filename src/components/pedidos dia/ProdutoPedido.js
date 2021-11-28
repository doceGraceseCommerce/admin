import React from 'react'

function ProdutoPedido(props) {

  return (
    <div className="produto-pedido">
      <div className="produto-pedido-quantidade">{props.produto.quantidade} uni</div>
      <div className="produto-pedido-nome">{props.produto.nome}</div>      
      {/* <div>{props.produto.preco * props.produto.quantidade}</div> */}
    </div>
  )
}

export default ProdutoPedido
