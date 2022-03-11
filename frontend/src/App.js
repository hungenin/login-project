import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navigation from './components/Navigation';
import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
    state = {};

    componentDidMount = () => {
        axios.get('user')
            .then(response => {
                this.setUser(response.data.user);
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    setUser = user => {
        this.setState({
            user: user
        });
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Navigation user={this.state.user} setUser={this.setUser} />
                    <main className="form-signin">
                        <Routes>
                            <Route path="/" exact element={<Home user={this.state.user} />} />
                            <Route path="/login" element={<Login setUser={this.setUser} />} />
                            <Route path="/register" element={<Register setUser={this.setUser} />} />
                        </Routes>
                    </main>
                </BrowserRouter>
            </div>
        );
    }
}