import { useState, useEffect, useReducer } from "react";

//firebase services
import { projectAuth, projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        document: null,
        isPending: true,
        error: null,
        success: false,
      };

    case "ERROR":
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false,
      };

    case "ADDED_DOC":
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };

    default:
      return state;
  }
};

const UseFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isAborted, setIsAborted] = useState(false);

  //collection ref
  const refCollection = projectFirestore.collection(collection);

  // only dispatch if not aborted
  const dispatchIfNotAborted = (action) => {
    if (!isAborted) {
      dispatch(action);
    }
  };

  //add new document
  const addDoc = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDoc = await refCollection.add({ ...doc, createdAt });

      dispatchIfNotAborted({ type: "ADDED_DOC", payload: addedDoc });
    } catch (err) {
      dispatchIfNotAborted({ type: "ERROR", payload: err.message });
    }
  };

  //delete a document
  const deleteDoc = async (id) => {};

  useEffect(() => {
    return () => {
      setIsAborted(true);
    };
  }, []);

  return { response, addDoc, deleteDoc };
};

export default UseFirestore;
