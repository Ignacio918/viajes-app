import { Router, Request, Response } from 'express';
import basicAuth from 'express-basic-auth';
import { supabaseAdmin } from './supabaseAdmin';

const router = Router();

// Interfaz para el manejo de errores
interface ApiError {
  message: string;
  status?: number;
}

// Función helper para manejar errores
const handleError = (error: unknown): ApiError => {
  if (error instanceof Error) {
    return { message: error.message };
  }
  return { message: 'An unknown error occurred' };
};

// Configurar autenticación básica que requiere GetYourGuide
const auth = basicAuth({
  users: { 'zentrip': '4392d51687c605b11df5c2a9f0acb5ec' } // Usa las credenciales que configuraste en el portal de GYG
});

// 1. Notificación de disponibilidad (Availability Update)
router.post('/availability', auth, async (req, res) => {
  try {
    const { productId, dateFrom, dateTo } = req.body;

    const { data: availabilities, error } = await supabaseAdmin
      .from('gyg_availability')
      .select('*')
      .eq('product_id', productId)
      .gte('date_time', dateFrom)
      .lte('date_time', dateTo);

    if (error) throw error;

    const response = {
      status: "OK",
      data: {
        availabilities: availabilities.map(avail => ({
          dateTime: avail.date_time,
          available: avail.available,
          vacancies: avail.vacancies,
          pricing: avail.pricing
        }))
      }
    };

    res.json(response);
  } catch (error) {
    const apiError = handleError(error);
    res.status(apiError.status || 500).json({ 
      status: "ERROR", 
      message: apiError.message 
    });
  }
});

// 2. Creación de reserva (Booking Creation)
router.post('/booking', auth, async (req: Request<any, any, any, any>, res: Response<any>): Promise<void> => {
  try {
    const { productId, dateTime, travelers } = req.body;
    const bookingId = 'ZT-' + Date.now();

    // 1. Verificar disponibilidad
    console.log('Checking availability for:', dateTime);
    const { data: availability, error: availError } = await supabaseAdmin
      .from('gyg_availability')
      .select('*')
      .eq('product_id', productId)
      .eq('date_time', new Date(dateTime).toISOString())
      .single();

    if (availError) {
      console.error('Error checking availability:', availError);
      res.status(500).json({
        status: "ERROR",
        message: availError.message
      });
      return;
    }
    if (!availability || !availability.available || availability.vacancies < travelers) {
      res.status(400).json({
        status: "ERROR",
        message: "No availability for the selected date and number of travelers"
      });
      return;
    }

    // 2. Crear la reserva
    const { data: booking, error: bookError } = await supabaseAdmin
      .from('gyg_bookings')
      .insert([{
        booking_id: bookingId,
        product_id: productId,
        date_time: dateTime,
        travelers: travelers,
        status: 'CONFIRMED',
        voucher: {
          bookingId: bookingId,
          productId: productId,
          dateTime: dateTime,
          travelers: travelers
        }
      }])
      .select()
      .single();

    if (bookError) throw bookError;

    // 3. Actualizar disponibilidad
    const { error: updateError } = await supabaseAdmin
      .from('gyg_availability')
      .update({ 
        vacancies: availability.vacancies - travelers 
      })
      .eq('product_id', productId)
      .eq('date_time', dateTime);

    if (updateError) throw updateError;

    const response = {
      status: "OK",
      data: {
        bookingId: booking.booking_id,
        status: booking.status,
        voucher: booking.voucher
      }
    };

    res.json(response);
  } catch (error) {
    const apiError = handleError(error);
    res.status(apiError.status || 500).json({ 
      status: "ERROR", 
      message: apiError.message 
    });
  }
});

// 3. Cancelación de reserva (Booking Cancellation)
router.post('/booking/:bookingId/cancel', auth, (req, res) => {
  try {
    const { bookingId } = req.params;
    const response = {
      status: "OK",
      data: {
        bookingId: bookingId,
        status: "CANCELLED"
      }
    };
    res.json(response);
  } catch (error) {
    const apiError = handleError(error);
    res.status(apiError.status || 500).json({ 
      status: "ERROR", 
      message: apiError.message 
    });
  }
});

// 4. Listado de productos (Product Catalog)
router.get('/products', auth, async (_req, res) => {
  try {
    const { data: products, error } = await supabaseAdmin
      .from('gyg_products')
      .select('*');

    if (error) throw error;

    const response = {
      status: "OK",
      data: {
        products: products.map(product => ({
          productId: product.product_id,
          name: product.name,
          description: product.description,
          city: product.city,
          coordinates: product.coordinates,
          duration: product.duration,
          pricing: product.pricing,
          images: product.images,
          included: product.included,
          meetingPoint: product.meeting_point
        }))
      }
    };

    res.json(response);
  } catch (error) {
    const apiError = handleError(error);
    res.status(apiError.status || 500).json({ 
      status: "ERROR", 
      message: apiError.message 
    });
  }
});

// Notify Availability Update endpoint
router.post('/notify-availability-update', auth, async (req: Request, res: Response) => {
  try {
    const { product_id, availability } = req.body;

    // Aquí deberías realizar la lógica para notificar la disponibilidad
    // Asegúrate de que product_id y availability sean válidos

    // Simulación de respuesta exitosa
    res.json({
      status: "OK",
      data: {
        message: "Availability update received successfully"
      }
    });
  } catch (error) {
    res.status(500).json({ 
      status: "ERROR", 
      message: "An error occurred while notifying availability" 
    });
  }
});

// Deals endpoint
router.post('/deals', auth, async (req: Request, res: Response) => {
  try {
    const { productId, dealType, discount, validFrom, validTo } = req.body;

    // Aquí deberías realizar la lógica para crear la oferta
    // Asegúrate de que todos los campos sean válidos

    // Simulación de respuesta exitosa
    res.json({
      status: "OK",
      data: {
        dealId: "DEAL-123456",
        productId: productId,
        dealType: dealType,
        discount: discount,
        validFrom: validFrom,
        validTo: validTo
      }
    });
  } catch (error) {
    res.status(500).json({ 
      status: "ERROR", 
      message: "An error occurred while creating the deal" 
    });
  }
});

// Supplier Registration endpoint
router.post('/suppliers', auth, async (req, res) => {
  try {
    const { supplierId, name, email, phone } = req.body;

    const { data: supplier, error } = await supabaseAdmin
      .from('gyg_suppliers')
      .insert([{
        supplier_id: supplierId,
        name: name,
        email: email,
        phone: phone
      }])
      .select()
      .single();

    if (error) throw error;

    const response = {
      status: "OK",
      data: {
        supplierId: supplier.supplier_id,
        name: supplier.name,
        email: supplier.email,
        phone: supplier.phone
      }
    };

    res.json(response);
  } catch (error) {
    const apiError = handleError(error);
    res.status(apiError.status || 500).json({ 
      status: "ERROR", 
      message: apiError.message 
    });
  }
});

// Get Deals List endpoint
router.get('/deals', auth, async (_req, res) => {
  try {
    const { data: deals, error } = await supabaseAdmin
      .from('gyg_deals')
      .select('*');

    if (error) throw error;

    const response = {
      status: "OK",
      data: {
        deals: deals.map(deal => ({
          dealId: deal.deal_id,
          productId: deal.product_id,
          dealType: deal.deal_type,
          discount: deal.discount,
          validFrom: deal.valid_from,
          validTo: deal.valid_to
        }))
      }
    };

    res.json(response);
  } catch (error) {
    const apiError = handleError(error);
    res.status(apiError.status || 500).json({ 
      status: "ERROR", 
      message: apiError.message 
    });
  }
});

// Delete Deal endpoint
router.delete('/deals/:dealId', auth, async (req, res) => {
  try {
    const { dealId } = req.params;

    const { error } = await supabaseAdmin
      .from('gyg_deals')
      .delete()
      .eq('deal_id', dealId);

    if (error) throw error;

    const response = {
      status: "OK",
      data: {
        message: "Deal deleted successfully"
      }
    };

    res.json(response);
  } catch (error) {
    const apiError = handleError(error);
    res.status(apiError.status || 500).json({ 
      status: "ERROR", 
      message: apiError.message 
    });
  }
});

export default router; 