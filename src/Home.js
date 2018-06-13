import React, { Component } from "react"

export default class Home extends Component {

    handleLogout = () => {
        this.props.logout();
    }

    render() {
        return (
            <div>
                <div>
                <button onClick={this.handleLogout} className="btn btn-default">logout</button>
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
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        )
    }
}