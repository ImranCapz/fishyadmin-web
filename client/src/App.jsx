import InitialAdmin from "./components/InitialAdmin";
import Login from "./pages/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import Oauth from "./components/Oauth";
function App() {
  return (
    <>
      <InitialAdmin />
      <Oauth />
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
