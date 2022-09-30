import { useState } from "react";

//custom hook
import UseFirestore from "../../customHooks/useFirestore";

const TransactionForm = ({ uid }) => {
  const [transactionName, setTransactionName] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");

  const { response, addDoc, deleteDoc } = UseFirestore("Transactions");

  const handleTransactionSubmit = (e) => {
    e.preventDefault();

    addDoc({ uid, transactionName, transactionAmount });
  };

  return (
    <>
      <h3>Add a transaction</h3>
      <form onSubmit={handleTransactionSubmit}>
        <label>
          <span>Transaction name: </span>
          <input
            required
            type="text"
            value={transactionName}
            onChange={(e) => setTransactionName(e.target.value)}
          />
        </label>

        <label>
          <span>Transaction amount: </span>
          <input
            required
            type="number"
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(e.target.value)}
          />
        </label>

        <button>Add</button>
      </form>
    </>
  );
};

export default TransactionForm;
