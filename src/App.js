import React from "react"
import {BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import User from "./components/userComponents/user.component"
import Admin from "./components/adminComponents/admin.component";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/*" element={<User />} />
        <Route exact path="/admin/*" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
