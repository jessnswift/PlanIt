import React, { Component } from "react"

const swal = window.swal;

export default class Budget extends Component {

    handleLogout = () => {
        this.props.logout();
    }

    budgetPercentages = [
        { categoryName: 'reception', percentage: 45 },
        { categoryName: 'ceremony', percentage: 3 },
        { categoryName: 'planner', percentage: 8 },
        { categoryName: 'attire', percentage: 12 },
        { categoryName: 'stationery', percentage: 3 },
        { categoryName: 'flowersDecore', percentage: 12 },
        { categoryName: 'photoVideo', percentage: 12 },
        { categoryName: 'mics', percentage: 5 }
    ]

    render() {
        let cats = this.budgetPercentages.map(function (detailObj) {
            return (
                <div>

                    <form>
                        <div className={"card"}>
                            <div className={"card-body"}> {detailObj.categoryName}: {detailObj.percentage}</div>
                        </div>
                    </form>
                </div>
            )
        }.bind(this))
        return (
            <div className="container">
                <div>
                    <button type="buttonon" onClick={this.handleLogout} className="btn btn-secondary">logout</button>
                </div>
                {cats}

            </div>
        )
    }
}