import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Room from "./pages/Room";
import Create from "./pages/Create";
import Experiment from "./pages/Experiment";
import NameHandler from "./components/NameHandler";
import Layout from "./Layout";
import Login from "./pages/Login";
 import AuthContext from "./pages/context/authContext";
function App() {
  // const socket = useMemo(() => io("http://localhost:3000"), []);

  // 🚀 Add this BEFORE rendering App

  return (
    <NameHandler>
      <AuthContext>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/e" element={<Experiment />} />
          <Route path="/room/:id" element={<Room />} />
          <Route path="/create" element={<Create />} />

          <Route path="/chat" element={<Chat />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
      </AuthContext>
    </NameHandler>
  );
}

export default App;
