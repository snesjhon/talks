import { useState } from "react";

/**
 * Form Actions
 * 1 - Register Fields & Log In
 * 2 - If loggedIn, show Logout
 * 3 - Show Error if not Valid
 */

export default function App() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="container">
      {isLoggedIn ? (
        <div>
          <p>we're validated</p>
          <button onClick={handleLogout}>log out</button>
        </div>
      ) : (
        <>
          {error !== "" && <div className="error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <label>
              name:
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
            <br />
            <label>
              password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>
        </>
      )}
    </div>
  );

  // Validate
  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await login({ userName, password });
      // setError("");
      setIsLoggedIn(true);
    } catch (error) {
      setError("Incorrect username or password!");
      setIsLoading(false);
      setUserName("");
      setPassword("");
    }
  }

  // Logout
  function handleLogout() {
    setIsLoggedIn(false);
    setUserName("");
    setPassword("");
    // setIsLoading(false);
    // setError("");
  }
}

// Helper Function
async function login({ userName, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userName === "jhon" && password === "pw") {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
}
