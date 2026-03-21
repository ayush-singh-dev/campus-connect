import {} from "react";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Navbar from "./components/navbar";
import ProtectedRoute from "./components/protected-route.jsx";
import { ThemeProvider } from "next-themes";
import OnBoarding from "./pages/onBoarding";
import StudentDashboard from "./pages/studentDashboard";
import TeacherDashboard from "./pages/teacherDashboard";
import TeacherProfile from "./pages/teacherProfile";
import AuthRedirect from "./lib/AuthRedirect";
import StudentProfile from "./pages/studentProfile";
import ChannelPage from "./pages/channelPage";
import { Toaster } from "sonner";
function App() {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Toaster position="top-right" />
        <BrowserRouter>
          <Navbar />
          <div className="pb-16 md:pb-0">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/redirect" element={<AuthRedirect />} />

              <Route
                path="/onBoarding"
                element={
                  <ProtectedRoute>
                    <OnBoarding />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student-profile"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <StudentProfile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/teacher/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["teacher"]}>
                    <TeacherDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teacher-profile"
                element={
                  <ProtectedRoute>
                    <TeacherProfile />
                  </ProtectedRoute>
                }
              />
              <Route path="/channel/:channelId" element={<ChannelPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
