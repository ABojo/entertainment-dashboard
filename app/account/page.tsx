"use client";

import { useState, useEffect } from "react";
import styles from "./account.module.scss";
import apiClient from "../../utils/apiClient";
import { User } from "@prisma/client";
import Loader from "../../components/Loader/Loader";
import LazyImage from "../../components/LazyImage/LazyImage";
import { useRouter } from "next/navigation";

export default function Account() {
  const router = useRouter();
  const [profileData, setProfileData] = useState<User | null>(null);

  useEffect(() => {
    (async function () {
      const profile = await apiClient.getMyAccount();
      setProfileData(profile);
    })();
  }, []);

  return (
    <main className={styles.container}>
      {profileData ? (
        <>
          <div className={styles.container__head}>
            <div className={styles.container__img}>
              <LazyImage src="/images/image-avatar.png" alt="" />
            </div>
            <h1>{profileData?.username.toUpperCase()}</h1>
          </div>
          <button
            className={styles.container__logout}
            onClick={async () => {
              await apiClient.logout();
              router.refresh();
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <Loader absoluteCenter />
      )}
    </main>
  );
}
