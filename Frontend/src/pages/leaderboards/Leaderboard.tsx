import { useEffect, useState } from "react";
import LeaderTable from "../../components/tables/leaderTable";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useFetch from "../../hooks/useFetch";
import { Details, leaderFailed, leaderStart, leaderSuccess } from "../../slices/leaderboardSlice";

const Leaderboard = () => {
  const [difficulty, setDifficulty] = useState<string>('easy');
  const dispatch = useAppDispatch();
  const {token} = useAppSelector(data => data.user)
  const {datas,loading,error} = useFetch<Details>(`/score/?level=${difficulty}`,token)
  useEffect(() => {
    dispatch(leaderStart());
    if(loading) return;
    if(error){
      dispatch(leaderFailed("Something went wrong"));
    } else {
      dispatch(leaderSuccess(datas));
    }

  },[loading,error,datas,dispatch,difficulty]);

  return (
    <>
      <label htmlFor="difficulty">Select Difficulty:</label>
      <select
        name="difficulty"
        id="difficulty"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <LeaderTable />
    </>
  );
};

export default Leaderboard;
