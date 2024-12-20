import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAppContext } from "./contexts/AppContext";
import AddHotels from "./pages/AddHotels";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotels";
import Search from "./pages/Seacrh";
import Details from "./pages/Details";
import HomePage from "./pages/Home";
import Booking from "./pages/Booking";
import Home from "./pages/Home";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
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
           <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
          <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <Details />
            </Layout>
          }
        />
        {isLoggedIn && (
          <>
           <Route
              path="/hotel/:hotelId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotels />
                </Layout>
              }
            />

            <Route
              path="/edit-hotels/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
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
