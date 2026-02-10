export interface Charger {
  id: string;
  host_id: string;
  title: string;
  address: string;
  pincode: string;
  price_per_hour: number;
  charger_type: string;
  power_output: number;
  photo_url: string | null;
  available_start: string;
  available_end: string;
  status: string;
  created_at: string;
  host?: {
    id: string;
    name: string;
  };
}

export interface ChargerSearchParams {
  pincode?: string;
  charger_type?: string;
  min_price?: number;
  max_price?: number;
  min_power?: number;
}

export interface ChargerListResponse {
  chargers: Charger[];
  total: number;
}