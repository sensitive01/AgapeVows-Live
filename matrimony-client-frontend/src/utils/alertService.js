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
  confirmButtonColor = '#7c3aed',
}) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor,
  });
};
