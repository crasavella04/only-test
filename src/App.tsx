import styles from "./App.module.scss";
import Main from "./components/Main/Main";
import { timeIntervals } from "./globals/timeIntervals";

const sortedTimeIntervals = timeIntervals.sort((a, b) => {
  return a.startInterval > b.startInterval ? 1 : -1;
});

function App() {
  return (
    <div className={styles.container}>
      <Main timeIntervals={sortedTimeIntervals} />
    </div>
  );
}

export default App;
