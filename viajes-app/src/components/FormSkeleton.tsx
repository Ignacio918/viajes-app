const FormSkeleton = () => (
    <div role="status" className="w-full max-w-[500px] animate-pulse">
      {/* Logo skeleton */}
      <div className="h-16 bg-gray-200 rounded-lg dark:bg-gray-700 w-[187px] mx-auto mb-8"></div>
      
      {/* Input fields */}
      <div className="mb-6">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded-md dark:bg-gray-700 w-full"></div>
      </div>
      
      <div className="mb-6">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded-md dark:bg-gray-700 w-full"></div>
      </div>
      
      {/* Forgot password */}
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-8 ml-auto"></div>
      
      {/* Buttons */}
      <div className="space-y-4 mb-8">
        <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
      </div>
      
      {/* Sign up text */}
      <div className="flex justify-center gap-2">
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
      </div>
      
      <span className="sr-only">Cargando...</span>
    </div>
  );
  
  export default FormSkeleton;