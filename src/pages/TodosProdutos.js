import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Barraproduto from '../components/ControlPanel/Barraproduto';

function TodosProdutos() {
	const [produtos, setProdutos] = useState([]);

	useEffect(() => {
		api("produtos")
			.then(res => {
				console.log(res.data)
				setProdutos(res.data)
			})
	}, [])

	return (
		<div className="all-elements">
			{produtos.map(item =>
				item.produtoEncerrado !== true &&
				<Barraproduto item={item} />
			)}
		</div>
	)
}

export default TodosProdutos;