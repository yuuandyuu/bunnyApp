import { Route, Routes } from "react-router-dom";
import { FunFacts } from "../components/pages/FunFacts";
import { Home } from "../components/pages/Home";
import { BunnyList } from "../components/pages/BunnyList";
import { Error404 } from "../components/pages/Error404";
import { Settings } from "../components/pages/Settings";
import { BunnyProfile } from "../components/pages/BunnyProfile";
import { FunFactsFilter } from "../components/pages/FunFactsFilter";
import { BunnyProfileEdit } from "../components/pages/BunnyProfileEdit";
import { BunnyProfileCreate } from "../components/pages/BunnyProfileCreate";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/bunnylist" element={<BunnyList />} />
      <Route path="/bunnylist/:id" element={<BunnyProfile />} />
      <Route path="/bunnylist/:id/edit" element={<BunnyProfileEdit />} />
      <Route path="/bunnylist/create" element={<BunnyProfileCreate />} />

      <Route path="/funfacts" element={<FunFacts />} />
      <Route path="/funfacts/:classification" element={<FunFactsFilter />} />

      <Route path="/settings" element={<Settings />} />

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};
