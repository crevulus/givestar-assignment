import { useQuery } from "@tanstack/react-query";
import { fetchForces } from "../utils/networkCalls";
import Loading from "../components/Loading";

type Props = {};

export default function Home({}: Props) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["forces"],
    queryFn: fetchForces,
  });

  console.log({ isLoading, data, error });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>Uh oh!</p>;
  }

  return (
    <>
      {data.length > 0
        ? data.map((force) => (
            <div>
              <p>{force.name}</p>
            </div>
          ))
        : null}
    </>
  );
}
