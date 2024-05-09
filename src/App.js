import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Header } from "./components/header/header";
import { Main } from "./components/main/main";
import { Random } from "./components/random/random";
import { Comment } from "./components/comment/comment";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Navigate to="/main" />} />
        <Route exact path="/main" element={<Main />} />
        <Route exact path="/random" element={<Random />} />
        <Route exact path="/comment" element={<Comment />} />
      </Routes>
    </Router>
  );
}

export default App;
