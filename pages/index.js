import { useState } from "react";
import styles from "../styles/Home.module.css"; // kita buat CSS module

export default function Home() {
  const [proof, setProof] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDiscordLogin = () => {
    setLoading(true);
    setShowModal(true);

    setTimeout(() => {
      const dummyProof = {
        user: "Rosellines#0001",
        discordId: "1289133727443582988",
        membership: "verified",
        proof: "0xFAKEZKPROOF1234567890",
        timestamp: new Date().toISOString(),
      };
      setProof(dummyProof);
      setLoading(false);
    }, 1500);
  };

  const copyProof = () => {
    navigator.clipboard.writeText(JSON.stringify(proof, null, 2));
    alert("Proof copied!");
  };

  return (
    <div className={styles.container}>
      <h1>Discord Identity PoC</h1>

      <button
        className={styles.discordButton}
        onClick={handleDiscordLogin}
        disabled={loading}
      >
        {loading ? "Generating proof..." : "Login with Discord"}
      </button>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Dummy Proof Generated</h2>
            {loading ? (
              <p>Loading proof...</p>
            ) : (
              <>
                <pre>{JSON.stringify(proof, null, 2)}</pre>
                <button className={styles.copyButton} onClick={copyProof}>
                  Copy Proof
                </button>
              </>
            )}
            <button
              className={styles.closeButton}
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
