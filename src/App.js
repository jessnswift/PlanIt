import React, { Component } from 'react';
import './App.css';
import Login from './auth/Login';
import Home from './Home';
import Budget from './Budget/Budget';
import Register from './auth/Register'

class App extends Component {

  // Set initial state
  state = {
    currentView: "login",
    activeUser: localStorage.getItem("activeUser"),
    // currentBudget: currentBudget.budgetAmount,
    register: false,
    categories: []
  }

  // Function to update local storage and set activeUser state
  setActiveUser = (val = null) => {
    if (val) {
      localStorage.setItem("activeUser", val)
    } else {
      localStorage.removeItem("activeUser")
    }

    this.setState({
      activeUser: val
    })
  }

  loginCallback() {
    fetch(`http://localhost:8088/budgets`)
      .then(r => r.json())
      .then(budgets => {
          var userBudgets = budgets.filter((budget) => {
              return budget.userId == localStorage.getItem('activeUser');
          })
          if (userBudgets.length > 0) {
              this.showView("budget")
          } else {
              this.showView("home") // a.k.a. new budget form component
          }
      })
  }

  // Argument can be an event (via NavBar) or a string (via Login)
  showView = function (e) {
    let view = null
    let user = this.state.userProfile

    // Click event triggered switching view
    if (e.hasOwnProperty("target")) {
      view = e.target.id.split("__")[1]

      // View switch manually triggered by passing in string
    } else {
      view = e
    }

    // If user clicked logout, empty local storage and update activeUser state
    if (view === "logout") {
      this.setActiveUser(null)
    }

    // if (view === "profile") {
    if (view === "register") {
      this.setState({ register: true })
      this.setActiveUser(null)
    } else {
      this.state.register = false;
      this.setState(this.state)
    }

    // Update state to correct view will be rendered
    this.setState({
      currentView: view
    })

  }.bind(this)

  View = () => {
    if (this.state.activeUser === null && this.state.register === false) {
      return <Login loginCallback={this.loginCallback} showView={this.showView} setActiveUser={this.setActiveUser} />
    } else if (this.state.register === true && this.state.activeUser === null) {
      return <Register showView={this.showView} setActiveUser={this.setActiveUser} />
    } else {

      switch (this.state.currentView) {
        case "logout":
          return <Login loginCallback={this.loginCallback} showView={this.showView} setActiveUser={this.setActiveUser} />
        case "budget":
          return <Budget budgetCategories={this.state.budgetCategories} showView={this.showView} setActiveUser={this.setActiveUser} logout={this.setActiveUser}/>
        case "home":
          return <Home budgetCategories={this.state.budgetCategories} showView={this.showView} activeUser={this.state.activeUser} logout={this.setActiveUser} />
        default:
        return <Budget budgetCategories={this.state.budgetCategories} showView={this.showView} setActiveUser={this.setActiveUser} logout={this.setActiveUser}/>


      }
    }
  }

  render() {
    return (
      <article className="mainArticle">
        {this.View()}
      </article>
    );
  }
}

export default App