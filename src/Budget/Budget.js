import React, { Component } from "react"
import "./budget.css"
import NavBar from "../Nav/Nav";

const swal = window.swal;

class CategoryItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryName: ''
        }
    }

    componentDidMount() {
        this.setState(this.state)
    }

    onCatEdit = function (e) {
        let fieldID = e.target.id
        this.state[fieldID] = e.target.value
        this.setState(this.state)
        console.log(e.target.value)
    }.bind(this)

    editCat = function() {
        this.state.isEditing = true;
        this.setState(this.state);
    }.bind(this)

    cancelEdit = function() {
        this.state.isEditing = false;
        this.setState(this.state);
    }.bind(this)

    saveEdit = function() {
        console.log('SAVING CATEGORIES IS STILL TO BE IMPLEMENTED!')
        // let payload = {
        //     categoryText: this.state.categoryText,
        //     categoryAmount: this.state.categoryAmount
        // }

        // fetch(`http://localhost:8088/budgets/${this.props.categoryId}`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({})
        // }).then(() => this.props.showView('budget') );
    }.bind(this)

    render() {
        if (this.state.isEditing) {
            return (
                // <h1> Item </h1>
                // EDITING PART

                <div key={this.unique++} >
                    <form>
                        <div className={"card"} attribute={this.state.categoryName}>

                            <div className={"card-body"} onChange={this.handleFieldChange}>
                                <div className={"form-check form-check-inline"}>
                                    <input type="text" className={"form-check-input"} id="categoryText" onChange={this.onCatEdit} contentEditable={true} defaultValue={this.props.categoryName } />
                                    <input className={"form-check-input"} id="categoryAmount" onChange={this.onCatEdit} contentEditable={true} defaultValue={" $" + this.props.amount} />
                                    <button type="button" onClick={() => this.saveEdit()} className="btn btn-sm btn-outline">Save Edit</button>
                                    <button type="button" onClick={() => this.cancelEdit()} className="btn btn-sm btn-outline">Cancel Edit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )
        } else {
            return (
                // NON EDITING PART
                <div key={this.unique++} >
                    <form>
                        <div className={"card"} attribute={this.state.categoryName}>
                            <div className={"card-body"} onChange={this.handleFieldChange}>
                                {this.props.categoryName}: ${this.props.amount}
                                <button type="button" onClick={this.editCat} className="btn btn-sm btn-outline">Edit</button>
                                {/* <button type="button" onClick={() => this.editCat(detailObj)} className="btn btn-outline">Edit</button> */}
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
    }
}


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
                    this.setState({
                        budgetAmount: currentBudget.budgetAmount,
                        budgetName: currentBudget.budgetName,
                        budgetId: currentBudget.id
                    });
                }
            })
        // call another fetch for all categories that have budgetId of this.state.budgetId and save them maybe
        // as an array on state. Then you can get rid of the budgetPercentages array up above.
    }

    onCatEdit = function (e) {
        this.setState({ categoryText: e.target.value })
        console.log(e.target.value)
    }.bind(this)

    editCat = function (detailObj) {
        detailObj.isEditing = true;
        this.setState({ save: true })
    }

    formatCategoryText(categoryObj) {
        return `${categoryObj.categoryName}: \$${(this.state.budgetAmount * categoryObj.percentage) / 100}`
    }

    render() {
        let budgetAmountElement = (<h1>{this.state.budgetName} ${this.state.budgetAmount}</h1>)
        let cats = this.state.budgetPercentages.map(function (detailObj) {
            return (
                <CategoryItem categoryId={detailObj.id} categoryName={detailObj.categoryName} amount={(this.state.budgetAmount * detailObj.percentage) / 100}></CategoryItem>
            )

        }.bind(this))
        return (
            <div>
            <NavBar logout={this.props.logout}/>
            <div className="container">
                {budgetAmountElement}
                {cats}
                <button type="button" onClick={this.handleLogout.bind(this)} className="btn btn-outline">logout</button>
            </div>
            </div>
        )
    }
}


