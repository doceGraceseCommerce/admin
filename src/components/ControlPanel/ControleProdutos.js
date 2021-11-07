import React, { useState, useEffect } from 'react';
import './ControleProduto.css';
import api from '../../services/api';
import CurrencyInput from 'react-currency-input-field';

function ControleProdutos(props) {

  const [preco, setPreco] = useState(props.item.preco);
  const [id, setId] = useState(props.item.id)

  useEffect(() => {
    let val = String(preco)
    val = val.replace(",", ".")
    api.patch(`produtos/${id}/preco`, { preco: Number(val) })
      .then(res => {
        console.log(res.data.message)
        // alert(res.data.message)
      })
      .catch(e => {
        alert("Algo deu errado")
      })
  }, [preco])


  const setQuantidade = async (quantidade) => {
    console.log(typeof (quantidade))
    quantidade = Number(quantidade.replace(/\D/g, ""))
    console.log(typeof (quantidade))
    await api.patch(`produtos/${id}/quantidade`, { quantidade: quantidade })
      .then(res => {
        console.log(res.data.message)
        // alert(res.data.message)
      })
      .catch(e => {
        alert("Algo deu errado")
      })
  }

  const setStatus = async (status) => {
    console.log(status)
    await api.patch(`produtos/${id}/status`, { produtoAtivo: status })
      .then(res => {
        console.log(res.data.message)
        // alert(res.data.message)
      })
      .catch(e => {
        alert(e.response.data.message)
      })
  }

  return (
    <div>
      <div className="controle">
        <input type="checkbox" id="horns" name="horns" defaultChecked={props.item.produtoAtivo} onChange={(e) => setStatus(e.target.checked)} />
        <div className="item-name caixa">
          <div className="title">{props.item.nome}</div>
        </div>
        <div className="valor">
          <div className="caixa-valor caixa">Valor da Unidade</div>
          <label className="caixa-preco caixa">
            <CurrencyInput
              decimalSeparator = ','
              groupSeparator = '.'
              fixedDecimalLength = {2}
              id="prim"
              name="input-name"
              prefix="R$ "
              defaultValue={preco}
              decimalsLimit={2}
              onValueChange={(value) => setPreco(value)}
            />;
          </label>
        </div>
        <div className="quantidade">
          <div className="caixa-qtd caixa">Quantidade</div>
          <label className="caixa-input caixa">
            <input type="number" min="0" step="any" id="seg" placeholder={props.item.quantidade}
              onChange={e => setQuantidade(e.target.value)}
            />
          </label>
        </div>
      </div>
    </div>
  )
}

export default ControleProdutos
