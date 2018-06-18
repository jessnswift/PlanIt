import React, { Component } from "react"

const swal = window.swal;

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            budgetName: "",
            value: "",
            budgetAmount: ""
        }
    }


    handleLogout = () => {
        this.props.logout();
    }

    // Update state whenever an input field is edited
    handleFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this)

    // handleBudgetButton = function (e) {
    //     e.preventDefault()


    // }.bind(this)

    createNewBudget = function (e) {
        e.preventDefault()

        // Prevent the user from leaving blank fields
        // if (!this.state.budgetName ||!this.state.type|| !this.state.budgetAmount) {
        //     swal("", "Please don't leave blank fields.", "error")
        //     return;
        //  }
        // Create user in API
        fetch("http://localhost:8088/budgets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: localStorage.getItem("activeUser"), budgetName: this.state.budgetName, value: this.state.value, budgetAmount: this.state.budgetAmount })
        })
        this.props.showView('budget');
    }.bind(this)

    render() {
        return (
            <div>
                <div>
                    <button type="buttonon" onClick={this.handleLogout} className="btn btn-secondary">logout</button>
                </div>

                <form className="budgetForm" onSubmit={this.createNewBudget}>
                    <div class="form-group">
                        <label for="budgetName">Create A New Budget</label>
                        <input onChange={this.handleFieldChange} type="text" className="form-control" id="budgetName" placeholder="Budget Me" />
                    </div>
                    <label>
                        Select Your Budget
                    <select onChange={this.handleFieldChange} className="form-control" defaultValue={this.state.value} id="value">
                            <option value="" disabled selected>Select a Budget</option>
                            <option value="wedding">Wedding</option>
                            <option value="party">Partay</option>
                            <option value="vacation">Vacation</option>
                        </select>
                    </label>
                    <div class="form-group">
                        <input onChange={this.handleFieldChange} type="number" step="any" min="1.00" className="form-control" id="budgetAmount" placeholder="Total Budget Amount" />
                    </div>
                    <button type="submit" value="Submit" className="btn btn-secondary budgetButton">Submit</button>
                </form>
            </div>
        )
    }
}