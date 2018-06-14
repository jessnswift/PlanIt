import React, { Component } from "react"
import Register from "./Register.js"
import "./login.css"

const swal = window.swal;
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
                    if (user[0].password === this.state.password) {
                        this.props.setActiveUser(user[0].id)
                        this.props.showView("home")
                    } else {
                        swal("Oops!", "Incorrect login info, please try again!", "error")
                    }
                    // User doesn't exist
                } else {
                    swal("Oops!", "This user does not exist, feel free to sign up!", "error")
                }
            })
    }.bind(this)

    render() {
        return (
            <div className="loadingPageLogin">
                <form className="form-signin" onSubmit={this.handleLogin}>
                    <h1 className="title">PlanIt</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input onChange={this.handleFieldChange} type="email" id="email" className="form-control" placeholder="Email address" required="" autoFocus="" />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input onChange={this.handleFieldChange} type="password" id="password" className="form-control" placeholder="Password" required="" />
                    <button className="btn btn-lg btn-primary btn-success btn-block" type="submit">Sign in</button>
                </form>
                <div className="form-register">
                    <button className="btn btn-lg btn-primary btn-success btn-block" id="button__register" onClick={this.props.showView} type="button">Register Here</button>
<<<<<<< HEAD
=======
                    <button className="btn btn-lg btn-primary btn-success btn-block" id="button__register" onClick={this.props.showView} type="register">Register Here</button>
>>>>>>> b5d47963b31ab73a367160721111bb2b105ed92b
                </div>
            </div>
        )
    }
}