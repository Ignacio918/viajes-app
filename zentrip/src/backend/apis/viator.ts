// src/backend/apis/viator.ts
import axios from 'axios';
import { useState } from 'react';

// Interfaces
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

export interface ViatorDestination {
  destinationId: string;
  name: string;
  displayName: string;
  parentId?: string;
  parentDestinationName?: string;
  type: string;
}

// Cliente API con interceptores
const viatorApi = axios.create({
  baseURL: 'https://api.viator.com/partner',
  headers: {
    'Accept-Language': 'es-ES',
    'Content-Type': 'application/json',
    'Accept': 'application/json;version=2.0',
    'exp-api-key': import.meta.env.VITE_VIATOR_API_KEY
  }
});

// Interceptores para logging
viatorApi.interceptors.request.use(request => {
  console.log('🚀 Enviando petición a Viator:', {
    url: request.url,
    method: request.method,
    headers: request.headers,
    params: request.params,
    data: request.data
  });
  return request;
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
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });
    return Promise.reject(error);
  }
);

// Hook personalizado
export const useViator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchDestinations = async (query: string) => {
    if (query.length < 3) return [];
    
    console.log('🔍 Buscando destinos con query:', query);
    
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
        currency: "USD"
      });
      
      console.log('📍 Destinos encontrados:', response.data);
      
      const destinations = response.data.destinations?.results?.map((dest: any) => ({
        destinationId: dest.id,
        name: dest.name,
        displayName: `${dest.name}${dest.parentDestinationName ? `, ${dest.parentDestinationName}` : ''}`,
        parentId: dest.parentDestinationId,
        parentDestinationName: dest.parentDestinationName,
        type: 'CITY'
      })) || [];

      return destinations;
    } catch (err: any) {
      console.error('🚫 Error buscando destinos:', {
        message: err.message,
        response: err.response?.data
      });
      return [];
    }
  };

  const searchTours = async (params: ViatorSearchParams) => {
    setLoading(true);
    setError(null);

    console.log('🎯 Iniciando búsqueda de tours con parámetros:', params);

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

      console.log('🎉 Tours encontrados:', response.data);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message;
      console.error('💥 Error en búsqueda de tours:', {
        message: errorMessage,
        config: err.config,
        response: err.response
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