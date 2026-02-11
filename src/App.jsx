// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoadingScreen from "./components/Load";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Load from "./components/Load";

function App() {
  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <Router>
      {/* SHOW LOADER FIRST */}
      {!loadingDone && (
        <Load onComplete={() => setLoadingDone(true)} />
      )}
      {loadingDone && (
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
