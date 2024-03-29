import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Nav } from "./components/Nav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/Home";
import { Paths } from "./data/enum";
import { Force } from "./pages/Force";
import { Neighbourhood } from "./pages/Neighbourhood";
import { AppContext } from "./data/AppContext";
import { useState } from "react";

export const queryClient = new QueryClient();

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [filterNeighbourhoodsValue, setFilterNeighbourhoodsValue] =
    useState("");

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider
          value={{
            searchValue,
            setSearchValue,
            filterNeighbourhoodsValue,
            setFilterNeighbourhoodsValue,
          }}
        >
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path={Paths.HOME} element={<Home />} />
              <Route path={Paths.FORCE_DYNAMIC} element={<Force />} />
              <Route
                path={Paths.NEIGHBOURHOOD_DYNAMIC}
                element={<Neighbourhood />}
              />
            </Routes>
          </BrowserRouter>
        </AppContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
