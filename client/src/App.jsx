import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchBus from "./pages/SearchBus";
import BusDetails from "./pages/BusDetails";
import MyBookings from "./pages/MyBookings";
import ProtectedRoute from "./components/ProtectedRoute";
import OperatorDashboard from "./pages/OperatorDashboard";
import AddBus from "./pages/AddBus";
import MyBuses from "./pages/MyBuses";
import EditBus from "./pages/EditBus";
import AdminDashboard from "./pages/AdminDashboard";
import PendingOperators from "./pages/PendingOperators";
import AllUsers from "./pages/AllUsers";
import AllOperators from "./pages/AllOperators";
import AllBuses from "./pages/AllBuses";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchBus />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bus/:id" element={<BusDetails />} />

        {/* Traveller */}

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* Operator */}

        <Route
          path="/operator/dashboard"
          element={
            <ProtectedRoute>
              <OperatorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/operator/add-bus"
          element={
            <ProtectedRoute>
              <AddBus />
            </ProtectedRoute>
          }
        />

        <Route
          path="/operator/my-buses"
          element={
            <ProtectedRoute>
              <MyBuses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/operator/edit-bus/:id"
          element={
            <ProtectedRoute>
              <EditBus />
            </ProtectedRoute>
          }
        />

        {/* Admin */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
            path="/admin/pending-operators"
            element={
                <ProtectedRoute>
                    <PendingOperators />
                </ProtectedRoute>
            }
        />
        <Route
          path="/admin/users"
          element={
              <ProtectedRoute>
                  <AllUsers />
              </ProtectedRoute>
          }
          />
           <Route
                    path="/admin/operators"
                    element={
                        <ProtectedRoute>
                            <AllOperators />
                        </ProtectedRoute>
                    }
                />
          <Route
    path="/admin/buses"
    element={
        <ProtectedRoute>
            <AllBuses />
        </ProtectedRoute>
    }
/>

      </Routes>
    </>
  );
}

export default App;