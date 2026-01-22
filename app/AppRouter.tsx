import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../app/login";
import Index from "../app/index";
import Map from "../app/map";
import AppLayout from "../AppLayout";

export default function AppRouter() {
  const isAuthenticated = true; // ← plus tard: vrai système d’auth

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {isAuthenticated && (
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/map" element={<Map />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}
