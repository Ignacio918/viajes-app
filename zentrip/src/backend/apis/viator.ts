// src/backend/apis/viator.ts
import axios from 'axios';
import { useState } from 'react';

// Tipos
export interface ViatorTour {
  productCode: string;
  title: string;
  description: string;
  price: {
    amount: number;
    currency: string;
  };
  images: {
    url: string;
  }[];
  rating?: number;
  reviewCount?: number;
  duration?: string;
  bookingUrl?: string;
}

export interface ViatorSearchParams {
  destination: string;
  startDate?: string;
  endDate?: string;
  tags?: number[];
  filters?: {
    lowestPrice?: number;
    highestPrice?: number;
    [key: string]: any;
  };
}

// Cliente de API
const viatorApi = axios.create({
  baseURL: 'https://api.viator.com/partner',
  headers: {
    'Accept-Language': 'en-US',
    'Content-Type': 'application/json',
    'Accept': 'application/json;version=1.0',
    'exp-api-key': import.meta.env.VITE_VIATOR_API_KEY
  }
});

// Hook personalizado
export const useViator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchTours = async (params: ViatorSearchParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await viatorApi.post('/products/search', {
        filtering: {
          destination: params.destination,
          startDate: params.startDate,
          endDate: params.endDate,
          tags: params.tags,
          ...params.filters
        },
        sorting: {
          sort: 'RECOMMENDED',
          order: 'DESCENDING'
        },
        pagination: {
          start: 1,
          count: 10
        },
        currency: 'USD'
      });

      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error buscando tours');
      console.error('Error en la búsqueda de tours:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    searchTours,
    loading,
    error
  };
};