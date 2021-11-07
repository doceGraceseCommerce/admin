import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from "../../services/api";
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import imagem from '../../assets/images/imagem.png'
import LinearProgress from '@material-ui/core/LinearProgress';
import './CadastroProduto.css';

function CadastroProduto() {
  const [nomeProduto, setNomeProduto] = useState('')
  const [descricaoProduto, setDescricaoProduto] = useState('')
  const [infNutricionaisProduto, setInfNutricionaisProduto] = useState('')
  const [uploadPorcentagem, setUploadPorcentagem] = useState(0)
  const [fileUrl, setFileUrl] = useState('')
  const [doUpload, setDoUpload] = useState(true)
  // const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async () => {
    let data = {
      nome: nomeProduto,
      descricao: descricaoProduto,
      infNutricionaisProduto: infNutricionaisProduto,
      imagem: fileUrl,
      preco: 0,
      quantidade: 0,
      produtoAtivo: false,
      produtoEncerrado: false,
    }
    console.log(data)
    await api.post(`produtos`, data)
      .then(res => {
        console.log(res.data)
        alert(res.data.message)
        window.location.reload()
      })
      .catch(e => {
        alert("Algo deu errado")
      })
  }

  const handleImage = async (e) => {
    e.preventDefault();
    try {
      let selectedFile = e.target.files[0]
      if (selectedFile !== '') {
        console.log(selectedFile);
        let fileData = new FormData();
        fileData.append("file", selectedFile, selectedFile.name)
        await api.post("images", fileData, {
          onUploadProgress: progressEvent => {
            console.log(Math.round((progressEvent.loaded / progressEvent.total) * 100))
            // setUploadPorcentagem(Math.round((progressEvent.loaded / progressEvent.total) * 100) + " %")
            setUploadPorcentagem(Math.round((progressEvent.loaded / progressEvent.total) * 100))

          }
        })
          .then(res => {
            // console.log(res)
            setFileUrl(res.data.imagem)
          })
          .finally(() => {
            setDoUpload(false)
          })
        // });
      }
    } catch (error) {
      console.log(error.response.data)
    }
  };

  // const props = {
  //   name: 'file',
  //   action: `${process.env.REACT_APP_BACKEND}images`,
  //   headers: {
  //     authorization: 'authorization-text',
  //   },
  //   onChange(info) {
  //     if (info.file.status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //       message.success(`${info.file.response.imagem}`);

  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };


  return (
    <div className="cadastro-produto">
      <form>
        <div className="cadastro-display">
          <div className="upload-imagem">
            <label for='picture'>Selecionar um arquivo &#187;</label>
            <input type="file" name="picture" id="picture" onChange={e => handleImage(e)} />
            {/* <div>{uploadPorcentagem}</div> */}
            <LinearProgress variant="determinate" value={uploadPorcentagem} />
            {doUpload &&
              <img src={imagem} className="imagem" />}
            {doUpload !== true &&
              <img src={fileUrl} className="imagem" />}
            {/* <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload> */}
          </div>
          <div className="cadastro-texto">
            <div>
              <input className="cadastro-nome" placeholder="Nome do Produto" value={nomeProduto} onChange={e => setNomeProduto(e.target.value)}></input>
            </div>
            <div>
              <input className="cadastro-descricao" placeholder="Descrição do Produto" value={descricaoProduto} onChange={e => setDescricaoProduto(e.target.value)}></input>
            </div>
            <div>
              <input className="cadastro-inf" placeholder="Informações Nutricionais do Produto" value={infNutricionaisProduto} onChange={e => setInfNutricionaisProduto(e.target.value)}></input>
            </div>
          </div>
        </div>
        <div>{fileUrl}</div>
        
      </form>
      <button className="cadastrar-botao" type="button" onClick={() => handleSubmit()}>CADASTRAR</button>
    </div>
  )
}

export default CadastroProduto
