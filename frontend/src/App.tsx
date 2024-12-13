import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAppContext } from "./contexts/AppContext";
import AddHotels from "./pages/AddHotels";

function App() {
  const {isLoggedIn} = useAppContext();
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
        />{" "}
        <Route
          path="/sign-in"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        {isLoggedIn && (
          <>
          <Route
          path="/add-hotel"
          element={
            <Layout>
              <AddHotels />
            </Layout>
          }
        />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
