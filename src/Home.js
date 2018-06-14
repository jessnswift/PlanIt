import React, { Component } from "react"

export default class Home extends Component {

    handleLogout = () => {
        this.props.logout();
    }

    handleBudgetButton = function (e) {
        e.preventDefault()
        this.props.showView('budget');

    }.bind(this)


    render() {
        return (
            <div>
                <div>
                <button type="buttonon" onClick={this.handleLogout} className="btn btn-secondary">logout</button>
                </div>

                <form>
                    <div class="form-group">
                        <label for="budgetName">Budget Name</label>
                        <input type="text" className="form-control" id="budgetName" placeholder="Budget Me" />
                    </div>
                    <select class="form-control">
                        <option value="wedding">Wedding</option>
                        <option value="party">Partay</option>
                        <option value="vacation">Vacation</option>
                    </select>
                    <div class="form-group">
                        <label for="dollarAmount">Dolla Amount</label>
                        <input type="text" className="form-control" id="dollarAmount" placeholder="Dolla Amount" />
                    </div>
                    <input id="date" type="date" />
                    <button type="button" className="btn btn-default" onClick={this.handleBudgetButton}>Submit</button>
                </form>
            </div>
        )
    }
}