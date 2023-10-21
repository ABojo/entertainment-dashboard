"use client";

import styles from "./layout.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.main}>
      <Sidebar />
      <div className={styles.content}>{children}</div>
    </main>
  );
}
