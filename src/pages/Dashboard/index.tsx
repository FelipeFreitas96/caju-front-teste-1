import { useQuery } from "@tanstack/react-query";
import {
  getRegistrationCardsFn,
  GET_REGISTRATION_CARD_KEY,
} from "~/queries/getRegistrationCards";
import Collumns from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
import * as S from "./styles";

const DashboardPage = () => {
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: [GET_REGISTRATION_CARD_KEY],
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
