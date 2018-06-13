import React, { Component } from "react"
import Login from './Login'
import "./register.css"

const swal = window.swal;
export default class Register extends Component {

    state = {
        firstName: null,
        lastName: null,
        email: null,
        password: null
    }

    // Update state whenever an input field is edited
    handleFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this)

    createUser = function (e) {
        e.preventDefault()

        // Prevent the user from leaving blank fields
        if (!this.state.firstName || !this.state.lastName || !this.state.email || !this.state.password) {
            alert("Please don't leave the fields blank.")
         }
         // Create user in API
         fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password})
        })

        // Set local storage with newly created user's id and show home view
        .then(newUser => {
            swal("Welcome to PlanIt!", "", "success")
        })
    }.bind(this)

    render() {
        return (
            <div>
            <form className="form-signup" onSubmit={this.handleLogin}>
                <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                <label htmlFor="inputFirstName" className="sr-only">First Name</label>
                <input onChange={this.handleFieldChange} type="First Name" id="firstName" className="form-control" placeholder="First Name" required="" autoFocus="" />
                <label htmlFor="inputLastName" className="sr-only">Last Name</label>
                <input onChange={this.handleFieldChange} type="Last Name" id="lastName" className="form-control" placeholder="Last Name" required="" autoFocus="" />
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input onChange={this.handleFieldChange} type="email" id="email" className="form-control" placeholder="Email address" required="" autoFocus="" />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input onChange={this.handleFieldChange} type="password" id="password" className="form-control" placeholder="Password" required="" />
                <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.createUser}>Sign up!</button>
            </form>
            </div>
        )
    }
}