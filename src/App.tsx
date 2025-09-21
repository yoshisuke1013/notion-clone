import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCurrentUserStore } from "./modules/auth/current-user.state";
import { authRepository } from "./modules/auth/auth.repository";
import Layout from "./Layout";
import { Home } from "./pages/Home";
import NoteDetail from "./pages/NoteDetail";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const currentUserStore = useCurrentUserStore();

  const setSession = async () => {
    const currentUser = await authRepository.getCurrentUser();
    currentUserStore.set(currentUser);
    setIsLoading(false);
  };

  useEffect(() => {
    setSession();
  }, []);

  if (isLoading) return <div>Loading…</div>;

  return (
    <BrowserRouter>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/notes/:id" element={<NoteDetail />}></Route>
          </Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
