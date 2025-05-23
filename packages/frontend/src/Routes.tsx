import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home.tsx";
import NotFound from "./containers/NotFound.tsx";
import NewNote from "./containers/NewNote.tsx";
import Login from "./containers/Login.tsx";
import Signup from "./containers/Signup.tsx";
import Notes from "./containers/Notes.tsx";
import NewLightsaberSelection from "./containers/NewLightsaberSelection.tsx";
import LightsaberSelections from "./containers/LightsaberSelections.tsx";
import AuthenticatedRoute from "./components/AuthenticatedRoute.tsx";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute.tsx";
import LightsaberStats from "./containers/LightsaberStats";


export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <UnauthenticatedRoute>
            <Login />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <UnauthenticatedRoute>
            <Signup />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path="/notes/new"
        element={
          <AuthenticatedRoute>
            <NewNote />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/notes/:id"
        element={
          <AuthenticatedRoute>
            <Notes />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/LightsaberSelection/new"
        element={
          <AuthenticatedRoute>
            <NewLightsaberSelection />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/LightsaberSelections/:id"
        element={
          <AuthenticatedRoute>
            <LightsaberSelections />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/lightsaberStats"
        element={
          <AuthenticatedRoute>
            <LightsaberStats />
          </AuthenticatedRoute>
        }
      />
      {/* Finally, catch all unmatched routes */}
      <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}
