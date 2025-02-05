import axios from 'axios';

const viatorApi = axios.create({
  baseURL: '/viator',
  headers: {
    'Accept': 'application/json;version=2.0',
    'Content-Type': 'application/json',
    'Accept-Language': 'es-ES',
    'exp-api-key': import.meta.env.VITE_VIATOR_API_KEY_PROD
  }
});

// Interceptor para debugging
viatorApi.interceptors.request.use(request => {
  console.log('Starting Request:', {
    url: request.url,
    method: request.method,
    headers: request.headers,
    data: request.data
  });
  return request;
});

viatorApi.interceptors.response.use(
  response => {
    console.log('Response:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method
      }
    });
    return Promise.reject(error);
  }
);

export interface Destination {
  destinationId: number;
  name: string;
  type: string;
  parentDestinationId: number;
  lookupId: string;
  latitude?: number;
  longitude?: number;
  photoUrl?: string;
}

interface ImageVariant {
  height: number;
  width?: number;
  url: string;
}

interface ProductImage {
  variants: ImageVariant[];
}

interface PricingInfo {
  summary: {
    fromPrice: number;
    currencyCode: string;
  };
}

interface ReviewInfo {
  combinedAverageRating: number;
  totalReviews: number;
}

interface LocationInfo {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
}

interface DurationInfo {
  description: string;
  duration?: string;
}

export interface Product {
  productCode: string;
  title: string;
  description: string;
  price: {
    amount: number;
    currency: string;
  };
  rating: number;
  reviewCount: number;
  photoUrl: string;
  duration: string;
  location: string;
  productUrl: string;
}

export interface ProductSearchRequest {
  filtering: {
    destination: string;
    tags?: number[];
    startDate?: string;
    endDate?: string;
    includeAutomaticTranslations?: boolean;
  };
  sorting: {
    sort: 'PRICE' | 'TRAVELER_RATING' | 'TOP_SELLERS';
    order: 'ASCENDING' | 'DESCENDING';
  };
  pagination: {
    start: number;
    count: number;
  };
  currency: string;
}

interface ProductApiResponse {
  productCode: string;
  title: string;
  shortDescription?: string;
  description?: string;
  pricing?: PricingInfo;
  reviews?: ReviewInfo;
  images?: ProductImage[];
  duration?: DurationInfo;
  location?: LocationInfo;
  bookingLink?: string;
}

export interface ProductSearchResponse {
  products: ProductApiResponse[];
  totalCount: number;
  errorMessage?: string;
}

const generateProductUrl = (
  productCode: string,
  title: string,
  destinationId: number,
  destinationName: string
): string => {
  // Formatear el título para la URL
  const cleanTitle = title
    .toLowerCase()
    .trim()
    .replace(/[áäâà]/g, 'a')
    .replace(/[éëêè]/g, 'e')
    .replace(/[íïîì]/g, 'i')
    .replace(/[óöôò]/g, 'o')
    .replace(/[úüûù]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  // Formatear el nombre de la ubicación para la URL
  const cleanDestinationName = destinationName
    .toLowerCase()
    .trim()
    .replace(/[áäâà]/g, 'a')
    .replace(/[éëêè]/g, 'e')
    .replace(/[íïîì]/g, 'i')
    .replace(/[óöôò]/g, 'o')
    .replace(/[úüûù]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  // Generar la URL final
  return `https://www.viator.com/es-ES/tours/${cleanDestinationName}/${cleanTitle}/d${destinationId}-${productCode}`;
};

export const getDestinations = async (): Promise<Destination[]> => {
  try {
    const response = await viatorApi.get<{ destinations: Destination[] }>('/destinations');
    return response.data.destinations || [];
  } catch (error) {
    console.error('Error getting destinations:', error);
    throw error;
  }
};

export const getDestinationProducts = async (destinationId: number, destinationName: string): Promise<Product[]> => {
  try {
    const currentDate = new Date().toISOString().split('T')[0];
    const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const searchRequest: ProductSearchRequest = {
      filtering: {
        destination: destinationId.toString(),
        startDate: currentDate,
        endDate: thirtyDaysFromNow,
        includeAutomaticTranslations: true
      },
      sorting: {
        sort: 'TRAVELER_RATING',
        order: 'DESCENDING'
      },
      pagination: {
        start: 1,
        count: 20
      },
      currency: 'USD'
    };
    const response = await viatorApi.post<ProductSearchResponse>('/products/search', searchRequest);

    if (!response.data.products || response.data.products.length === 0) {
      return [];
    }

    return response.data.products.map((product: ProductApiResponse) => {
      if (!product.productCode || !product.title) {
        return null;
      }
      return {
        productCode: product.productCode,
        title: product.title,
        description: product.shortDescription || product.description || '',
        price: {
          amount: product.pricing?.summary?.fromPrice || 0,
          currency: product.pricing?.summary?.currencyCode || 'USD'
        },
        rating: product.reviews?.combinedAverageRating || 0,
        reviewCount: product.reviews?.totalReviews || 0,
        photoUrl: product.images?.[0]?.variants?.find(v => v.height === 400)?.url ||
                  product.images?.[0]?.variants?.[0]?.url || '',
        duration: product.duration?.description || '',
        location: [
          product.location?.addressLine1,
          product.location?.addressLine2,
          product.location?.city,
          product.location?.country
        ].filter(Boolean).join(', '),
        productUrl: generateProductUrl(product.productCode, product.title, destinationId, destinationName)
      };
    }).filter(product => product !== null) as Product[];
  } catch (error) {
    console.error('Error getting destination products:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error details:', error.response?.data);
    }
    return [];
  }
};

export const getProductDetails = async (productCode: string): Promise<Product | null> => {
  try {
    const response = await viatorApi.get<ProductApiResponse>(`/products/${productCode}`);
    const product = response.data;

    if (!product || !product.productCode || !product.title) {
      return null;
    }
    return {
      productCode: product.productCode,
      title: product.title,
      description: product.shortDescription || product.description || '',
      price: {
        amount: product.pricing?.summary?.fromPrice || 0,
        currency: product.pricing?.summary?.currencyCode || 'USD'
      },
      rating: product.reviews?.combinedAverageRating || 0,
      reviewCount: product.reviews?.totalReviews || 0,
      photoUrl: product.images?.[0]?.variants?.find(v => v.height === 400)?.url ||
                product.images?.[0]?.variants?.[0]?.url || '',
      duration: product.duration?.description || '',
      location: [
        product.location?.addressLine1,
        product.location?.addressLine2,
        product.location?.city,
        product.location?.country
      ].filter(Boolean).join(', '),
      productUrl: generateProductUrl(product.productCode, product.title, 0, '') // Aquí deberías pasar el destinationId y destinationName correctos
    };
  } catch (error) {
    console.error('Error getting product details:', error);
    return null;
  }
};

export default viatorApi;