import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Prompt from "./pages/Prompt";
import Script from "./pages/Script";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * The root component of the app.
 *
 * It wraps the app with a client for react-query, a provider for tooltips,
 * a provider for toasts, and a browser router.
 *
 * It renders the following routes:
 * - "/" : renders the Index component
 * - "/prompt" : renders the Prompt component
 * - "/script" : renders the Script component
 * - "*" : renders the NotFound component
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/prompt" element={<Prompt />} />
          <Route path="/script" element={<Script />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
