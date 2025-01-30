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
  type: string;
  parentId?: string;
  destinationNameList?: string[];
}

const viatorApi = axios.create({
  baseURL: 'https://api.viator.com/partner',
  headers: {
    'Accept-Language': 'es-ES',
    'Content-Type': 'application/json',
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
    
    console.log('🔍 Buscando destinos con query:', query);
    
    try {
      const response = await viatorApi.get(`/search/destinations`, {
        params: {
          q: query,
          size: 5
        },
        headers: {
          'Accept': 'application/json;version=2.0'
        }
      });
      
      console.log('📍 Destinos encontrados:', response.data);

      if (response.data && Array.isArray(response.data)) {
        return response.data.map((dest: any) => ({
          destinationId: dest.destinationId,
          name: dest.name,
          displayName: `${dest.name}, ${dest.destinationNameList?.join(', ')}`,
          type: dest.type,
          parentId: dest.parentId,
          destinationNameList: dest.destinationNameList
        }));
      }
      
      return [];
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
      }, {
        headers: {
          'Accept': 'application/json;version=2.0'
        }
      });

      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message;
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