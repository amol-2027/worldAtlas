import "./App.css";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Country } from "./pages/Country";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/Layout/AppLayout";
import { ErrorPage } from "./pages/Errorpage";
import { CountryDetails } from "./components/Layout/CountryDetails";
import { Favorites } from "./pages/Favorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "country",
        element: <Country />,
      },
      {
        path: "country/:id",
        element: <CountryDetails />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}> </RouterProvider>;
};
export default App;
