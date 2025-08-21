import { useMemo, useState } from "react";
import styles from "../styles/Home.module.css";

function sha256(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  return crypto.subtle.digest("SHA-256", data).then(buf => {
    return Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  });
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("Rosellines#0001");
  const [discordId, setDiscordId] = useState("1289133727443582988");
  const [nonce, setNonce] = useState("");
  const [proof, setProof] = useState(null);
  const [error, setError] = useState("");

  const maskedId = useMemo(() => {
    if (!discordId) return "";
    return discordId.slice(0, 4) + "…" + discordId.slice(-4);
  }, [discordId]);

  const doFakeLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const ts = new Date().toISOString();
      const n = nonce || crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
      const payload = JSON.stringify({ user: username, discordId, ts, nonce: n });
      const digest = await sha256(payload);
      const proofObj = {
        type: "POI::DISCORD_DUMMY",
        payload: { user: username, discordId, ts, nonce: n },
        digest
      };
      setProof(proofObj);
      setShowModal(true);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard");
    } catch {
      // no-op
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <img src="/discord-logo.png" alt="Discord" width="28" height="28" />
          <div>
            <div className={styles.title}>Proof-of-Discord Identity (Dummy)</div>
            <div className={styles.subtitle}>
              Generate a non-binding, local-only proof object for Soundness vApp mockups.
            </div>
          </div>
        </div>

        <div className={styles.kv}>
          <label>Username</label>
          <input className={styles.input} value={username} onChange={e => setUsername(e.target.value)} />
          <label>Discord ID</label>
          <input className={styles.input} value={discordId} onChange={e => setDiscordId(e.target.value)} />
          <label>Nonce</label>
          <input className={styles.input} placeholder="(auto if empty)"
                 value={nonce} onChange={e => setNonce(e.target.value)} />
        </div>

        <div className={styles.actions}>
          <button className={styles.button} onClick={doFakeLogin} disabled={loading}>
            {loading ? "Generating…" : "Login with Discord (Dummy)"}
          </button>
          <button className={`${styles.button} ${styles.secondary}`} onClick={() => { setShowModal(true); }} disabled={!proof}>
            Show Proof
          </button>
        </div>

        {proof && (
          <div className={styles.proofBox}>
            <div><strong>Digest</strong>: {proof.digest.slice(0, 16)}…</div>
            <div className={styles.footer}>User: {username} ({maskedId})</div>
          </div>
        )}

        <div className={styles.footer}>
          This demo does not perform real OAuth and never leaves your browser.
          For a real integration, set up Discord OAuth2 and sign a structured payload.
        </div>
      </div>

      {showModal && (
        <div className={styles.modalBackdrop} onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div className={styles.title}>Generated Proof</div>
              <button className={styles.closeButton} onClick={() => setShowModal(false)}>Close</button>
            </div>

            {!proof && <div className={styles.help}>No proof yet. Click “Login with Discord (Dummy)”.</div>}

            {proof && (
              <>
                <div className={styles.help}>Copy and paste this JSON into your vApp prototype.</div>
                <div className={styles.copyRow}>
                  <pre className={styles.code}>{JSON.stringify(proof, null, 2)}</pre>
                </div>
                <div className={styles.actions}>
                  <button className={styles.button} onClick={() => copy(JSON.stringify(proof))}>Copy JSON</button>
                  <button className={`${styles.button} ${styles.secondary}`} onClick={() => copy(proof.digest)}>
                    Copy Digest
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
