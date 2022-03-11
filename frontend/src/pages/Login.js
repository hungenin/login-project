import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class Login extends Component {
    state = {};

    submit = e => {
        e.preventDefault();
        const data = {
            user_name: this.user_name,
            password: this.password
        };

        axios.post('login', data)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                this.setState({
                    loggedIn: true
                });
                this.props.setUser(response.data.user);
            })
            .catch(error => {
                if (error.response.data.message) {
                    alert(error.response.data.message);
                }
            });
    }

    render() {
        if (this.state.loggedIn) {
            return <Navigate replace to="/" />;
        }

        return (
            <form onSubmit={this.submit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="user name" onChange={e => this.user_name = e.target.value} />
                    <label htmlFor="floatingInput">user name</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="password" onChange={e => this.password = e.target.value} />
                    <label htmlFor="floatingPassword">password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
        );
    }
}