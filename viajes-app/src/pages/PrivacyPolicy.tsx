const PrivacyPolicy = () => {
    return (
      <div className="container-spacing py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Política de Privacidad</h1>
        <p className="mb-4 text-gray-600">
          En Zentrip, nos comprometemos a proteger la privacidad de nuestros usuarios.
          Esta política describe cómo recolectamos, usamos y protegemos su información personal.
        </p>
        <p className="mb-4 text-gray-600">
          • Recopilamos información básica necesaria para el funcionamiento del servicio.
        </p>
        <p className="mb-4 text-gray-600">
          • Tu información está segura y no será compartida con terceros sin tu consentimiento.
        </p>
        <p className="mb-4 text-gray-600">
          • Puedes solicitar la eliminación de tus datos en cualquier momento.
        </p>
        <p className="text-sm text-gray-500">
          Última actualización: {new Date().toLocaleDateString()}
        </p>
      </div>
    );
  };
  
  export default PrivacyPolicy;