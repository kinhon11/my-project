import React from "react";
import "../Styles/Registration.scss";
class Registration extends React.Component {
  state = {
    Fullname: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    gender: "",
    terms: false,
    error: {},
    submit: null,
  };

  handleChangeFullname = (event) => {
    this.setState({
      Fullname: event.target.value,
    });
  };

  handleChangeEmail = (event) => {
    this.setState({
      Email: event.target.value,
    });
  };

  handleChangePassword = (event) => {
    this.setState({
      Password: event.target.value,
    });
  };

  handleChangeConfirmPassword = (event) => {
    this.setState({
      ConfirmPassword: event.target.value,
    });
  };

  handleChangeGender = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };

  handleChangeTerms = (event) => {
    this.setState({
      terms: event.target.checked,
    });
  };

  validate = () => {
    const errors = {};
    const { Fullname, Email, Password, ConfirmPassword, gender, terms } =
      this.state;
    if (!Fullname.trim()) errors.Fullname = "Fullname is required";
    if (!Email) {
      errors.Email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      errors.Email = "Email not suitable ";
    }
    if (!Password) {
      errors.Password = "Password is required";
    } else if (Password.length < 6) {
      errors.Password = "Password must be at least 6 characters";
    }
    if (!ConfirmPassword) {
      errors.ConfirmPassword = "Confirm Password is required";
    } else if (ConfirmPassword !== Password) {
      errors.ConfirmPassword = "Passwords do not match";
    }

    if (!gender) errors.gender = "Please select gender";
    if (!terms) errors.terms = "Please accept the terms";

    return errors;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const errors = this.validate();
    if (Object.keys(errors).length > 0) {
      this.setState({ error: errors, submit: null });
    } else {
      this.setState({
        error: {},
        submit: {
          Fullname: this.state.Fullname,
          Email: this.state.Email,
          Password: this.state.Password,
          gender: this.state.gender,
          terms: this.state.terms,
        },
      });
    }
  };

  render() {
    const { error } = this.state;

    return (
      <div
        className="registration-container"
        style={{ maxWidth: "500px", margin: "auto" }}
      >
        <h2>Form Registration</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Fullname:</label>
            <br />
            <input
              type="text"
              value={this.state.Fullname}
              onChange={this.handleChangeFullname}
              placeholder="Enter your fullname"
            />
            <div style={{ color: "red" }}>{error.Fullname}</div>
          </div>

          <div>
            <label>Email:</label>
            <br />
            <input
              type="text"
              value={this.state.Email}
              onChange={this.handleChangeEmail}
              placeholder="Enter your email"
            />
            <div style={{ color: "red" }}>{error.Email}</div>
          </div>

          <div>
            <label>Password:</label>
            <br />
            <input
              type="password"
              value={this.state.Password}
              onChange={this.handleChangePassword}
              placeholder="Enter your password"
            />
            <div style={{ color: "red" }}>{error.Password}</div>
          </div>

          <div>
            <label>Confirm Password:</label>
            <br />
            <input
              type="password"
              value={this.state.ConfirmPassword}
              onChange={this.handleChangeConfirmPassword}
              placeholder="Enter your confirm password"
            />
            <div style={{ color: "red" }}>{error.ConfirmPassword}</div>
          </div>

          <div>
            <label>Gender:</label>
            <br />
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={this.state.gender === "Male"}
              onChange={this.handleChangeGender}
            />{" "}
            Male
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={this.state.gender === "Female"}
              onChange={this.handleChangeGender}
            />{" "}
            Female
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={this.state.gender === "Other"}
              onChange={this.handleChangeGender}
            />{" "}
            Other
            <div style={{ color: "red" }}>{error.gender}</div>
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={this.state.terms}
                onChange={this.handleChangeTerms}
              />{" "}
              I agree to the terms
            </label>
            <div style={{ color: "red" }}>{error.terms}</div>
          </div>

          <button type="submit">Register</button>
        </form>
        {this.state.submit && (
          <div style={{ marginTop: "20px" }}>
            <ul>
              {this.state.submit &&
                Object.entries(this.state.submit).map(([key, value], index) => {
                  return (
                    <li key={key}>
                      {key}: {String(value)}
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Registration;
