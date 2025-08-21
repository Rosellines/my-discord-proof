import { useState } from "react";

export default function Home() {
  const [verified, setVerified] = useState(false);

  const handleLogin = () => {
    // Simulasi proof generation
    setVerified(true);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f0f2f5"
    }}>
      <h1>Proof-of-Discord Identity</h1>
      <p>Simulate Discord membership verification</p>

      {!verified ? (
        <button
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#5865F2",
            color: "white",
            cursor: "pointer",
            marginTop: "20px"
          }}
        >
          Login with Discord
        </button>
      ) : (
        <div style={{
          marginTop: "20px",
          padding: "15px",
          borderRadius: "5px",
          backgroundColor: "#43b581",
          color: "white",
          fontWeight: "bold"
        }}>
          Success! You proved your Discord membership.
        </div>
      )}
    </div>
  );
}
