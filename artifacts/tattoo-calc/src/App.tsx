import { Switch, Route, Router as WouterRouter, useLocation, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import LoginPage from "@/pages/Login";
import CadastroPage from "@/pages/Cadastro";
import ConfiguracaoPage from "@/pages/Configuracao";
import OrcamentoPage from "@/pages/Orcamento";
import ResultadoPage from "@/pages/Resultado";
import { isLoggedIn } from "@/lib/auth";

const queryClient = new QueryClient();

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  if (!isLoggedIn()) {
    return <Redirect to="/login" />;
  }
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={LoginPage} />
      <Route path="/cadastro" component={CadastroPage} />
      <Route path="/configuracoes">
        {() => <ProtectedRoute component={ConfiguracaoPage} />}
      </Route>
      <Route path="/orcamento">
        {() => <ProtectedRoute component={OrcamentoPage} />}
      </Route>
      <Route path="/resultado">
        {() => <ProtectedRoute component={ResultadoPage} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
