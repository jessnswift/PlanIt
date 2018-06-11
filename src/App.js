import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './auth/Login';
import Home from './Home'

class App extends Component {

  // Set initial state
  state = {
    currentView: "login",
    activeUser: localStorage.getItem("activeUser")
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

  // View switcher -> passed to NavBar and Login
  // Argument can be an event (via NavBar) or a string (via Login)
  showView = function (e) {
    let view = null
    let user = this.state.userProfile
    // Click event triggered switching view
    if (e.hasOwnProperty("target")) {
      view = e.target.id.split("__")[1]
      if (e.target.id.split("__").length > 2) {
        user = e.target.id.split("__")[2]
      }
      // View switch manually triggered by passing in string
    } else {
      view = e
    }

    // If user clicked logout in nav, empty local storage and update activeUser state
    if (view === "logout") {
      this.setActiveUser(null)
    }

    // if (view === "profile") {
    if (view === "logout") {
      this.setActiveUser(null)
    }

    // Update state to correct view will be rendered
    this.setState({
      currentView: view
    })

  }.bind(this)

  View = () => {
    if (this.state.activeUser === null) {
      return <Login showView={this.showView} setActiveUser={this.setActiveUser} />
    } else {
      switch (this.state.currentView) {
        case "logout":
          return <Login showView={this.showView} setActiveUser={this.setActiveUser} />
        case "home":
        default:
          return <Home activeUser={this.state.activeUser} logout={this.setActiveUser} />
      }
    }
  }

  render() {
    return (
      <article>
        {this.View()}
      </article>
    );
  }
}

export default App