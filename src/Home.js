import React, { Component } from "react"

export default class Home extends Component {

    handleLogout = () => {
        this.props.logout();
    }

    render() {
        return (
            <div>
                <button onClick={this.handleLogout}>logout</button>
                Home
            </div>
        )
    }
}