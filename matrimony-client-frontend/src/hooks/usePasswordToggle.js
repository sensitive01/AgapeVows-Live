import { useState } from 'react';

export const usePasswordToggle = () => {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(!visible);
  };

  const inputType = visible ? 'text' : 'password';
  const icon = visible ? 'hide' : 'show';

  return [inputType, icon, toggle];
};