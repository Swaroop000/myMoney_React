import { useState } from "react";

//styles
import styles from "./Login.module.css";

//custom hook
import UseLogIn from "../../customHooks/useLogIn";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, isPending, logIn } = UseLogIn();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    logIn(email, password);
  };

  return (
    <form onSubmit={handleLoginSubmit} className={styles["login-form"]}>
      <h2>Login</h2>
      <label>
        <span>Email</span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        <span>Password </span>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      {!isPending && <button>Login</button>}
      {isPending && <button disabled>Loading...</button>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginScreen;
