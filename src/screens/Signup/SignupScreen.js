import { useState } from "react";

//styles
import styles from "./Signup.module.css";

//custom hook
import UseSignUp from "../../customHooks/useSignUp";

const SignupScreen = () => {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpUserName, setSignUpUserName] = useState("");

  const { error, isPending, signUp } = UseSignUp();

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    signUp(signUpEmail, signUpPassword, signUpUserName);
  };

  return (
    <form className={styles["signup-form"]} onSubmit={handleSignUpSubmit}>
      <h2>SignUp</h2>
      <label>
        <span>Email</span>
        <input
          required
          type="email"
          value={signUpEmail}
          onChange={(e) => {
            setSignUpEmail(e.target.value);
          }}
        />
      </label>

      <label>
        <span>Password</span>
        <input
          required
          type="password"
          value={signUpPassword}
          onChange={(e) => {
            setSignUpPassword(e.target.value);
          }}
        />
      </label>

      <label>
        <span>User Name</span>
        <input
          required
          type="text"
          value={signUpUserName}
          onChange={(e) => {
            setSignUpUserName(e.target.value);
          }}
        />
      </label>
      {!isPending && <button>Signup</button>}
      {isPending && <button disabled>Loading...</button>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignupScreen;
