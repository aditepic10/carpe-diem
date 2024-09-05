export interface Category {
  id: string;
  name: string;
  icon: {
    prefix: string;
    suffix: string;
  };
}
export interface Geocodes {
  main: {
    latitude: number;
    longitude: number;
  };
}

export interface LocationAddress {
  address: string;
  city: string;
  state: string;
  postcode: string;
  region: string;
  country: string;
  formattedAddress: string;
}

export interface Photo {
  id: string;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
}

export interface Hours {
  display: string;
  open_now: boolean;
}

export interface Tips {
  id: string;
  text: string;
  agree_count: number;
  disagree_count: number;
  created_at: string;
}

export interface Chain {
  id: string;
  name: string;
}

export interface Location {
  fsq_id: string;
  categories: Category[];
  name: string;
  geocodes: Geocodes;
  location: LocationAddress;
  chains: Chain[];
  distance: number; // distance in meters from user's location
  website: string;
  tel: string;
  hours: Hours;
  rating: number;
  popularity: number;
  price: number;
  photos: Photo[];
  tips: Tips[];
  description: string;
}

export interface PlaceSearchResponse {
  results: Location[];
}
