import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
//   import "./css/LoginStyles.css";
import * as Components from "./LoginStyledComponent.js";
import { Link, useNavigate } from "react-router-dom";
import classes from "./auth.module.css";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Redux/Actions/userActions";

function NewRegister() {
  const [signIn, toggle] = useState(true);
  const [signInInputs, setSignInInputs] = useState({
    username: "",
    password: "",
  });
  const [passwordView, setPasswordView] = useState(false);
  const [passwordViewTwo, setPasswordViewTwo] = useState(false);
  const [passwordViewThree, setPasswordViewThree] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    conform_password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { errorAlert, successAlert } = useSelector((state) => state.user);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setSignInInputs({ ...signInInputs, [name]: value });
    setPasswordErr(false);
  };

  const handleRegisterInputs = (e) => {
    const { name, value } = e.target;
    setPasswordErr(false);
    if (name === "phone") {
      let _sliced = value.slice(0, 10);
      setSignUpData({ ...signUpData, phone: _sliced });
    } else if (name === "name" || name === "email") {
      let _sliced = value.slice(0, 25);
      setSignUpData({ ...signUpData, [name]: _sliced });
    } else {
      setSignUpData({ ...signUpData, [name]: value });
    }
  };

  const handleSignIn = async (e) => {
    let body = { ...signInInputs };

    delete body.conform_password;
  };

  const handleSignUp = async (e) => {
    if (signUpData.password !== signUpData.conform_password) {
      setPasswordErr(true);
    } else {
      let body = { ...signUpData, role: "user" };

      delete body.conform_password;
      console.log(body);

      dispatch(registerUser(body, navigate));

      // let result = await registerAction(body);

      // if (result?.status === 201 || result?.status === 200) {
      //   dispatch(successState(result?.data?.message));
      // } else {
      //   dispatch(errorState(result?.data?.message));
      // }
    }
  };

  // useEffect(() => {
  //   if (successAlert) {
  //     setTimeout(() => {
  //       dispatch(successState(null));
  //       setSignUpData({
  //         name: "",
  //         email: "",
  //         phone: "",
  //         password: "",
  //         conform_password: "",
  //       });
  //       toggle(true);
  //     }, 3000);
  //   }
  // }, [successAlert]);

  return (
    <div
      data-aos="fade-down"
      data-aos-duration="700"
      className="scale-down-center"
    >
      <Box display={{ xs: "none", sm: "block", md: "block" }}>
        <Components.Container>
          <Components.SignUpContainer signingIn={signIn}>
            <Components.Form>
              <Components.Title style={{ marginTop: "15px" }}>
                {/* Create Account */}
              </Components.Title>
              <ValidatorForm
                useref="form"
                onSubmit={handleSignUp}
                className={classes.mysignupform}
              >
                <TextValidator
                  variant="outlined"
                  autoComplete="off"
                  fullWidth
                  placeholder="First Name"
                  className={`my-field`}
                  name={"firstName"}
                  value={signUpData.firstName}
                  size="normal"
                  onChange={handleRegisterInputs}
                  style={{ margin: "12px 0" }}
                  validators={["required"]}
                  errorMessages={["Name is required"]}
                  // inputRef={input1}
                  // onKeyPress={(e) => handleKeyPress(e, input2)}
                  InputProps={{
                    // Conditionally render input adornment
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaRegUser className={classes.input_icons} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextValidator
                  variant="outlined"
                  autoComplete="off"
                  fullWidth
                  id="emailInput"
                  placeholder="Last Name"
                  className={`my-field`}
                  name={"lastName"}
                  value={signUpData.lastName}
                  size="normal"
                  onChange={handleRegisterInputs}
                  style={{ margin: "12px 0" }}
                  validators={["required"]}
                  errorMessages={["Name is required"]}
                  // inputRef={input1}
                  // onKeyPress={(e) => handleKeyPress(e, input2)}
                  InputProps={{
                    // Conditionally render input adornment
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaRegUser className={classes.input_icons} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextValidator
                  variant="outlined"
                  autoComplete="off"
                  fullWidth
                  id="emailInput"
                  placeholder="Email"
                  className={`my-field`}
                  name={"email"}
                  value={signUpData.email}
                  size="normal"
                  onChange={handleRegisterInputs}
                  style={{ margin: "12px 0" }}
                  // inputRef={input2}
                  // onKeyPress={(e) => handleKeyPress(e, input3)}
                  InputProps={{
                    // Conditionally render input adornment
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdOutlineEmail className={classes.input_icons} />
                      </InputAdornment>
                    ),
                  }}
                  validators={["required", "isEmail"]}
                  errorMessages={["Email is required", "Enter valid email"]}
                />
                <TextValidator
                  variant="outlined"
                  autoComplete="off"
                  fullWidth
                  id="emailInput"
                  placeholder="Phone"
                  className={`my-field`}
                  name={"phone"}
                  value={signUpData.phone}
                  type="number"
                  size="normal"
                  onChange={handleRegisterInputs}
                  style={{ margin: "12px 0" }}
                  // inputRef={input2}
                  // onKeyPress={(e) => handleKeyPress(e, input3)}
                  InputProps={{
                    // Conditionally render input adornment
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdLocalPhone className={classes.input_icons} />
                      </InputAdornment>
                    ),
                  }}
                  validators={["required", "matchRegexp:^\\+?[1-9]\\d{9}$"]}
                  errorMessages={["Phone is required", "Enter valid phone"]}
                />
                <TextValidator
                  variant="outlined"
                  autoComplete="off"
                  fullWidth
                  className={classes.roleDropdown}
                  id="emailInput"
                  placeholder="Phone"
                  className={`my-field`}
                  name={"role"}
                  value={signUpData.role}
                  select
                  size="normal"
                  onChange={handleRegisterInputs}
                  style={{ margin: "12px 0" }}
                  validators={["required"]}
                  errorMessages={["Role is required"]}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="guest">Guest</MenuItem>
                </TextValidator>
                <TextValidator
                  type={passwordViewTwo ? "text" : "password"}
                  variant="outlined"
                  autoComplete="off"
                  fullWidth
                  id="emailInput"
                  placeholder="Password"
                  className={`my-field`}
                  name={"password"}
                  value={signUpData.password}
                  size="normal"
                  onChange={handleRegisterInputs}
                  style={{ margin: "12px 0" }}
                  // inputRef={input2}
                  // onKeyPress={(e) => handleKeyPress(e, input3)}
                  InputProps={{
                    // Conditionally render input adornment
                    startAdornment: (
                      <InputAdornment position="start">
                        <RiLockPasswordFill className={classes.input_icons} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment
                        position="start"
                        onClick={() => setPasswordViewTwo(!passwordViewTwo)}
                      >
                        {passwordViewTwo ? (
                          <IoEyeOutline className={classes.eye_icons} />
                        ) : (
                          <FaRegEyeSlash className={classes.eye_icons} />
                        )}
                      </InputAdornment>
                    ),
                  }}
                  validators={[
                    "required",
                    "matchRegexp:^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
                  ]}
                  errorMessages={[
                    "Password is required",
                    "Please enter strong password",
                  ]}
                />
                <TextValidator
                  type={passwordViewThree ? "text" : "password"}
                  variant="outlined"
                  autoComplete="off"
                  fullWidth
                  id="emailInput"
                  placeholder="Confirm Password"
                  className={`my-field`}
                  name={"conform_password"}
                  value={signUpData.conform_password}
                  size="normal"
                  onChange={handleRegisterInputs}
                  style={{ margin: "12px 0" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <RiLockPasswordFill className={classes.input_icons} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment
                        position="start"
                        onClick={() => setPasswordViewThree(!passwordViewThree)}
                      >
                        {passwordViewThree ? (
                          <IoEyeOutline className={classes.eye_icons} />
                        ) : (
                          <FaRegEyeSlash className={classes.eye_icons} />
                        )}
                      </InputAdornment>
                    ),
                  }}
                  helperText={passwordErr && "Password doesn't match"}
                  error={passwordErr}
                />

                <Box mt={2} textAlign={"center"}>
                  <Button className={classes.register_btn} type="submit">
                    Sign Up
                  </Button>
                </Box>
                {/* <Typography className={classes.already_acc}>
                  Already have an account ?{" "}
                  <span onClick={() => navigate("/login")}>Login</span>
                </Typography> */}
              </ValidatorForm>
            </Components.Form>
          </Components.SignUpContainer>
          <Components.SignInContainer signingIn={signIn}>
            <Components.Form>
              <Components.Title>Sign in</Components.Title>
              <ValidatorForm useref="form" onSubmit={handleSignIn}>
                <TextValidator
                  variant="outlined"
                  autoComplete="off"
                  fullWidth
                  id="emailInput"
                  placeholder="Email or phone"
                  className={`my-field`}
                  name={"username"}
                  value={signInInputs.username}
                  size="normal"
                  onChange={handleInputs}
                  style={{ margin: "12px 0" }}
                  validators={["required"]}
                  errorMessages={["Email or phone is required"]}
                  // inputRef={input1}
                  // onKeyPress={(e) => handleKeyPress(e, input2)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaRegUser className={classes.input_icons} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextValidator
                  type={passwordView ? "text" : "password"}
                  variant="outlined"
                  autoComplete="off"
                  fullWidth
                  id="emailInput"
                  placeholder="Password"
                  className={`my-field`}
                  name={"password"}
                  value={signInInputs.password}
                  size="normal"
                  onChange={handleInputs}
                  style={{ margin: "12px 0" }}
                  // inputRef={input2}
                  // onKeyPress={(e) => handleKeyPress(e, input3)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <RiLockPasswordFill className={classes.input_icons} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment
                        position="start"
                        onClick={() => setPasswordView(!passwordView)}
                      >
                        {passwordView ? (
                          <IoEyeOutline className={classes.eye_icons} />
                        ) : (
                          <FaRegEyeSlash className={classes.eye_icons} />
                        )}
                      </InputAdornment>
                    ),
                  }}
                  validators={["required"]}
                  errorMessages={["Password is required"]}
                />
                <Box mt={2} textAlign={"center"}>
                  <Button className={classes.register_btn} type="submit">
                    Login
                  </Button>
                </Box>
                {/* <Typography className={classes.already_acc}>
                  Already have an account ?{" "}
                  <span onClick={() => navigate("/register")}>Sign Up</span>
                </Typography> */}
              </ValidatorForm>
            </Components.Form>
          </Components.SignInContainer>
          <Components.OverlayContainer signingIn={signIn}>
            <Components.Overlay signingIn={signIn}>
              <Components.LeftOverlayPanel signingIn={signIn}>
                <Components.Title>Welcome Back!</Components.Title>
                <Components.Paragraph>
                  To keep connected with us please login with your personal info
                </Components.Paragraph>
                <Components.GhostButton
                  onClick={() => {
                    setSignUpData({
                      name: "",
                      email: "",
                      phone: "",
                      password: "",
                      conform_password: "",
                    });
                    toggle(true);
                  }}
                >
                  Sign In
                </Components.GhostButton>
              </Components.LeftOverlayPanel>
              <Components.RightOverlayPanel signingIn={signIn}>
                <Components.Title>Hello, Friend!</Components.Title>
                <Components.Paragraph>
                  Enter your personal details and start journey with us
                </Components.Paragraph>
                <Components.GhostButton
                  onClick={() => {
                    toggle(false);
                    setSignInInputs({
                      ...signInInputs,
                      username: "",
                      password: "",
                    });
                  }}
                >
                  Sign Up
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
      </Box>
      <Box display={{ xs: "block", sm: "none", md: "none" }}>
        {/* <Components.SignInContainer signingIn={signIn}> */}
        {signIn ? (
          <Components.Form>
            <Components.Title>Sign in</Components.Title>
            <ValidatorForm useref="form" onSubmit={handleSignIn}>
              <TextValidator
                variant="outlined"
                autoComplete="off"
                fullWidth
                id="emailInput"
                placeholder="Email or phone"
                className={`my-field`}
                name={"username"}
                value={signInInputs.username}
                size="normal"
                onChange={handleInputs}
                style={{ margin: "12px 0" }}
                validators={["required"]}
                errorMessages={["Email or phone is required"]}
                // inputRef={input1}
                // onKeyPress={(e) => handleKeyPress(e, input2)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaRegUser className={classes.input_icons} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextValidator
                type={passwordView ? "text" : "password"}
                variant="outlined"
                autoComplete="off"
                fullWidth
                id="emailInput"
                placeholder="Password"
                className={`my-field`}
                name={"password"}
                value={signInInputs.password}
                size="normal"
                onChange={handleInputs}
                style={{ margin: "12px 0" }}
                // inputRef={input2}
                // onKeyPress={(e) => handleKeyPress(e, input3)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <RiLockPasswordFill className={classes.input_icons} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position="start"
                      onClick={() => setPasswordView(!passwordView)}
                    >
                      {passwordView ? (
                        <IoEyeOutline className={classes.eye_icons} />
                      ) : (
                        <FaRegEyeSlash className={classes.eye_icons} />
                      )}
                    </InputAdornment>
                  ),
                }}
                validators={["required"]}
                errorMessages={["Password is required"]}
              />

              <Box mt={2} textAlign={"center"}>
                <Button className={classes.register_btn} type="submit">
                  Login
                </Button>
              </Box>
              <Typography className={classes.already_acc} mt={2}>
                Create an Account ?{" "}
                <span onClick={() => toggle(false)}>Sign Up</span>
              </Typography>
            </ValidatorForm>
          </Components.Form>
        ) : (
          <Components.Form>
            <Components.Title style={{ marginTop: "15px" }}>
              Create Account
            </Components.Title>
            <ValidatorForm useref="form" onSubmit={handleSignUp}>
              <TextValidator
                variant="outlined"
                autoComplete="off"
                fullWidth
                id="emailInput"
                placeholder="Name"
                className={`my-field`}
                name={"name"}
                value={signUpData.name}
                size="normal"
                onChange={handleRegisterInputs}
                style={{ margin: "12px 0" }}
                validators={["required"]}
                errorMessages={["Name is required"]}
                // inputRef={input1}
                // onKeyPress={(e) => handleKeyPress(e, input2)}
                InputProps={{
                  // Conditionally render input adornment
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaRegUser className={classes.input_icons} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextValidator
                variant="outlined"
                autoComplete="off"
                fullWidth
                id="emailInput"
                placeholder="Email"
                className={`my-field`}
                name={"email"}
                value={signUpData.email}
                size="normal"
                onChange={handleRegisterInputs}
                style={{ margin: "12px 0" }}
                // inputRef={input2}
                // onKeyPress={(e) => handleKeyPress(e, input3)}
                InputProps={{
                  // Conditionally render input adornment
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdOutlineEmail className={classes.input_icons} />
                    </InputAdornment>
                  ),
                }}
                validators={["required", "isEmail"]}
                errorMessages={["Email is required", "Enter valid email"]}
              />
              <TextValidator
                variant="outlined"
                autoComplete="off"
                fullWidth
                id="emailInput"
                placeholder="Phone"
                className={`my-field`}
                name={"phone"}
                value={signUpData.phone}
                size="normal"
                onChange={handleRegisterInputs}
                style={{ margin: "12px 0" }}
                // inputRef={input2}
                // onKeyPress={(e) => handleKeyPress(e, input3)}
                InputProps={{
                  // Conditionally render input adornment
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdLocalPhone className={classes.input_icons} />
                    </InputAdornment>
                  ),
                }}
                validators={["required", "matchRegexp:^\\+?[1-9]\\d{9}$"]}
                errorMessages={["Phone is required", "Enter valid phone"]}
              />
              <TextValidator
                type={passwordViewTwo ? "text" : "password"}
                variant="outlined"
                autoComplete="off"
                fullWidth
                id="emailInput"
                placeholder="Password"
                className={`my-field`}
                name={"password"}
                value={signUpData.password}
                size="normal"
                onChange={handleRegisterInputs}
                style={{ margin: "12px 0" }}
                // inputRef={input2}
                // onKeyPress={(e) => handleKeyPress(e, input3)}
                InputProps={{
                  // Conditionally render input adornment
                  startAdornment: (
                    <InputAdornment position="start">
                      <RiLockPasswordFill className={classes.input_icons} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position="start"
                      onClick={() => setPasswordViewTwo(!passwordViewTwo)}
                    >
                      {passwordViewTwo ? (
                        <IoEyeOutline className={classes.eye_icons} />
                      ) : (
                        <FaRegEyeSlash className={classes.eye_icons} />
                      )}
                    </InputAdornment>
                  ),
                }}
                validators={[
                  "required",
                  "matchRegexp:^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
                ]}
                errorMessages={[
                  "Password is required",
                  "Please enter strong password",
                ]}
              />
              <TextValidator
                type={passwordViewThree ? "text" : "password"}
                variant="outlined"
                autoComplete="off"
                fullWidth
                id="emailInput"
                placeholder="Confirm Password"
                className={`my-field`}
                name={"conform_password"}
                value={signUpData.conform_password}
                size="normal"
                onChange={handleRegisterInputs}
                style={{ margin: "12px 0" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <RiLockPasswordFill className={classes.input_icons} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position="start"
                      onClick={() => setPasswordViewThree(!passwordViewThree)}
                    >
                      {passwordViewThree ? (
                        <IoEyeOutline className={classes.eye_icons} />
                      ) : (
                        <FaRegEyeSlash className={classes.eye_icons} />
                      )}
                    </InputAdornment>
                  ),
                }}
                helperText={passwordErr && "Password doesn't match"}
                error={passwordErr}
              />

              <Box mt={2} textAlign={"center"}>
                <Button className={classes.register_btn} type="submit">
                  Sign Up
                </Button>
              </Box>
              <Typography className={classes.already_acc}>
                Already have an account ?{" "}
                <span onClick={() => toggle(true)}>Login</span>
              </Typography>
            </ValidatorForm>
          </Components.Form>
        )}
        {/* </Components.SignInContainer> */}
      </Box>
    </div>
  );
}

export default NewRegister;
