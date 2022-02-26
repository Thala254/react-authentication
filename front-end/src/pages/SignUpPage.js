import { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { useToken } from "../auth/useToken";

export default function SignUpPage() {
  const [, setToken] = useToken();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const onSignUpClicked = async () => {
    try {
      const response = await axios.post("/api/signup", {
        email: emailValue,
        password: passwordValue,
      });
      const { token } = response.data;
      setToken(token);
      history.push("/please-verify");
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <div className="content-container">
      <h1>Sign Up</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input
        type="email"
        placeholder="Email"
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPasswordValue}
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
      />

      <hr />
      <button
        disabled={
          !emailValue ||
          !passwordValue ||
          passwordValue !== confirmPasswordValue
        }
        onClick={onSignUpClicked}
      >
        Sign Up
      </button>
      <button onClick={() => history.push("/login")}>
        Already have an account ? Log In
      </button>
    </div>
  );
}
