import React, { Component } from 'react';

export default class Home extends Component {
    render() {
        if (this.props.user) {
            return (
                <h1>Welcome {this.props.user.user_name} ! :)</h1>
            );
        }
        return (
            <h1> :( </h1>
        );
    }
};