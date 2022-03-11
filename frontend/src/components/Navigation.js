import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
    logout = () => {
        localStorage.clear();
        this.props.setUser(null);
    };
    
    render() {
        let buttons;
        if (this.props.user) {
            buttons = (
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/" onClick={this.logout}>logout</Link>
                    </li>
                </ul>
            );
        } else {
            buttons = (
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/login">login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/register">register</Link>
                    </li>
                </ul>
            );
        }

        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">HOME</Link>
                    <div>
                        {buttons}
                    </div>
                </div>
            </nav>
        );
    }
}