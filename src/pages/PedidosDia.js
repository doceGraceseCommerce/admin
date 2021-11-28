import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import Pedido from '../components/pedidos dia/Pedido';

function PedidosDia() {

  const [pedidos, setPedidos] = useState([])
  const [dataPedido, setDataPedido] = useState("")
  const [pedidosDia, setPedidosDia] = useState([])

  useEffect(() => {
    // console.log(new Date().toLocaleDateString("pt-BR"))
    let date = new Date().toISOString().slice(0, 10);
    // date = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
    console.log(date)
    setDataPedido(date)

    async function buscarPedidos() {
      await api(`pedidos`)
        .then(res => {
          // console.log(res.data)
          setPedidos(res.data)
        })
        .catch(e => {
          alert(e.response.data.message)
        })
    }

    buscarPedidos()
  }, [])

  useEffect(() => {
    filtrar()
  }, [dataPedido, pedidos])

  const filtrar = () => {
    let dataFiltro = dataPedido
    console.log(dataFiltro)

    function separar(date) {
      var s = date;
      s = s.split(" ")
      s = s[0].split("/")
      // let day = Number(s[0]) + 1
      console.log(s)
      let newdate = s[2] + "-" + s[1] + "-" + s[0]
      return newdate
    }

    // dataFiltro = separar(dataFiltro)

    let lista = pedidos.filter(item => {
      var dateItem = separar(item.dataPedido)
      if (dateItem === dataFiltro)
        console.log(dateItem, dataFiltro)
      return dateItem === dataFiltro
    })
    console.log(lista)
    setPedidosDia(lista)
  }


  return (
    <div>
      <label>Filtrar</label>
      <input type="date" value={dataPedido} onChange={e => { setDataPedido(e.target.value) }} />
      {pedidosDia.map(item =>
        // (item.statusPedido !== "Pedido Entregue") &&
        < Pedido item={item} />
      )}
      <ToastContainer />
    </div>
  )
}

export default PedidosDia
