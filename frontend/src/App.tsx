import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home page</p>
            </Layout>
          }
        />

        <Route
          path="/register"
          element={
            <Layout>
               <Register />
            </Layout>
          }
        />  <Route
        path="/sign-in"
        element={
          <Layout>
             <Login />
          </Layout>
        }
      />
      </Routes>
    </Router>
  );
}

export default App;
