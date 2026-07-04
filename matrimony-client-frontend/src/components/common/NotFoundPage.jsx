import React from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutComponent from '../layouts/LayoutComponent';
import Footer from '../Footer';
import SEOHelmet from './SEOHelmet';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEOHelmet 
        title="Page Not Found | AgapeVows"
        description="The page you are looking for could not be found."
        noindex={true}
      />
      
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div className="flex-grow flex items-center justify-center pt-32 pb-16">
        <div className="text-center px-4">
          <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Looking for your God-given match?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            It seems the page you are looking for doesn't exist or has been moved. 
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 transition-colors"
            >
              Return to Homepage
            </button>
            <button
              onClick={() => navigate('/user/user-sign-up')}
              className="px-6 py-3 bg-white text-purple-700 border-2 border-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
            >
              Create Your Profile
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
