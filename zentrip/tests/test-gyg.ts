import { fetch } from 'undici';

// Configura tus credenciales aquí
const GYG_USERNAME = 'zentrip'; // Reemplázalo con tu username
const GYG_PASSWORD = '4392d51687c605b11df5c2a9f0acb5ec'; // Reemplázalo con tu contraseña real
const AUTH = Buffer.from(`${GYG_USERNAME}:${GYG_PASSWORD}`).toString('base64');

// Endpoint base para el sandbox
const BASE_URL = 'https://supplier-api.getyourguide.com/sandbox';

console.log('--- Verificando Credenciales y Configuración ---');
console.log('GYG_USERNAME:', GYG_USERNAME);
console.log('GYG_PASSWORD:', GYG_PASSWORD ? '********' : 'No configurada');
console.log('Endpoint Base:', BASE_URL);

interface Product {
    productId: string;
    name: string;
    // Agrega otros campos según sea necesario
}

interface ApiResponse<T> {
    status: string;
    data: {
        products: T[];
    };
}

async function getProducts() {
    const endpoint = `${BASE_URL}/api/gyg/products`;
    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                Authorization: `Basic ${AUTH}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error al obtener productos: ${response.status}`);
        }

        const products = await response.json() as ApiResponse<Product>;
        console.log('Lista de Productos:', products.data.products); // Muestra la lista de productos
    } catch (error) {
        // Aserción de tipo para el error
        const errorMessage = (error as Error).message || 'Error desconocido';
        console.error('Error en la solicitud de productos:', errorMessage);
    }
}

async function testNotifyAvailability() {
    console.log('\n--- Iniciando Prueba: Notify Availability Update ---');
    const endpoint = `${BASE_URL}/api/gyg/notify-availability-update`;

    const payloadAvailability = {
        product_id: "ZT-TOUR-001", // Usa el ID real que tienes
        availability: {
            dateTime: "2025-02-01T09:00:00Z", // Asegúrate de que esté en UTC
            available: true,
            vacancies: 10, // Asegúrate de que sea un número positivo
            pricing: {
                retail: 25.00, // Asegúrate de que sea un número válido
                currency: "EUR"
            }
        }
    };

    console.log('Payload Notify Availability:', JSON.stringify(payloadAvailability, null, 2));

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${AUTH}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payloadAvailability),
        });

        const responseText = await response.text();
        console.log('Respuesta Notify Availability:', responseText);

        if (!response.ok) {
            throw new Error(`Error en el test Notify Availability: ${response.status} - ${responseText}`);
        }
    } catch (error: any) {
        console.error('Error en Notify Availability:', error.message);
    }
}

async function testCreateDeal() {
    console.log('\n--- Iniciando Prueba: Create Deal ---');
    const endpoint = `${BASE_URL}/api/gyg/deals`;

    const payloadDeal = {
        productId: "ZT-TOUR-001", // Usa el ID real que tienes
        dealType: "EARLY_BIRD", // Asegúrate de que este tipo de oferta sea válido
        discount: 15, // Asegúrate de que sea un número válido
        validFrom: "2025-02-01T00:00:00Z", // Asegúrate de que esté en UTC
        validTo: "2025-03-01T23:59:59Z" // Asegúrate de que esté en UTC
    };

    console.log('Payload Create Deal:', JSON.stringify(payloadDeal, null, 2));

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${AUTH}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payloadDeal),
        });

        const responseText = await response.text();
        console.log('Respuesta Create Deal:', responseText);

        if (!response.ok) {
            throw new Error(`Error en el test Create Deal: ${response.status} - ${responseText}`);
        }
    } catch (error: any) {
        console.error('Error en Create Deal:', error.message);
    }
}

(async () => {
    console.log('\n--- Iniciando Pruebas de GetYourGuide ---');
    await getProducts(); // Llama a la función para obtener productos
    await testNotifyAvailability();
    await testCreateDeal();
})();
