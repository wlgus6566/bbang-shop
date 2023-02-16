import './App.css';
import {Outlet} from "react-router-dom";
import AppHeader from "./components/AppHeader";
import StickyItem from "./components/StickyItem";
import {AuthContextProvider} from "./context/AuthContext";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
            <AppHeader/>
            <Outlet/>
            <StickyItem/>
        </AuthContextProvider>
      </QueryClientProvider>
  );
}

export default App;
