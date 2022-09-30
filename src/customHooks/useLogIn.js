import { useEffect, useState } from "react";

//firebase services
import { projectAuth } from "../firebase/config";

//custom hook
import { useAuthContext } from "../customHooks/useAuthContext";

const UseLogIn = () => {
  const [isAborted, setIsAborted] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logIn = async (email, password) => {
    setError(null);
    setIsPending(true);

    //sign in the user
    try {
      const response = await projectAuth.signInWithEmailAndPassword(
        email,
        password
      );

      //dispatch login action
      dispatch({ type: "LOGIN", payload: response.user });

      //update this state
      if (!isAborted) {
        setIsPending(false);
        setError(null);
      }

      ///////////////////
    } catch (err) {
      if (!isAborted) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsAborted(true);
    };
  }, []);

  return { error, isPending, logIn };
};

export default UseLogIn;
