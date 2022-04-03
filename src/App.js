import SignUp from "./components/SignUp/SignUp";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./components/context/AuthContext.js";
import { Route, useHistory } from "react-router-dom";
import Login from "./components/SignUp/Login";
import Home from "./components/Home/Home";
import { useEffect } from "react";
import "./App.css";

function App() {
  const history = useHistory();
  useEffect(() => {
    if (history.location.pathname === "/") {
      history.push("/signup");
    }
  }, []);
  return (
    <div className="mainBackground">
      <AuthProvider>
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <Route path="/signup">
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <SignUp />
            </div>
          </Route>
          <Route path="/login">
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <Login />
            </div>
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Container>
      </AuthProvider>
    </div>
  );
}

export default App;
