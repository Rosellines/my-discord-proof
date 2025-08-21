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
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#36393f",
        color: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Helvetica, Arial, sans-serif",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      <h1 style={{ marginBottom: "2rem" }}>Discord Identity PoC</h1>

      <button
        onClick={handleDiscordLogin}
        style={{
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          backgroundColor: "#5865f2", // Discord blurple
          color: "white",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          transition: "transform 0.1s",
        }}
        onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
        onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
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
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#2f3136",
              padding: "2rem",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "500px",
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            <h2 style={{ marginBottom: "1rem" }}>Dummy Proof Generated</h2>
            {loading ? (
              <p>Loading proof...</p>
            ) : (
              <>
                <pre
                  style={{
                    textAlign: "left",
                    background: "#202225",
                    padding: "1rem",
                    borderRadius: "8px",
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
                    backgroundColor: "#43b581", // green Discord button
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
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
                backgroundColor: "#f04747", // red Discord button
                color: "white",
                border: "none",
                borderRadius: "8px",
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
