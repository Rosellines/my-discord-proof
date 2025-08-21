import { useState } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [proof, setProof] = useState(null);

  const handleLogin = () => {
    // Dummy flow: langsung set login
    setLoggedIn(true);
    setProof("DummyProof_123xyz");
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
      background: "#0f172a", 
      color: "#f1f5f9"
    }}>
      <h1>Proof-of-Discord Identity</h1>
      {!loggedIn ? (
        <button 
          onClick={handleLogin} 
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            background: "#5865F2",
            color: "white",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Login with Discord
        </button>
      ) : (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h2>✅ Logged in!</h2>
          <p>Generated Proof (dummy):</p>
          <code style={{ background: "#1e293b", padding: "6px 10px", borderRadius: "6px" }}>
            {proof}
          </code>
        </div>
      )}
    </div>
  );
}
