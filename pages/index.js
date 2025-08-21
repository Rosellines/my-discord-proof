import { useState } from "react";

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
    alert("Proof copied to clipboard!");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Discord Identity PoC</h1>
      <p>Prove your Discord membership without revealing private info.</p>

      <button
        onClick={handleDiscordLogin}
        style={{
          padding: "1rem 2rem",
          background: "#7289da",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "1rem",
        }}
      >
        {loading ? "Generating proof..." : "Login with Discord"}
      </button>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "10px",
              width: "90%",
              maxWidth: "500px",
              textAlign: "center",
            }}
          >
            <h2>Dummy Proof Generated</h2>
            {loading ? (
              <p>Loading proof...</p>
            ) : (
              <>
                <pre
                  style={{
                    textAlign: "left",
                    background: "#f5f5f5",
                    padding: "1rem",
                    borderRadius: "6px",
                    fontFamily: "monospace",
                    overflowX: "auto",
                  }}
                >
                  {JSON.stringify(proof, null, 2)}
                </pre>
                <button
                  onClick={copyProof}
                  style={{
                    marginTop: "1rem",
                    padding: "0.5rem 1rem",
                    background: "#43b581",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Copy Proof
                </button>
              </>
            )}
            <button
              onClick={() => setShowModal(false)}
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                background: "#f04747",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                marginLeft: "0.5rem",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
