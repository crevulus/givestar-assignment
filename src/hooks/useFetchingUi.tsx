import Error from "../components/Error";
import Loading from "../components/Loading";

type Props = {
  isLoading: boolean;
  error: unknown;
};

export const useFetchingUi = ({ isLoading, error }: Props) => {
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return null;
};
