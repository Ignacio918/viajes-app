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
  baseURL: 'https://api.viator.com/partner',
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
      code: error.code,
      config: error.config
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
      console.log('Buscando destinos con query:', query);
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
        ]
      });
      
      console.log('📍 Respuesta completa de búsqueda:', response);
      
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
      console.error('🚫 Error detallado:', {
        message: err.message,
        response: err.response,
        config: err.config,
        data: err.response?.data
      });
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

      console.log('✅ Respuesta de búsqueda de tours:', response.data);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message;
      console.error('💥 Error detallado en búsqueda de tours:', {
        message: errorMessage,
        response: err.response,
        config: err.config
      });
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