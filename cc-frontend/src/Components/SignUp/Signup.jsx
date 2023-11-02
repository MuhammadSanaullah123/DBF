import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// CSS
import styles from "./Signup.module.css";

import Swal from "sweetalert2";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
// API
import { register } from "../../actions/auth";
// Redux
import { connect } from "react-redux";
import propTypes from "prop-types";

const allCountries = Country.getAllCountries();
const allStates = State.getAllStates();
const allCities = City.getAllCities();
const countryNames = allCountries.map((c) => ({
  value: c.name,
  label: c.name,
}));
const getCodeFromName = {};
for (let i = 0; i < allCountries.length; ++i) {
  getCodeFromName[allCountries[i].name] = allCountries[i].isoCode;
}
const getCodeFromNameState = {};
for (let i = 0; i < allStates.length; ++i) {
  getCodeFromNameState[allStates[i].name] = allStates[i].isoCode;
}
const getStatesOfACountry = (country) => {
  return allStates
    .filter((s) => s.countryCode === getCodeFromName[country])
    .map((s) => ({ value: s.name, label: s.name }));
};
const getCitiesOfAState = (state) => {
  return allCities
    .filter((c) => c.stateCode === getCodeFromNameState[state])
    .map((c) => ({ value: c.name, label: c.name }));
};
const Signup = ({ register }) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    dateOfBirth: "",
    state: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stateNames, setStateNames] = useState([]);
  const [cityNames, setCityNames] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [address, setAddress] = useState();

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: "#5e5e5e",
      backgroundColor: state.isSelected ? "#F4F5F7" : "#fff",
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      minHeight: "100%",
      color: "#5e5e5e",
      minWidth: "100%",
    }),
    input: (provided, state) => {
      return { ...provided, color: "#5e5e5e" };
    },
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition, color: "#5e5e5e" };
    },
  };
  function validate_password(password) {
    let check = /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{8,}$/;
    if (password.match(check)) {
      console.log("Your password is strong.");
      return true;
    } else {
      console.log("Meh, not so much.");
      return false;
    }
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(state));
    if (
      !state.terms ||
      !state.firstName ||
      !state.lastName ||
      !state.userName ||
      !state.dateOfBirth ||
      !state.state ||
      !state.phoneNumber ||
      !state.email ||
      !state.password
    ) {
      return Swal.fire("fill all the fields", "", "error");
    }
    if (!state.terms) {
      return Swal.fire("check terms and services", "", "error");
    }
    if (!state.password || !state.confirmPassword)
      return Swal.fire("Enter valid passwords", "", "error");
    if (state.password !== state.confirmPassword)
      return Swal.fire(
        "Passwords dont match. Please enter again.",
        "",
        "error"
      );
    if (!verifyEmail(state.email))
      return Swal.fire("Enter valid email", "", "error");
    if (validate_password(state.password)) {
      setLoading(true);
      register(state);
      setLoading(false);

      console.log("HERERER");
    } else {
      return Swal.fire(
        " Please enter a password with a minimum of 8 characters, including at least 1 digit, one Cap and 1 special character.",
        "",
        "error"
      );
    }
  };
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const validate = (values) => {
    const errors = {};
    if (!values.country) {
      errors.country = "please select at least one option!";
    }
    if (!values.city) {
      errors.city = "please select at least one option!";
    }
    if (!values.firstName) {
      errors.firstName = "do not leave first name blank!";
    }
    if (!values.lastName) {
      errors.lastName = "do not leave last name blank!";
    }
    if (!values.userName) {
      errors.userName = "do not leave user name blank!";
    }
    if (!values.dateOfBirth) {
      errors.dateOfBirth = "do not leave date of birth blank!";
    }
    if (!values.state) {
      errors.state = "please select at least one option!";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "please enter a valid number!";
    }
    if (!values.email) {
      errors.email = "do not leave email blank!";
    }
    if (!values.password) {
      errors.password = "do not leave password blank!";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "do not leave confirm password blank!";
    }
    return errors;
  };
  const verifyEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  console.log(state);
  return (
    <>
      <div className={styles.signupMain}>
        <div className={styles.signupInner}>
          <div className={styles.signupText}>Sign up</div>
          <div className={styles.inpuitsArea}>
            <div className={styles.nameArea}>
              <div className={styles.nameINer}>
                <div className={styles.firstText}>First Name</div>
                <input
                  name="firstName"
                  value={state.firstName}
                  type="text"
                  placeholder="First Name"
                  className={styles.nameInput}
                  onChange={handleChange}
                />
                {formErrors.firstName ? (
                  <span className={styles.redd}>{formErrors.firstName}</span>
                ) : (
                  ""
                )}
              </div>
              <div className={styles.lestInner}>
                <div className={styles.firstText}>Last Name</div>
                <input
                  name="lastName"
                  value={state.lastName}
                  type="text"
                  placeholder="Last Name"
                  className={styles.nameInput}
                  onChange={handleChange}
                />
                {formErrors.lastName ? (
                  <span className={styles.redd}>{formErrors.lastName}</span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className={styles.nameArea}>
              <div className={styles.nameINer}>
                <div className={styles.firstText}>User Name</div>
                <input
                  name="userName"
                  value={state.userName}
                  type="text"
                  placeholder="User Name"
                  className={styles.nameInput}
                  onChange={handleChange}
                />
                {formErrors.userName ? (
                  <span className={styles.redd}>{formErrors.userName}</span>
                ) : (
                  ""
                )}
              </div>
              <div className={styles.lestInner}>
                <div className={styles.firstText}>Date of Birth</div>
                <input
                  name="dateOfBirth"
                  value={state.dateOfBirth}
                  type="date"
                  placeholder="DD.MM.YYYY"
                  className={styles.nameInput}
                  onChange={handleChange}
                />
                {formErrors.dateOfBirth ? (
                  <span className={styles.redd}>{formErrors.dateOfBirth}</span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className={styles.nameArea}>
              <div className={styles.lestInner}>
                <div className={styles.firstTextState}>State</div>
                <div className={styles.placesInput}>
                  <GooglePlacesAutocomplete
                    selectProps={{
                      value: address, // You should provide the value prop
                      onChange: (address) =>
                        setState({
                          ...state,
                          state: address.value.description,
                        }),
                    }}
                  />

                  {formErrors.state ? (
                    <span className={styles.redd}>{formErrors.state}</span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className={styles.lestInner}>
                <div className={styles.firstText}>Phone Number</div>
                <div>
                  <PhoneInput
                    className={`${styles.phoneInput}`}
                    international={true}
                    countryCallingCodeEditable={false}
                    useNationalFormatForDefaultCountryValue={true}
                    placeholder="Enter phone number"
                    onChange={(e) => {
                      if (e === undefined) {
                        console.log("e is undefined here");
                        return;
                      } else {
                        console.log("working");
                        console.log(e);
                        console.log(isValidPhoneNumber(e));
                        if (isValidPhoneNumber(e)) {
                          console.log(e);
                          setState({ ...state, phoneNumber: e });
                        } else {
                          setState({ ...state, phoneNumber: "" });
                          console.log(e);
                        }
                      }
                    }}
                  />
                  {formErrors.phoneNumber ? (
                    <span className={styles.redd}>
                      {formErrors.phoneNumber}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className={styles.emailArea}>
              <div className={styles.emailtext}>Email</div>
              <input
                name="email"
                value={state.email}
                type="text"
                placeholder="Type your email address"
                className={styles.emailInput}
                onChange={handleChange}
              />
              {formErrors.email ? (
                <span className={styles.redd}>{formErrors.email}</span>
              ) : (
                ""
              )}
            </div>
            <div className={styles.emailArea}>
              <div className={styles.emailtext}>Password</div>
              <div className={styles.relatie}>
                <input
                  name="password"
                  value={state.password}
                  type={show === true ? "text" : "password"}
                  placeholder="Choose a Password"
                  className={styles.emailInput}
                  onChange={handleChange}
                />{" "}
                <span
                  className={styles.abs}
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  {" "}
                  {show === true ? (
                    <AiFillEyeInvisible color="#e2703a" />
                  ) : (
                    <AiOutlineEye color="#e2703a" />
                  )}
                </span>
              </div>
              {formErrors.password ? (
                <span className={styles.redd}>{formErrors.password}</span>
              ) : (
                ""
              )}
            </div>
            <div className={styles.emailArea}>
              <div className={styles.emailtext}>Confirm Password</div>
              <div className={styles.relatie}>
                <input
                  name="confirmPassword"
                  value={state.confirmPassword}
                  type={show1 === true ? "text" : "password"}
                  placeholder="Confirm Password"
                  className={styles.emailInput}
                  onChange={handleChange}
                />{" "}
                <span
                  className={styles.abs}
                  onClick={() => {
                    setShow1(!show1);
                  }}
                >
                  {" "}
                  {show1 === true ? (
                    <AiFillEyeInvisible color="#e2703a" />
                  ) : (
                    <AiOutlineEye color="#e2703a" />
                  )}
                </span>
              </div>
              {formErrors.confirmPassword ? (
                <span className={styles.redd}>
                  {formErrors.confirmPassword}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className={styles.agreeArea}>
              <input
                type="checkbox"
                value={state.terms}
                onChange={(e) => {
                  setState({ ...state, terms: e.target.checked });
                }}
                className={styles.checkInput}
              />
              <div className={styles.agreeText}>
                I agree to terms and services{" "}
                <span style={{ color: "#00E5BE", textDecoration: "underline" }}>
                  click here
                </span>{" "}
                to read more
              </div>
            </div>{" "}
            <div className={`${styles.bot} pt-4`}>
              Do you have an account?
              <Link to="/login">
                <span style={{ color: "#00e5be" }}>Login</span>
              </Link>
            </div>
          </div>

          <button className={styles.signUpButton} onClick={handleFormSubmit}>
            {loading ? "Loading.." : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

Signup.propTypes = {
  register: propTypes.func.isRequired,
};

export default connect(null, { register })(Signup);
