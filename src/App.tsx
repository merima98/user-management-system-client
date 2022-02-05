import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient } from "react-query";
import { QueryClientProvider } from "react-query/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import UserListHeader from "./components/header/UserListHeader";
import NewUserForm from "./components/user/NewUserForm";

function App() {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode="light" />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path={"/"} element={<UserListHeader />} />
            <Route path={"/new-user"} element={<NewUserForm />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
