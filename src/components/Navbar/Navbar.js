import React, { Component } from 'react';
import api from '../../services/api';

import './Navbar.css';


class Navbar extends Component {

    state = {
        clicked: false,
        isLogged: false,
        logout: function () {
            localStorage.clear()
            window.location.href = '/'
        }
    }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    componentDidMount() {
        let token = localStorage.getItem('token')
        if (token) {
            api(`usuarios/id`)
                .then(res => {
                    console.log(res.data)
                    this.setState({ isLogged: true })
                })
                .catch(e => {
                    console.log(e.response)
                    this.setState({ isLogged: false })
                    localStorage.clear()
                    window.location.href = '/login'
                })
        }
    }

    render() {
        return (
            <nav className="navbarItems">
                <a className="navbar-logo" href="/"><h1>doces grace's</h1></a>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <div className="navbar-links-right">
                    <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                        {/* {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })} */}
                        <li key="prontaentrega">
                            <a className='nav-links' href="http://localhost:3001/prontaentrega">
                                pronta entrega
                            </a>
                        </li>
                        {!this.state.isLogged &&
                            <li key="login">
                                <a className='nav-links-mobile' href="/login">
                                    entrar
                                </a>
                            </li>
                        }
                        {this.state.isLogged &&
                            <li key="logout">
                                <button className="nav-links-mobile" onClick={() => this.state.logout()}>Sair</button>
                            </li>
                        }
                    </ul>
                </div>
                {/* <Button>entrar</Button>
                <button className="collapse"  >entrar</button> */}
            </nav>
        )
    }
}

export default Navbar