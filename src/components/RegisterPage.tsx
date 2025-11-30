import { useState } from "react";

export default function RegisterPage({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleRegister() {
    setError("");
    setSuccess("");

    const res = await fetch("http://localhost/online-survey-api/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      setSuccess("Account created! You can now login.");
      setEmail("");
      setPassword("");
    } else {
      setError("Registration failed. Email might already exist.");
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Student Survey Portal</h1>
        <h2 style={styles.subtitle}>Register</h2>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleRegister}>
          Create Account
        </button>

        <p style={styles.linkText}>
          Already have an account?{" "}
          <a href="#" onClick={onBack}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f2f5",
  },
  card: {
    width: "400px",
    background: "white",
    padding: "32px",
    borderRadius: "12px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: { fontSize: "26px", marginBottom: "10px" },
  subtitle: { fontSize: "20px", marginBottom: "20px" },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  linkText: {
    marginTop: "16px",
    fontSize: "14px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  success: {
    color: "green",
    marginBottom: "10px",
  },
};
