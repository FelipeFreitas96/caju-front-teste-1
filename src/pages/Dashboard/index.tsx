import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { getRegistrationCardsFn } from "~/queries/getRegistrationCards";
import { useQuery } from "@tanstack/react-query";

const DashboardPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["registrationsData"],
    queryFn: getRegistrationCardsFn,
  });

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={data} isLoading={isLoading} />
    </S.Container>
  );
};
export default DashboardPage;
