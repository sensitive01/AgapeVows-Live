import React, { createContext, useState, useEffect } from 'react';
import { getPublicMasterData } from '../api/masterDataService';

export const MasterDataContext = createContext();

export const MasterDataProvider = ({ children }) => {
  const [castes, setCastes] = useState([]);
  const [denominations, setDenominations] = useState([]);
  const [loading, setLoading] = useState(true);

  // We add fallback static arrays just in case the API fails or is empty,
  // but normally we will use the API data.
  const fetchMasterData = async () => {
    try {
      const res = await getPublicMasterData();
      if (res.data?.success) {
        setCastes(res.data.data.castes);
        setDenominations(res.data.data.denominations);
      }
    } catch (err) {
      console.error("Failed to fetch master data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMasterData();
  }, []);

  return (
    <MasterDataContext.Provider value={{ castes, denominations, loading }}>
      {children}
    </MasterDataContext.Provider>
  );
};
