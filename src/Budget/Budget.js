import React, { Component } from "react"

const swal = window.swal;

export default class Budget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            budgetAmount: 0,
            budgetPercentages: [
                { categoryName: 'Reception', percentage: 45, isEditing: true},
                { categoryName: 'Ceremony', percentage: 3, isEditing: false },
                { categoryName: 'Planner', percentage: 8, isEditing: false },
                { categoryName: 'Attire', percentage: 12, isEditing: false },
                { categoryName: 'Stationery', percentage: 3, isEditing: false },
                { categoryName: 'Flowers/Decore', percentage: 12, isEditing: false },
                { categoryName: 'Photos/Video', percentage: 12, isEditing: false },
                { categoryName: 'Mics', percentage: 5, isEditing: false }
            ]
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
                if (budgets.length) {
                    var currentBudget = budgets[0]
                    this.setState({ budgetAmount: currentBudget.budgetAmount });
                }
            })
    }

    saveCats = function () {

    }

    formatCategoryText(categoryObj) {
        return `${categoryObj.categoryName}: \$${(this.state.budgetAmount * categoryObj.percentage) / 100}`
    }

    render() {

        let cats = this.state.budgetPercentages.map(function (detailObj) {
            if (detailObj.isEditing) {
                return (
                    <div key={this.unique++} >
                    <form>
                        <div className={"card"} attribute={this.state.categoryName}>
                            <div className={"card-body"} onChange={this.handleFieldChange}>
                            <input contenteditable={true} defaultValue={this.formatCategoryText(detailObj)}/>
                            </div>
                        </div>
                    </form>
                </div>
                )
            } else {

            return (
                <div key={this.unique++} >
                    <form>
                        <div className={"card"} attribute={this.state.categoryName}>
                            <div className={"card-body"} onChange={this.handleFieldChange}>
                            {detailObj.categoryName}: ${(this.state.budgetAmount * detailObj.percentage) / 100}
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
        }.bind(this))
        return (
            <div className="container">
                <div>
                    <button type="button" onClick={this.handleLogout.bind(this)} className="btn btn-outline">logout</button>
                </div>
                {cats}
                <button type="button" onClick={this.saveCats.bind(this)} className="btn btn-outline">Save Changes</button>
            </div>

        )
    }
}

