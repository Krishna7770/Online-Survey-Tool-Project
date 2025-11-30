import { useState } from "react";

export default function LoginPage({
  onLogin,
}: {
  onLogin: (mode?: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");

    const res = await fetch("http://localhost/online-survey-api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userid", data.userid);
      onLogin(); // tell App.tsx we are now logged in
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Student Survey Portal</h1>
        <h2 style={styles.subtitle}>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

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

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <p style={styles.linkText}>
          Don’t have an account?{" "}
          <a href="#" onClick={() => onLogin("register")}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, any> = {
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f2f5"
  },
  card: {
    width: "400px",
    background: "white",
    padding: "32px",
    borderRadius: "12px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  title: { fontSize: "26px", marginBottom: "10px" },
  subtitle: { fontSize: "20px", marginBottom: "20px" },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px"
  },
  linkText: {
    marginTop: "16px",
    fontSize: "14px"
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px"
  }
};
