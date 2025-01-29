# API Documentation

## Overview
Esta API permite gestionar productos turísticos, disponibilidad, reservas, ofertas y proveedores. Está diseñada para integrarse con GetYourGuide y facilitar la gestión de tours.

---

### 1. Get Products
- **Method**: GET
- **URL**: `/api/gyg/products`
- **Description**: Obtiene la lista de productos disponibles.
- **Response**:
  ```json
  {
    "status": "OK",
    "data": {
      "products": [
        {
          "productId": "ZT-TOUR-001",
          "name": "Tour del Centro Histórico",
          ...
        }
      ]
    }
  }
  ```

---

### 2. Check Availability
- **Method**: POST
- **URL**: `/api/gyg/availability`
- **Description**: Verifica la disponibilidad de un producto en un rango de fechas.
- **Parameters**:
  - `productId`: ID del producto.
  - `dateFrom`: Fecha de inicio.
  - `dateTo`: Fecha de fin.
- **Example Request**:
  ```json
  {
    "productId": "ZT-TOUR-001",
    "dateFrom": "2025-02-01",
    "dateTo": "2025-02-02"
  }
  ```
- **Response**:
  ```json
  {
    "status": "OK",
    "data": {
      "availabilities": [
        {
          "dateTime": "2025-02-01T20:10:47+00:00",
          "available": true,
          "vacancies": 8,
          ...
        }
      ]
    }
  }
  ```

---

### 3. Create Booking
- **Method**: POST
- **URL**: `/api/gyg/booking`
- **Description**: Crea una reserva para un producto específico.
- **Parameters**:
  - `productId`: ID del producto.
  - `dateTime`: Fecha y hora de la reserva.
  - `travelers`: Número de viajeros.
- **Example Request**:
  ```json
  {
    "productId": "ZT-TOUR-001",
    "dateTime": "2025-02-01T14:00:00+00:00",
    "travelers": 2
  }
  ```
- **Response**:
  ```json
  {
    "status": "OK",
    "data": {
      "bookingId": "ZT-1738096835932",
      ...
    }
  }
  ```

---

### 4. Notify Availability Update
- **Method**: POST
- **URL**: `/api/gyg/notify-availability-update`
- **Description**: Notifica una actualización de disponibilidad para un producto.
- **Parameters**:
  - `productId`: ID del producto.
  - `availability`: Objeto que contiene la información de disponibilidad.
- **Example Request**:
  ```json
  {
    "productId": "ZT-TOUR-001",
    "availability": {
      "dateTime": "2025-02-01T09:00:00+01:00",
      "available": true,
      "vacancies": 10,
      "pricing": {
        "retail": 25.00,
        "currency": "EUR"
      }
    }
  }
  ```
- **Response**:
  ```json
  {
    "status": "OK",
    "data": {
      "message": "Availability update received successfully"
    }
  }
  ```

---

### 5. Create Deals
- **Method**: POST
- **URL**: `/api/gyg/deals`
- **Description**: Crea una oferta para un producto.
- **Parameters**:
  - `productId`: ID del producto.
  - `dealType`: Tipo de oferta.
  - `discount`: Descuento de la oferta.
  - `validFrom`: Fecha de inicio de la oferta.
  - `validTo`: Fecha de fin de la oferta.
- **Example Request**:
  ```json
  {
    "productId": "ZT-TOUR-001",
    "dealType": "EARLY_BIRD",
    "discount": 15,
    "validFrom": "2025-02-01",
    "validTo": "2025-03-01"
  }
  ```
- **Response**:
  ```json
  {
    "status": "OK",
    "data": {
      "dealId": "DEAL-1738098380877",
      ...
    }
  }
  ```

---

### 6. Get Deals List
- **Method**: GET
- **URL**: `/api/gyg/deals`
- **Description**: Obtiene la lista de ofertas disponibles.
- **Response**:
  ```json
  {
    "status": "OK",
    "data": {
      "deals": [
        {
          "dealId": "DEAL-1738098380877",
          ...
        }
      ]
    }
  }
  ```

---

### 7. Delete Deal
- **Method**: DELETE
- **URL**: `/api/gyg/deals/:dealId`
- **Description**: Elimina una oferta específica.
- **Parameters**:
  - `dealId`: ID de la oferta a eliminar.
- **Response**:
  ```json
  {
    "status": "OK",
    "data": {
      "message": "Deal deleted successfully"
    }
  }
  ```

---

### 8. Supplier Registration
- **Method**: POST
- **URL**: `/api/gyg/suppliers`
- **Description**: Registra un nuevo proveedor.
- **Parameters**:
  - `supplierId`: ID del proveedor.
  - `name`: Nombre del proveedor.
  - `email`: Correo electrónico del proveedor.
  - `phone`: Teléfono del proveedor.
- **Example Request**:
  ```json
  {
    "supplierId": "SUP-001",
    "name": "Zentrip Tours",
    "email": "contact@zentrip.com",
    "phone": "+1234567890"
  }
  ```
- **Response**:
  ```json
  {
    "status": "OK",
    "data": {
      "supplierId": "SUP-001",
      ...
    }
  }
  ```

---
