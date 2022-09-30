import { useState, useEffect } from "react";

//firebase services
import { projectAuth } from "../firebase/config";

//custom hook
import { useAuthContext } from "../customHooks/useAuthContext";

const UseSignUp = () => {
  const [isAborted, setIsAborted] = useState(false);

  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signUp = async (email, password, userName) => {
    setError(null);
    setIsPending(true);

    try {
      //signup user
      const response = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!response) {
        throw new Error(
          "Something went wrong :( Could not complete signup process. Please try again!"
        );
      }

      //add display name to user
      await response.user.updateProfile({ displayName: userName });

      //dispatch login action
      dispatch({ type: "LOGIN", payload: response.user });

      //update this state
      if (!isAborted) {
        setIsPending(false);
        setError(null);
      }

      ////////////////////////
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

  return { error, isPending, signUp };
};

export default UseSignUp;
