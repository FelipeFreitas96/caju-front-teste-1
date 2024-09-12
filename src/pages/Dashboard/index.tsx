import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { getRegistrationCardsFn, REGISTRATION_CARD_KEY } from "~/queries/getRegistrationCards";
import { useQuery } from "@tanstack/react-query";

const DashboardPage = () => {
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: [REGISTRATION_CARD_KEY],
    queryFn: getRegistrationCardsFn,
  });

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={data} isLoading={isLoading || isRefetching} />
    </S.Container>
  );
};
export default DashboardPage;
