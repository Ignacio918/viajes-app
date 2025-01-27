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

async function testNotifyAvailability() {
  console.log('\n--- Iniciando Prueba: Notify Availability Update ---');
  const endpoint = `${BASE_URL}/notify-availability-update`;

  const payload = {
    product_id: "12345", // Producto ficticio
    availability: {
      date: "2025-01-30",
      time: "09:00:00",
      vacancies: 10,
    },
  };

  console.log('Payload:', JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${AUTH}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
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
  const endpoint = `${BASE_URL}/deals`;

  const payload = {
    deal_name: "Test Deal",
    discount: 10,
    valid_from: "2025-01-30T00:00:00Z",
    valid_to: "2025-02-15T23:59:59Z",
  };

  console.log('Payload:', JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${AUTH}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
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
  await testNotifyAvailability();
  await testCreateDeal();
})();
