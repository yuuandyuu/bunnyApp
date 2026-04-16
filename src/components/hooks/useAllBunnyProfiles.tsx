import axios from "axios";
import type { BunnyProfileType } from "../types/BunnyProfileType";
import { useState, useEffect } from "react";

export const useAllBunnyProfiles = () => {
  const [bunnyProfiles, setBunnyProfiles] = useState<Array<BunnyProfileType>>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchBunnyProfiles = () => {
    return axios
      .get<Array<BunnyProfileType>>("/api/bunny-profile/")
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        setError(true);
        throw err;
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBunnyProfiles().then((data) => setBunnyProfiles(data));
  }, []);

  return { bunnyProfiles, loading, error, refetch: fetchBunnyProfiles };
};
