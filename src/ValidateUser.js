import React, { Component } from 'react';

class ValidateRegister extends Component {

    handleSubmit = function(event) {
        event.preventDefault()
        console.log("Submit button clicked")
      }

componentDidMount () {
    fetch("http://localhost:8088/users")
        .then(response => response.json())
        .then(users => this.setState(users))
  }



    render() {
        return (
          <div className="validate">
                <button className="submitButton">Submit</button>
            <p>
                Validate
            </p>
          </div>

      );
    }
  }

  export default ValidateRegister;