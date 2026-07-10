import Swal from 'sweetalert2';

export const confirmAction = async ({
  title = 'Are you sure?',
  text = "You won't be able to revert this!",
  icon = 'warning',
  confirmButtonText = 'Yes, proceed!',
  cancelButtonText = 'No, cancel',
  confirmButtonColor = '#7c3aed',
  cancelButtonColor = '#d33',
}) => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
  });

  return result.isConfirmed;
};

export const showAlert = ({
  title = 'Success!',
  text = '',
  icon = 'success',
  confirmButtonColor = '#58219f',
}) => {
  // Custom triangular SVG for warning
  const warningSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;

  return Swal.fire({
    title,
    text,
    icon: icon === 'warning' ? undefined : icon,
    iconHtml: icon === 'warning' ? warningSvg : undefined,
    confirmButtonColor,
    background: '#ffffff',
    color: '#333333',
    backdrop: `
      rgba(88, 33, 159, 0.15)
      backdrop-filter: blur(4px)
    `,
    padding: '2rem',
    customClass: {
      popup: 'rounded-[24px] border border-gray-100 shadow-2xl',
      title: 'text-[28px] font-bold text-[#4a2580] font-playfair mb-2',
      htmlContainer: 'text-gray-600 text-sm font-sans',
      confirmButton: 'bg-[#58219f] hover:bg-[#471b80] text-white px-8 py-3 rounded-xl font-bold shadow-md transition-all',
      icon: 'border-0 mb-2 mt-4 flex items-center justify-center'
    },
    buttonsStyling: false,
    showClass: {
      popup: 'animate__animated animate__fadeInDown animate__faster'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp animate__faster'
    }
  });
};
export const showOtpAlert = async ({
  title = 'Verify Email',
  text = 'Please enter the OTP sent to your email',
  confirmButtonText = 'Verify',
  confirmButtonColor = '#7c3aed',
}) => {
  const { value: otp } = await Swal.fire({
    title,
    text,
    input: 'text',
    inputLabel: 'OTP',
    inputPlaceholder: 'Enter 4-digit OTP',
    inputAttributes: {
      autocomplete: 'one-time-code',
      autocorrect: 'off',
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonColor,
    confirmButtonText,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to enter the OTP!';
      }
      if (value.length !== 4) {
        return 'OTP must be 4 digits';
      }
    }
  });

  return otp;
};
