import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import { Paths } from "./data/enum";
import Force from "./pages/Force";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Nav />
        <BrowserRouter>
          <Routes>
            <Route path={Paths.HOME} element={<Home />} />
            <Route path={Paths.FORCE_DYNAMIC} element={<Force />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
