import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./components/style.css";

import { BrowserRouter as Router } from "react-router-dom";

import RouteConfig from "./components/RouteConfig";
import { ToastContainer } from "react-toastify";
import { UserContext } from "./components/UserContext";

function App() {
  return (
    <div className="App">
      <main>
        <UserContext>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            theme="colored"
          />

          <Router>
            <RouteConfig />
          </Router>
        </UserContext>{" "}
      </main>
    </div>
  );
}

export default App;
