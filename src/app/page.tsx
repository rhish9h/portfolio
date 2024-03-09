import TopBar from "@/components/topBar/TopBar";
import styles from "./page.module.css";
import HomePage from "@/components/homePage/HomePage";

export default function Home() {
  return (
    <main className={styles.main}>
      <TopBar />
      <HomePage />
    </main>
  );
}
