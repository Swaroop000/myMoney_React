import React from "react";
import { Link } from "react-router-dom";

//styles
import styles from "./NavBar.module.css";

//custom hook
import UseLogOut from "../../customHooks/useLogOut";
import { useAuthContext } from "../../customHooks/useAuthContext";

const NavBar = () => {
  const { logOut } = UseLogOut();
  const { user } = useAuthContext();

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>
          <Link to="/">MyMoney</Link>
        </li>
        {!user && (
          <React.Fragment>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            <li>Hello, {user.displayName}</li>

            <li>
              <button className="btn-red" onClick={logOut}>
                Logout
              </button>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;

// {!user && (
//   <React.Fragment>
//     <li>
//       <Link to="/login">Login</Link>
//     </li>
//     <li>
//       <Link to="/signup">Signup</Link>
//     </li>
//   </React.Fragment>
// )}

// {user && (
//   <React.Fragment>
//     <li>Hello, {user}</li>

//     <li>
//       <button className="btn-red" onClick={logOut}>
//         Logout
//       </button>
//     </li>
//   </React.Fragment>
// )}
