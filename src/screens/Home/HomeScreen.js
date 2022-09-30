//styles
import styles from "./Home.module.css";

//screens
import TransactionForm from "./TransactionForm";

// custom hook
import { useAuthContext } from "../../customHooks/useAuthContext";

const HomeScreen = () => {
  const { user } = useAuthContext;

  return (
    <div className={styles.container}>
      <div className={styles.content}>Transaction List</div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
};

export default HomeScreen;
