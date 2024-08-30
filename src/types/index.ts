export interface Place {
  id: number;
  city: string;
  country: string;
  countryCode: string;
  name: string;
}

export interface SearchContextType {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  places: Place[];
  setPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  getPlaces: () => void;
  totalItems: number;
}
