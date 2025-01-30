// src/backend/apis/viator.ts
import axios from 'axios';
import { useState } from 'react';

export interface ViatorTour {
  productCode: string;
  title: string;
  description: string;
  price: {
    amount: number;
    currency: string;
  };
  duration?: string;
  images: Array<{
    url: string;
  }>;
  bookingUrl?: string;
  rating?: number;
  reviewCount?: number;
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

export interface ViatorDestination {
  id: string;
  name: string;
  parentDestinationId?: string;
  parentDestinationName?: string;
}

const viatorApi = axios.create({
  baseURL: '/viator',
  headers: {
    'Accept-Language': 'es-ES',
    'Content-Type': 'application/json',
    'Accept': 'application/json;version=2.0',
    'exp-api-key': import.meta.env.VITE_VIATOR_API_KEY
  }
});

viatorApi.interceptors.request.use(request => {
  console.log('🚀 Enviando petición a Viator:', {
    url: request.url,
    method: request.method,
    headers: request.headers,
    data: request.data
  });
  return request;
}, error => {
  console.error('❌ Error en la configuración de la petición:', error);
  return Promise.reject(error);
});

viatorApi.interceptors.response.use(
  response => {
    console.log('✅ Respuesta exitosa de Viator:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('❌ Error en petición a Viator:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      code: error.code
    });
    return Promise.reject(error);
  }
);

export const useViator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchDestinations = async (query: string) => {
    if (query.length < 3) return [];
    
    setLoading(true);
    try {
      const response = await viatorApi.post('/search/freetext', {
        searchTerm: query,
        searchTypes: [
          {
            searchType: "DESTINATIONS",
            pagination: {
              start: 1,
              count: 5
            }
          }
        ],
        currency: "USD",
        includeAutomaticTranslations: true
      });
      
      console.log('📍 Respuesta de búsqueda de destinos:', response.data);
      
      if (response.data?.destinations?.results) {
        return response.data.destinations.results.map((dest: any) => ({
          id: dest.id,
          name: dest.name,
          parentDestinationId: dest.parentDestinationId,
          parentDestinationName: dest.parentDestinationName
        }));
      }
      
      return [];
    } catch (err: any) {
      console.error('🚫 Error buscando destinos:', err);
      setError(err.response?.data?.message || err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

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
      const errorMessage = err.response?.data?.message || err.message;
      console.error('💥 Error en búsqueda de tours:', errorMessage);
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    searchTours,
    searchDestinations,
    loading,
    error
  };
};