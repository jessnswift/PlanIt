import React, { Component } from "react"
import "./budget.css"
import NavBar from "../Nav/Nav";

const swal = window.swal;

class CategoryItem extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            isEditing: false,
            categoryName: this.props.categoryObj.categoryName,
            amount: this.props.categoryObj.amount,
            categoryId: this.props.categoryObj.id,
            categoryObj: this.props.categoryObj
        }
    }

    updateSelf(categoryObj) {
        this.setState({
            categoryName: categoryObj.categoryName || this.state.categoryName,
            amount: categoryObj.amount,
            categoryId: categoryObj.id,
            categoryObj: categoryObj
        });
    }

    onCatEdit = function (e) {
        let fieldID = e.target.id;
        this.setState({[fieldID]: e.target.value})
    }.bind(this);

    toggleEditCat = function (e) {
        console.log(e.target.value)
        this.setState({isEditing: !this.state.isEditing});
    }.bind(this);

    deleteCat = () => {
        fetch(`http://localhost:8088/categories/${this.state.categoryId}`, {
            method: "DELETE"
        }).then(r => r.json()).then((r) => {
            this.props.refreshCats(this.state.categoryId)
        })
    };

    cancelEdit = function () {
        this.setState({isEditing: false});
    }.bind(this);

    saveEdit = function () {
        let categoryPostBody = {
            categoryName: this.state.categoryText || this.props.categoryName,
            amount: this.state.amount || this.props.amount,
            budget_id: this.props.budgetId,
            id: this.props.budgetId,
            percentage: this.props.categoryObj.percentage,
            isEditing: this.props.categoryObj.isEditing,
        }
        fetch(`http://localhost:8088/categories/${this.props.categoryId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(categoryPostBody)
        }).then(r => r.json()).then((r) => {
            this.updateSelf(r);
            this.toggleEditCat()
        })
    }.bind(this)

    render() {
        console.log(this.props.categoryObj.categoryName)
        return (
            <div>
        {this.state.isEditing ? (
                // <h1> Item </h1>
                // EDITING PART

                <div>
                    <form>
                        <div className={"card"} attribute={this.state.categoryName}>

                            <div className={"card-body"} onChange={this.handleFieldChange}>
                                <div className={"form-check form-check-inline category-edit-container"}>
                                    <div className={"category-edit-fields"}>
                                        <input type="text" className={"form-control form-check-input"}
                                            id="categoryText" onChange={this.onCatEdit}
                                            contentEditable={true}
                                            defaultValue={this.props.categoryObj.categoryName} />
                                            {this.props.categoryObj.categoryName}
                                        <input className={"form-control form-check-input"} id="amount"
                                            onChange={this.onCatEdit} contentEditable={true}
                                            defaultValue={document.getElementById(this.props.categoryObj.categoryName).textContent} />
                                    </div>
                                    <div className={"category-edit-buttons"}>
                                        <button type="button" onClick={() => this.saveEdit()}
                                            className="btn btn-sm btn-outline">Save Edit
                                        </button>
                                        <button type="button" onClick={() => this.cancelEdit()}
                                            className="btn btn-sm btn-outline">Cancel Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            ):

            (
                // NON EDITING PART
                <div>
                    <form>
                        <div className={"card"} attribute={this.state.categoryName}>
                            <div className={"card-body"} onChange={this.handleFieldChange}>
                                {/* {this.state.categoryName}: ${this.state.amount} */}
                                {this.props.formatCategoryText(this.props.categoryObj)}
                                <button type="button" onClick={this.deleteCat}
                                    className="btn btn-sm btn-outline">Delete
                                </button>
                                <button type="button" onClick={this.toggleEditCat}
                                    className="btn btn-sm btn-outline">Edit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
</div>
    )
    }
}



export default class Budget extends Component {

    constructor(props) {
        super(props);
        this.uniqueKey = 1
        this.state = {
            budgetAmount: 0,
            budgetName: "",
            save: false,
            budgetCategories: [
                {categoryName: 'Reception', percentage: 45},
                {categoryName: 'Ceremony', percentage: 3},
                {categoryName: 'Planner', percentage: 8},
                {categoryName: 'Attire', percentage: 12},
                {categoryName: 'Stationery', percentage: 3},
                {categoryName: 'Flowers/Decore', percentage: 12},
                {categoryName: 'Photos/Video', percentage: 12},
                {categoryName: 'Misc', percentage: 5}
                ],
            budgetId: 0
        }

    }

    unique = 1;

    handleLogout = () => {
        this.props.logout();
    }

    componentDidMount() {
        console.log("componentDidMount", this.state)
        fetch(`http://localhost:8088/budgets?userId=${localStorage.getItem('activeUser')}`)
            .then(r => {
                return r.json()
            })
            .then(budgets => {
                if (budgets.length) {
                    var currentBudget = budgets[0];
                    this.setState({
                        budgetAmount: currentBudget.budgetAmount,
                        budgetName: currentBudget.budgetName,
                        budgetId: currentBudget.id
                    });
                    fetch(`http://localhost:8088/categories?budget_id=${currentBudget.id}`)
                        .then(res => res.json())
                        .then(categories => {
                            // this.setState({budgetCategories: categories});
                        })
                }
                // call another fetch for all categories that have budgetId of this.state.budgetId and save them maybe
                this.refreshCats();

            }).catch(error => console.log( error));
        console.log("componentDidMountEnd", this.state)
        }


    refreshCats = function(deletedCategoryId) {
        let filteredCategories = this.state.budgetCategories.filter( (catsObj) => {
            if (deletedCategoryId === catsObj.id) {
                return false
            } else {
                return true
            }
        })
        // this.setState({budgetCategories: filteredCategories})
        fetch(`http://localhost:8088/categories?budget_id=${this.state.budgetId}`)
            .then(res => res.json())
            .then(categories => {
                // this.setState({budgetCategories: categories});
            })
    }.bind(this);

    formatCategoryText = function (categoryObj) { this.setState
        return (<p> {categoryObj.categoryName}: <span id={categoryObj.categoryName}> ${(this.state.budgetAmount * categoryObj.percentage) / 100} </span> </p>)
    }.bind(this)

    buildBudgetHeader() {
        return (
            <div className="budget-header">
                <h1>{this.state.budgetName} </h1>
                <span className="budget-amount">${this.state.budgetAmount}</span>
            </div>
        );
    }

    buildCategories = function () {
        return (this.state.budgetCategories.map( (detailObj, i) => {
            return (
                <CategoryItem key={this.uniqueKey++} categoryObj={detailObj} categoryId={detailObj.id}
                    categoryName={detailObj.categoryName}
                    amount={detailObj.amount} budgetId={this.state.budgetId} refreshCats={this.refreshCats} formatCategoryText={this.formatCategoryText} />
            )
        })
        )
    }.bind(this);

    render() {

        return (
            <div>
                <NavBar logout={this.props.logout} />
                <div className="container">
                    {this.buildBudgetHeader()}
                    {this.buildCategories()}
                </div>
            </div>

        )
    }
}


