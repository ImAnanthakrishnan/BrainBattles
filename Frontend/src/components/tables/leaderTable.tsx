import { useAppSelector } from "../../app/hooks";

export default function LeaderTable() {
  const { users: data } = useAppSelector((data) => data.leaderboard);
  console.log(data);
  return (
    <div className="flex flex-col">
      <div className="container overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Score
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Level
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr key={index} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {index+1}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{item.userss[0].name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.score}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.difficulty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
