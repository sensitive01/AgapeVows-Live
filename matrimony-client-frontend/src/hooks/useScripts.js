import { useEffect } from 'react';

const useScripts = () => {
  useEffect(() => {
    // Initialize any scripts that need to run on page load
    // You might want to convert these to React components or hooks
  }, []);
};

export default useScripts;

// src/hooks/useScripts.js

// import { useEffect } from 'react';

// const useScripts = () => {
//   useEffect(() => {
//     const scripts = [
//       '/assets/js/jquery-3.6.4.min.js',
//       '/assets/js/popper.min.js',
//       '/assets/js/bootstrap.min.js',
//       '/assets/js/fontawesome.min.js',
//       '/assets/js/all.min.js',
//       '/assets/js/jquery.main.js',
//       '/assets/js/vendor.js'
//     ];

//     scripts.forEach(src => {
//       // Check if script is already loaded
//       if (document.querySelector(`script[src="${src}"]`)) return;

//       const script = document.createElement('script');
//       script.src = src;
//       script.async = true;
//       document.body.appendChild(script);
//     });

//     // Cleanup not strictly needed for layout component
//     // since it's unlikely to unmount
//   }, []);
// };

// export default useScripts;