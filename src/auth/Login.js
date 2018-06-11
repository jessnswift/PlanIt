import React, { Component } from "react"
import Register from "./Register.js"
import "./login.css"

export default class Login extends Component {

    // Set initial state
    state = {
        email: "",
        password: "",
        register: "false"
    }

    // Update state whenever an input field is edited
    handleFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this)

    register = function () {
        if (this.state.register === true) {
            this.setState({ register: false })
        } else {
            this.setState({ register: true })
        }
    }.bind(this)

    // Handle for login submit
    handleLogin = function (e) {
        e.preventDefault()

        // Determine if a user already exists in API
        fetch(`http://localhost:8088/users?email=${this.state.email}`)
            .then(r => r.json())
            .then(user => {
                // User exists. Set local storage, and show home view
                if (user.length) {
                    console.log("test")
                    if (user[0].password === this.state.password) {
                        this.props.setActiveUser(user[0].id)
                        this.props.showView("home")
                    } else {
                        alert("Incorrect password!")
                    }
                    // User doesn't exist
                } else {
                    alert("This user does not exist, feel free to sign up!")
                }
            })
    }.bind(this)

    render() {
        return (
            <div>
                <form className="form-signin" onSubmit={this.handleLogin}>
                    <h1 className="title">PlanIt</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input onChange={this.handleFieldChange} type="email" id="email" className="form-control" placeholder="Email address" required="" autoFocus="" />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input onChange={this.handleFieldChange} type="password" id="password" className="form-control" placeholder="Password" required="" />
                    <button className="btn btn-lg btn-primary btn-success btn-block" type="submit">Sign in</button>
                </form>
                <div>
                    <button className="btn btn-lg btn-primary btn-success btn-block" id="button__register" onClick={this.props.showView} type="register">Register Here</button>
                </div>
            </div>
        )
    }
}