import { useEffect, useState } from "react";

//firebase services
import { projectAuth } from "../firebase/config";

//custom hook
import { useAuthContext } from "../customHooks/useAuthContext";

const UseLogOut = () => {
  const [isAborted, setIsAborted] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logOut = async () => {
    setError(null);
    setIsPending(true);

    //sign out the user
    try {
      await projectAuth.signOut();

      //dispatch logout action
      dispatch({ type: "LOGOUT" }); //payload becomes null, hence no payload

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

  return { error, isPending, logOut };
};

export default UseLogOut;
