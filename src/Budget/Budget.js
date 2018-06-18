import React, { Component } from "react"

const swal = window.swal;

export default class Budget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            budgetAmount: 0
        }
    }
    unique = 1;

    handleLogout = () => {
        this.props.logout();
    }

    componentDidMount() {
            fetch(`http://localhost:8088/budgets?userId=${localStorage.getItem('activeUser')}`)
        .then(r => r.json())
        .then(budgets => {
            if(budgets.length){
    //         var userBudgets = budgets.filter((budget) => {
    //             return budget.userId == localStorage.getItem('activeUser');
    //         })
            var currentBudget = budgets[0]
            this.setState({ budgetAmount: currentBudget.budgetAmount});
        }
        })
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
                <div key={this.unique++}>
                    <form>
                        <div className={"card"}>
                            <div className={"card-body"}> {detailObj.categoryName}: ${(this.state.budgetAmount * detailObj.percentage) / 100 }</div>
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