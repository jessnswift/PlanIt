import React, { Component } from "react"


const swal = window.swal;
export default class Register extends Component {

    state={
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this)

    createUser = function(){
         // Create user in API
         fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: this.state.email, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, city: this.state.city, state: this.state.st})
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
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input onChange={this.handleFieldChange} type="email" id="email" className="form-control" placeholder="Email address" required="" autoFocus="" />
                <label htmlFor="inputFirstName" className="sr-only">First Name</label>
                <input onChange={this.handleFieldChange} type="First Name" id="firstName" className="form-control" placeholder="First Name" required="" autoFocus="" />
                <label htmlFor="inputLastName" className="sr-only">Last Name</label>
                <input onChange={this.handleFieldChange} type="Last Name" id="lastName" className="form-control" placeholder="Last Name" required="" autoFocus="" />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input onChange={this.handleFieldChange} type="password" id="password" className="form-control" placeholder="Password" required="" />
                <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.createUser}>Sign up!</button>
            </form>
            </div>
        )
    }
}