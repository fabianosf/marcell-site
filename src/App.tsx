import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { CookieConsent } from "./components/CookieConsent";
import { AnalyticsBoot } from "./components/AnalyticsBoot";

const App = () => (
  <TooltipProvider>
    <BrowserRouter>
      <AnalyticsBoot />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/privacidade" element={<Privacy />} />
        <Route path="/equipe" element={<Index />} />
        <Route path="/tratamentos" element={<Index />} />
        <Route path="/atendimento" element={<Index />} />
        <Route path="/galeria" element={<Index />} />
        <Route path="/avaliacoes" element={<Index />} />
        <Route path="/duvidas" element={<Index />} />
        <Route path="/contato" element={<Index />} />
        {/* endereços antigos do site anterior */}
        <Route path="/inicio" element={<Navigate to="/" replace />} />
        <Route path="/servicos" element={<Navigate to="/tratamentos" replace />} />
        <Route path="/sobre" element={<Navigate to="/equipe" replace />} />
        <Route path="/depoimentos" element={<Navigate to="/avaliacoes" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <WhatsAppButton />
      <CookieConsent />
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
