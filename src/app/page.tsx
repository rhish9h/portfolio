import TopBar from "@/components/topBar/TopBar";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <TopBar />
    </main>
  );
}
