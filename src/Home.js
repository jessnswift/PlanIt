import React, { Component } from "react"

const swal = window.swal;

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            budgetName: "",
            value: "",
            budgetAmount: 0
        }
    }


    handleLogout = () => {
        this.props.logout();
    }

    // Update state whenever an input field is edited
    handleFieldChange = function (evt) {
        debugger;
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this)

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
            body: JSON.stringify({ userId: +localStorage.getItem("activeUser"), budgetName: this.state.budgetName, value: this.state.value, budgetAmount: +this.state.budgetAmount })
        }).then((response) => {
            this.props.showView('budget')
            // inspect the response and get the newly created budget's id and maybe save it to state
        });

        //budgetPercentages: [
        //     { budgetId: categoryName: 'Reception', percentage: 45, isEditing: true },
        //     { categoryName: 'Ceremony', percentage: 3, isEditing: true },
        //     { categoryName: 'Planner', percentage: 8, isEditing: true },
        //     { categoryName: 'Attire', percentage: 12, isEditing: false },
        //     { categoryName: 'Stationery', percentage: 3, isEditing: false },
        //     { categoryName: 'Flowers/Decore', percentage: 12, isEditing: false },
        //     { categoryName: 'Photos/Video', percentage: 12, isEditing: false },
        //     { categoryName: 'Mics', percentage: 5, isEditing: false }
        // ]
        // budgetPercentages.map(function(suggestedCategory) {
            // suggestedCategory.budgetId = this.state.createdBudgetId
        //  fetch("http://localhost:8080/categories", {
        //      method: "POST",
                // headers" {

                // },
                // body: suggestedCategory
        // })
        // })
        //

    }.bind(this)

    render() {
        return (
            <div>

                <form className="budgetForm" onSubmit={this.createNewBudget}>
                    <div className="form-group">
                        <label htmlFor="budgetName">Create A New Budget</label>
                        <input onChange={this.handleFieldChange} type="text" className="form-control" id="budgetName" placeholder="Name Your Budget" />
                    </div>
                    <label>
                        Select Your Budget
                    <select onChange={this.handleFieldChange} className="form-control" defaultValue={this.state.value} id="value">
                            <option value="" disabled selected>Select a Budget</option>
                            <option value="wedding">Wedding</option>
                            <option value="party">Party</option>
                            <option value="vacation">Vacation</option>
                        </select>
                    </label>
                    <div className="form-group">
                        <input onChange={this.handleFieldChange} type="number" step="any" min="1.00" className="form-control" id="budgetAmount" placeholder="Total Budget Amount" />
                    </div>
                    <button type="submit" value="Submit" className="btn btn-outline budgetButton">Submit</button>
                </form>
                <br>
                </br>
                <div>
                    <button type="buttonon" onClick={this.handleLogout} className="btn btn-outline">logout</button>
                </div>
            </div>
        )
    }
}