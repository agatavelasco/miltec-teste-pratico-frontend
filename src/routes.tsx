import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateAd from "./pages/CreateAd";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/inclusao-anuncio" replace />} />
        <Route path="/inclusao-anuncio" element={<CreateAd />} />
      </Routes>
    </BrowserRouter>
  );
}
