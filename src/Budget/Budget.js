import React, { Component } from "react"
import "./budget.css"

const swal = window.swal;

export default class Budget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            budgetAmount: 0,
            budgetName: "",
            save: false,
            budgetPercentages: [
                { categoryName: 'Reception', percentage: 45, isEditing: true },
                { categoryName: 'Ceremony', percentage: 3, isEditing: true },
                { categoryName: 'Planner', percentage: 8, isEditing: true },
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
                    this.setState({ budgetAmount: currentBudget.budgetAmount,  budgetName: currentBudget.budgetName});
                }
            })
    }

    onCatEdit = function (e) {
        this.setState({categoryText: e.target.value})
        console.log(e.target.value)
    }.bind(this)

    editCat = function (detailObj) {
        detailObj.isEditing = true;
        this.setState({save: true})
    }

    cancelEdit = function (detailObj) {
        detailObj.isEditing = false;
        this.setState({save: false})
    }

    saveEdit = function (detailObj) {
        //
        detailObj.isEditing = false;
        this.setState({save: false})
    }

    formatCategoryText(categoryObj) {
        return `${categoryObj.categoryName}: \$${(this.state.budgetAmount * categoryObj.percentage) / 100}`
    }

    render() {
        let editClass = this.props.editMode ? 'is--show' : '';
        let budgetAmountElement = (<h1>{this.state.budgetName} ${this.state.budgetAmount}</h1>)
        let cats = this.state.budgetPercentages.map(function (detailObj) {
            // let stateToUse = {};
            // stateToUse[detailObj.budgetName + "categoryText"] = this.formatCategoryText(detailObj)
            // this.setState(stateToUse);

            if (detailObj.isEditing) {
                // EDITING VERSION
                // cancel edit button here
                // save changes button here
                return (
                    <div key={this.unique++} >
                        <form>
                            <div className={"card"} attribute={this.state.categoryName}>
                                <div className={"card-body"} onChange={this.handleFieldChange}>
                                    <input id="categoryText" onChange={this.onCatEdit} contentEditable={true} defaultValue={this.formatCategoryText(detailObj)}/>
                                    <button type="button" onClick={() => this.saveEdit(detailObj)} className="btn btn-outline">Save Edit</button>
                                    <button type="button" onClick={() => this.cancelEdit(detailObj)} className="btn btn-outline">Cancel Edit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                )
            } else {
                // NOT EDITING version
                // add edit button in this version
                return (
                    <div key={this.unique++} >
                        <form>
                            <div className={"card"} attribute={this.state.categoryName}>
                                <div className={"card-body"} onChange={this.handleFieldChange}>
                                    {detailObj.categoryName}: ${(this.state.budgetAmount * detailObj.percentage) / 100}
                                    <button type="button" onClick={() => this.editCat(detailObj)} className="btn btn-outline">Edit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                )
            }
        }.bind(this))
        return (
            <div className="container">
                {budgetAmountElement}
                {cats}
                <button type="button" onClick={this.handleLogout.bind(this)} className="btn btn-outline">logout</button>
            </div>

        )
    }
}


