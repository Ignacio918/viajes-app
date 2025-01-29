import React from 'react';
const TermsOfService = () => {
    return (
      <div className="container-spacing py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Términos de Servicio</h1>
        <p className="mb-4 text-gray-600">
          Al usar Zentrip, aceptas estos términos de servicio en su totalidad.
          Por favor, lee cuidadosamente estos términos antes de usar nuestra plataforma.
        </p>
        <p className="mb-4 text-gray-600">
          • El servicio se proporciona "tal cual" sin garantías de ningún tipo.
        </p>
        <p className="mb-4 text-gray-600">
          • Nos reservamos el derecho de modificar o discontinuar el servicio en cualquier momento.
        </p>
        <p className="mb-4 text-gray-600">
          • Los usuarios son responsables de mantener la seguridad de sus cuentas.
        </p>
        <p className="text-sm text-gray-500">
          Última actualización: {new Date().toLocaleDateString()}
        </p>
      </div>
    );
  };
  
  export default TermsOfService;