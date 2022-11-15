import { BrowserRouter, Routes, Route } from "react-router-dom";
import Collection from "./pages/Collection";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/:collection" element={<Collection />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
