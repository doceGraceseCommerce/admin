import React, { useState, useEffect } from 'react';
import './ControleProduto.css';
import api from '../../services/api';
import CurrencyInput from 'react-currency-input-field';

function ControleProdutos(props) {

  const [preco, setPreco] = useState(props.item.preco);
  // const [id, setId] = useState(props.item.id)
  const [quantidade, setQuantidade] = useState(props.item.quantidade)
  const [produtoAtivo, setProdutoAtivo] = useState(props.item.produtoAtivo)


  // useEffect(() => {
  //   let val = String(preco)
  //   val = val.replace(",", ".")
  //   api.patch(`produtos/${id}/preco`, { preco: Number(val) })
  //     .then(res => {
  //       console.log(res.data.message)
  //       // alert(res.data.message)
  //     })
  //     .catch(e => {
  //       alert("Algo deu errado")
  //     })
  // }, [preco])

  // const setQuantidade = async (quantidade) => {
  //   console.log(typeof (quantidade))
  //   quantidade = Number(quantidade.replace(/\D/g, ""))
  //   console.log(typeof (quantidade))
  //   await api.patch(`produtos/${id}/quantidade`, { quantidade: quantidade })
  //     .then(res => {
  //       console.log(res.data.message)
  //       // alert(res.data.message)
  //     })
  //     .catch(e => {
  //       alert("Algo deu errado")
  //     })
  // }

  // const setStatus = async (status) => {
  //   console.log(status)
  //   await api.patch(`produtos/${id}/status`, { produtoAtivo: status })
  //     .then(res => {
  //       console.log(res.data.message)
  //       // alert(res.data.message)
  //     })
  //     .catch(e => {
  //       alert(e.response.data.message)
  //     })
  // }

  useEffect(() => {

    let updatedList = props.produtos.map(item => {
      if (item.id === props.item.id) {
        item.produtoAtivo = produtoAtivo
        return item;
      }
      return item;
    });

    props.setProdutos(updatedList);


  }, [produtoAtivo])


  useEffect(() => {

    let updatedList = props.produtos.map(item => {
      if (item.id === props.item.id) {
        // item.quantidade = Number(quantidade.replace(/\D/g, ""))
        item.quantidade = quantidade
        return item;
      }
      return item;
    });

    props.setProdutos(updatedList);


  }, [quantidade])


  useEffect(() => {

    let updatedList = props.produtos.map(item => {
      if (item.id === props.item.id) {
        let val = String(preco)
        val = val.replace(",", ".")
        item.preco = Number(val)
        return item;
      }
      return item;
    });

    props.setProdutos(updatedList);


  }, [preco])

  return (
    <div key={props.item.id}>
      <div className="controle">
        <input type="checkbox" id="horns" name="horns" checked={props.item.produtoAtivo} onChange={(e) => setProdutoAtivo(e.target.checked)} />
        <div className="item-name caixa">
          <div className="controle-title">{props.item.nome}</div>
        </div>
        <div className="valor">
          <div className="caixa-valor caixa">Valor da Unidade</div>
          <label className="caixa-preco caixa">
            <CurrencyInput
              decimalSeparator=','
              groupSeparator='.'
              fixedDecimalLength={2}
              id="prim"
              name="input-name"
              prefix="R$ "
              value={preco}
              // defaultValue={preco}
              decimalsLimit={2}
              onValueChange={(value) => setPreco(value)}
            />
          </label>
        </div>
        <div className="quantidade">
          <div className="caixa-qtd caixa">Quantidade</div>
          <label className="caixa-input caixa">
            <input type="number" min="0" step="any" id="seg"
              value={quantidade}
              onChange={e => setQuantidade(e.target.value)}
            />
          </label>
        </div>
      </div>
    </div>
  )
}

export default ControleProdutos
