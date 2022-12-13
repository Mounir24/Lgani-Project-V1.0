import React from "react";
import "./Styles/global.scss"
import { Routes, Route } from "react-router-dom"
// IMPORT BOOTSTRAP v4.6
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

// IMPORT COMPONENTS / LAYOUTS (Header  - Footer - ...)
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import DashboardMain from "./Layouts/DashboardMain";
import CreateIDTag from "./Pages/CreateIDTag";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
import IDTagsManager from "./Pages/IDTagsManager";
import NoMatch from "./Layouts/NoFound";
import LosterProfile from "./Pages/LosterProfile";
import Confirmation from "./Pages/Confirmation";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<DashboardMain />} />
          <Route path="create" element={<CreateIDTag />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="qrtags-manager" element={<IDTagsManager />} />
        </Route>
        <Route path="/profile/:client_id" element={<LosterProfile />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
