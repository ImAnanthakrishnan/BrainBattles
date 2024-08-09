import { Route, Routes } from "react-router-dom";
import Auth from "../../pages/auth/Auth";
import Home from "../../pages/home/Home";
import Quiz from "../../pages/quizes/Quiz";
import PrivateRoute from "../PrivateRoute";
import PublicRoute from "../PublicRoute";
import Leaderboard from "../../pages/leaderboards/Leaderboard";
import Page404 from "../../components/404/Page404";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/quiz/:level" element={<Quiz />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
        <Route path='*' element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default Router;
