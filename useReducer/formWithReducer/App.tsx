import { useState, useReducer } from "react";

/**
 * Form Actions
 * 1 - Register Fields & Log In
 *   state: Initial
 * 2 - If loggedIn, show Logout
 *   state: Logged In
 * 3 - Show Error if not Valid
 *   state: Error
 */

const initialState = {
  userName: "",
  password: "",
  error: "",
  isLoading: false,
  isLoggedIn: false,
};

const reducer = (state, actions) => {
  switch (actions.type) {
    case "initial": {
      return initialState;
    }
    case "field": {
      return {
        ...state,
        [actions.fieldName]: actions.payload,
      };
    }
    case "loading":
      return {
        ...state,
        error: "",
        isLoading: true,
      };
    case "loggedIn": {
      return {
        ...initialState,
        isLoggedIn: true,
      };
    }
    case "error": {
      return {
        ...state,
        error: "Error in Form",
        isLoading: false,
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { userName, password, error, isLoading, isLoggedIn } = state;
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    fieldName: "userName",
                    payload: e.target.value,
                  })
                }
              />
            </label>
            <br />
            <label>
              password:
              <input
                type="password"
                value={password}
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    fieldName: "password",
                    payload: e.target.value,
                  })
                }
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

    dispatch({ type: "loading" });
    // setIsLoading(true);

    try {
      await login({ userName, password });
      dispatch({ type: "loggedIn" });
      // setError("");
      // setIsLoggedIn(true);
    } catch (error) {
      dispatch({ type: "error" });
      // setError("Incorrect username or password!");
      // setIsLoading(false);
      // setUserName("");
      // setPassword("");
    }
  }

  // Logout
  function handleLogout() {
    dispatch({ type: "initial" });
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
