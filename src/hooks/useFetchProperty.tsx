import { useQuery } from "react-query";
import Axios from "src/api/Axios";

const fetchProperty = (propertyId: string) => {
  return Axios.get(`/properties/${propertyId}`);
};

export const useFetchProperty = (id: string, onSuccessHandler: any) => {
  return useQuery({
    queryKey: [`property`, id],
    queryFn: () => fetchProperty(id),
    onSuccess(data) {
      onSuccessHandler(data);
    },
  });
};
