// Definición de tipos para la API
export interface Product {
  productId: string;
  name: string;
  description: string;
  city: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  duration: string;
  pricing: {
    retail: number;
    currency: string;
  };
  images: Array<{
    url: string;
    caption: string;
  }>;
  included: string[];
  meetingPoint: {
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
}

export interface ApiResponse<T> {
  status: "OK" | "ERROR";
  data?: T;
  message?: string;
} 