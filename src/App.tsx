
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat        from "./pages/LovableMVP/Chat";
import BudgetPods  from "./pages/LovableMVP/BudgetPods";
import Budgets     from "./pages/LovableMVP/Budgets";
import Earn        from "./pages/LovableMVP/Earn";
import MicroInvest from "./pages/LovableMVP/MicroInvest";
import NotFound    from "./pages/LovableMVP/NotFound";
import AppNavigation from "./components/AppNavigation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-slate-950 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/pods" element={<BudgetPods />} />
              <Route path="/budgets" element={<Budgets />} />
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
