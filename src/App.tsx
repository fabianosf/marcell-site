import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { WhatsAppButton } from "./components/WhatsAppButton";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route path="/inicio" element={<Index />} />
        <Route path="/sobre" element={<Index />} />
        <Route path="/servicos" element={<Index />} />
        <Route path="/galeria" element={<Index />} />
        <Route path="/depoimentos" element={<Index />} />
        <Route path="/contato" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    <WhatsAppButton />
  </TooltipProvider>
);

export default App;
