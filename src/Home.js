import React, { Component } from "react"
import './home.css';
import NavBar from "./Nav/Nav";

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

    // Update state whenever an input field is edited
    handleFieldChange = function (evt) {
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
        body: JSON.stringify({
          userId: localStorage.getItem("activeUser"),
          budgetName: this.state.budgetName,
          value: this.state.value,
          budgetAmount: this.state.budgetAmount
        })
      }).then((response) => {
            return response.json()
        })
        .then((response) => {
            // let mostRecentBudget = response[0]
            this.props.budgetCategories.map((suggestedCategory, i) => {
                suggestedCategory.amount = (response.budgetAmount * suggestedCategory.percentage) / 100;
                suggestedCategory.budget_id = response.id;
                fetch("http://localhost:8088/categories", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(suggestedCategory)
                })
                .then(r => r.json())
                .then(r => {
                    if (i === this.props.budgetCategories.length - 1){
                        // Don't change views until the last category is finished posting
                        this.props.showView('budget');
                    }
                })
            })

          });

      // inspect the response and get the newly created budget's id and maybe save it to state
      }.bind(this);

    render() {
        return (
            <div>
                <NavBar logout={this.props.logout}/>
                <div className="container">
                    <form className="budgetForm" onSubmit={this.createNewBudget}>
                        <div className="form-group">
                            <label htmlFor="budgetName">Create A New Budget</label>
                            <input onChange={this.handleFieldChange} type="text" className="form-control" id="budgetName" placeholder="Name Your Budget" />
                        </div>
                        <label>
                            Select Your Budget
                        <select onChange={this.handleFieldChange} className="form-control" defaultValue={this.state.value} id="value">
                                <option value="" disabled defaultValue>Select a Budget</option>
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
                </div>
            </div>
        )
    }
}