import axios from "axios";
import type { BunnyProfileType } from "../types/BunnyProfileType";
import { useState, useEffect } from "react";

export const useIdBunnyProfiles = (id: string) => {
  const [bunnyProfiles, setBunnyProfiles] = useState<BunnyProfileType>();
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<boolean>(false);

  const fetchBunnyProfiles = () => {
    return axios
      .get<BunnyProfileType>(`/api/bunny-profile/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        setFetchError(true);
        throw err;
      })
      .finally(() => setFetchLoading(false));
  };

  useEffect(() => {
    fetchBunnyProfiles().then((data) => setBunnyProfiles(data));
  }, []);

  return {
    bunnyProfiles,
    fetchLoading,
    fetchError,
    refetch: fetchBunnyProfiles,
  };
};
