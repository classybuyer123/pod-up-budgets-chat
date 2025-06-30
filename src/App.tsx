
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import BudgetPods from "./pages/BudgetPods";
import Earn from "./pages/Earn";
import MicroInvest from "./pages/MicroInvest";
import NotFound from "./pages/NotFound";
import AppNavigation from "./components/AppNavigation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-slate-900 flex flex-col">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/pods" element={<BudgetPods />} />
              <Route path="/micro-invest" element={<MicroInvest />} />
              <Route path="/earn" element={<Earn />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <AppNavigation />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
