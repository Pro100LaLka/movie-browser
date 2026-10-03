import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import HomePage from "./Pages/HomePage";
import MoviesPage from "./Pages/MoviesPage";
import NotFoundPage from "./Pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />}></Route>
        <Route path="movies" element={<MoviesPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
