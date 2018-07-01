import React, { Component } from "react"
import "./budget.css"
import NavBar from "../Nav/Nav";

const swal = window.swal;

class CategoryItem extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            categoryName: props.categoryObj.categoryName,
            amount: props.categoryObj.amount,
            categoryId: props.categoryObj.id,
            categoryObj: props.categoryObj
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
        console.log(e.target.id)
    }.bind(this);

    toggleEditCat = function () {
        this.setState({isEditing: !this.state.isEditing});
    }.bind(this);

    deleteCat = () => {
        debugger
        fetch(`http://localhost:8088/categories/${this.state.categoryId}`, {
            method: "DELETE"
        }).then(r => r.json()).then((r) => {
            debugger
            this.props.refreshCats(this.state.categoryId)
        })
    };

    cancelEdit = function () {
        this.setState({isEditing: false});
    }.bind(this);

    saveEdit = function () {
        this.props.categoryObj.categoryName = this.state.categoryText;
        this.props.categoryObj.amount = this.state.amount;

        fetch(`http://localhost:8088/categories/${this.props.categoryId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.props.categoryObj)
        }).then(r => r.json()).then((r) => {
            this.updateSelf(r);
            this.toggleEditCat()
        })
    }.bind(this)

    render() {
        if (this.state.isEditing) {
            return (
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
                                            defaultValue={this.state.categoryName} />
                                        <input className={"form-control form-check-input"} id="amount"
                                            onChange={this.onCatEdit} contentEditable={true}
                                            defaultValue={this.state.amount} />
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
            )
        } else {
            return (
                // NON EDITING PART
                <div>
                    <form>
                        <div className={"card"} attribute={this.state.categoryName}>
                            <div className={"card-body"} onChange={this.handleFieldChange}>
                                {this.state.categoryName}: ${this.state.amount}
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
    }
}


export default class Budget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            budgetAmount: 0,
            budgetName: "",
            save: false,
            budgetCategories: [],
            budgetId: 0
        }

    }

    unique = 1;

    handleLogout = () => {
        this.props.logout();
    }



    componentDidMount() {
        debugger;
        fetch(`http://localhost:8088/budgets?userId=${localStorage.getItem('activeUser')}`)
            .then(r => r.json())
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
                            this.setState({budgetCategories: categories});
                        })
                }
                // call another fetch for all categories that have budgetId of this.state.budgetId and save them maybe
                // this.refreshCats();

            });
    }

    refreshCats = function(deletedCategoryId) {
        let filteredCategories = this.state.budgetCategories.filter( (catsObj) => {
            if (deletedCategoryId === catsObj.id) {
                return false
            } else {
                return true
            }
        })
        this.setState({budgetCategories: filteredCategories})
        // fetch(`http://localhost:8088/categories?budget_id=${this.state.budgetId}`)
        //     .then(res => res.json())
        //     .then(categories => {
        //         this.setState({budgetCategories: categories});
        //     })
    }.bind(this);

    formatCategoryText(categoryObj) {
        return `${categoryObj.categoryName}: \$${(this.state.budgetAmount * categoryObj.percentage) / 100}`
    }

    buildBudgetHeader() {
        return (
            <div className="budget-header">
                <h1>{this.state.budgetName} </h1>
                <span className="budget-amount">${this.state.budgetAmount}</span>
            </div>
        );
    }

    buildCategories() {
        debugger;
        return this.state.budgetCategories.map(function (detailObj, i) {
            debugger;
            return (
                <CategoryItem key={i + detailObj.id} categoryObj={detailObj} categoryId={detailObj.id}
                    categoryName={detailObj.categoryName}
                    amount={detailObj.amount} refreshCats={this.refreshCats}></CategoryItem>
            )

        }.bind(this));
    }

    render() {

        return (
            <div>
                <NavBar logout={this.props.logout} />
                <div className="container">
                    {this.buildBudgetHeader()}
                    {this.buildCategories()}
                    <button type="button" onClick={this.handleLogout.bind(this)}
                        className="btn btn-outline">logout
            </button>
                </div>
            </div>

        )
    }
}


