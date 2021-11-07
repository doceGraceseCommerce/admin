import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/SideBar/Sidebar";
import TodosProdutos from "./pages/TodosProdutos";
import Cadastro from "./pages/Cadastro";
import Controle from "./pages/Controle";
import PedidosDia from "./pages/PedidosDia";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Navbar />
          <div>
            <div>
              <Route path='/login' component={LoginPage} exact />
            </div>
            <div className="wrap-all">
              <PrivateRoute path='/' component={TodosProdutos} exact />
              <PrivateRoute path='/todos-produtos' component={TodosProdutos} exact />
              <PrivateRoute path='/cadastro-produto' component={Cadastro} exact />
              <PrivateRoute path='/controle-entrega' component={Controle} exact />
              <PrivateRoute path='/controle-pedidos' component={PedidosDia} exact />
            </div>
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
