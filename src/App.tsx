import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { WhatsAppButton } from "./components/WhatsAppButton";

const App = () => (
  <TooltipProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
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
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
