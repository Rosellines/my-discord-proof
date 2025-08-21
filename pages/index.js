import { useState } from "react";

export default function Home() {
  const [proof, setProof] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDiscordLogin = () => {
    setLoading(true);

    // Simulasi generate proof
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

      {proof && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            background: "#f5f5f5",
            borderRadius: "8px",
            fontFamily: "monospace",
          }}
        >
          <h3>Dummy Proof Generated:</h3>
          <pre>{JSON.stringify(proof, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
