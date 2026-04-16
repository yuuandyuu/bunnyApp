import { memo, useEffect, useState, type FC } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

import type { FunFactsType } from "../types/FunFactsType";

export const FunFacts: FC = memo(() => {
  const [funFacts, setFunfacts] = useState<Array<FunFactsType>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const getButtonVariant = (classification: string) => {
    const buttonVariantMap: Record<string, string> = {
      Diet: "outline-success",
      Sleep: "outline-primary",
      Behavior: "outline-secondary",
      Toilet: "outline-warning",
      Breeding: "outline-danger",
    };
    return buttonVariantMap[classification] || "outline-secondary";
  };

  const fetchFunFacts = () => {
    return axios
      .get<Array<FunFactsType>>("https://bunnyapi.hina-zakura.com/fun-fact")
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        setError(true);
        throw err;
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFunFacts().then((data) => setFunfacts(data));
  }, []);

  if (loading) {
    return <div>うさぎの豆知識がLoading...</div>;
  }
  if (error) {
    return <div>うさぎの豆知識の取得に失敗しました。</div>;
  }

  return (
    <div>
      <h1>Fun Facts</h1>

      {funFacts.map((fact) => {
        return (
          <div
            key={fact.id}
            className="d-flex flex-wrap align-items-center gap-1"
          >
            <Button
              variant={getButtonVariant(fact.classification)}
              size="sm"
              href={`/funfacts/${fact.classification}`}
            >
              {fact.classification}
            </Button>

            <p className="my-2">{fact.fact}</p>
          </div>
        );
      })}
    </div>
  );
});
