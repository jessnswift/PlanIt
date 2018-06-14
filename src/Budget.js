import React, { Component } from "react"

export default class Budget extends Component {

    handleLogout = () => {
        this.props.logout();
    }

    budgetPercentages = [
        {categoryName: 'reception', percentage: 45},
        {categoryName: 'ceremony', percentage: 3},
        {categoryName: 'planner', percentage: 8},
        {categoryName: 'attire', percentage: 12},
        {categoryName: 'stationery', percentage: 3},
        {categoryName: 'flowersDecore', percentage: 12},
        {categoryName: 'photoVideo', percentage: 12},
        {categoryName: 'mics', percentage: 5}
    ]



    render() {
        let cats = this.budgetPercentages.map(function(detailObj){
            return (
                <div className={"card"}>
                    <div className={"card-body"}> {detailObj.categoryName}: {detailObj.percentage}</div>
                </div>
            )
        })
        return (
            <div className="container">

                    {cats}

            </div>
        )
    }
}