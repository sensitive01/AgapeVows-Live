import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const EmployerLayout = () => {
  useEffect(() => {
    import('./../../assets/employer/assets/css/bootstrap-datetimepicker.min.css');
    import('./../../assets/employer/assets/css/bootstrap.min.css');
    import('./../../assets/employer/assets/css/dataTables.bootstrap5.min.css');
    import('./../../assets/employer/assets/css/owl.carousel.min.css');
    import('./../../assets/employer/assets/css/style.css');
    import('./../../assets/employer/assets/plugins/tabler-icons/tabler-icons.css');


    import('./../../assets/employer/assets/plugins/@simonwep/pickr/themes/nano.min.css');
    import('./../../assets/employer/assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css');
    import('./../../assets/employer/assets/plugins/daterangepicker/daterangepicker.css');
    import('./../../assets/employer/assets/plugins/fancybox/jquery.fancybox.min.css');
    import('./../../assets/employer/assets/plugins/flatpickr/flatpickr.min.css');
    import('./../../assets/employer/assets/plugins/fontawesome/css/all.min.css');
    import('./../../assets/employer/assets/plugins/fontawesome/css/fontawesome.min.css');
    import('./../../assets/employer/assets/plugins/icons/feather/feather.css');
    import('./../../assets/employer/assets/plugins/select2/css/select2.min.css');
    import('./../../assets/employer/assets/plugins/summernote/summernote-lite.min.css');

    return () => {

      const employerStyles = document.querySelectorAll('link[href*="employer"]');
      employerStyles.forEach(style => style.remove());
    };
  }, []);

  return <Outlet />;
};

export default EmployerLayout;