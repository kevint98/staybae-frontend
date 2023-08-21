import { useQuery } from "react-query";
import Axios from "src/api/Axios";

const fetchPropertiesByQuery = (
  fromDate: string,
  toDate: string,
  searchLocation: string,
  region: string
) => {
  const parameters = region
    ? {
        from: fromDate,
        to: toDate,
        city: searchLocation,
        region: region,
      }
    : { from: fromDate, to: toDate, city: searchLocation };
  return Axios.get(`/properties`, { params: parameters });
};

export const useSearchResults = (
  fromDate: string,
  toDate: string,
  searchLocation: string,
  region: string
) => {
  return useQuery({
    queryKey: [`search-properties`, fromDate, toDate, searchLocation, region],
    queryFn: () =>
      fetchPropertiesByQuery(fromDate, toDate, searchLocation, region),
  });
};
