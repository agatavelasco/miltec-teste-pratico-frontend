import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAd from "./pages/CreateAd";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/inclusao-anuncio" element={<CreateAd />} />
      </Routes>
    </BrowserRouter>
  );
}
