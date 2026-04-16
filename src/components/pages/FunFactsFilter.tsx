import { memo, type FC } from "react";
import { useParams } from "react-router-dom";
import { FunFactsData } from "../data/FunFactsData";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

import buttonStyles from "../css/button.module.scss";

export const FunFactsFilter: FC = memo(() => {
  const { classification } = useParams();
  const fact = FunFactsData.find((b) => b.classification === classification);

  const filteredFacts = FunFactsData.filter(
    (fact) => fact.classification === classification,
  );

  if (!fact) {
    return <div>ウサギが見つかりません</div>;
  }
  return (
    <div>
      <h1>Fun Facts - {classification}</h1>

      {filteredFacts.map((fact) => {
        return (
          <div
            key={fact.id}
            className="d-flex flex-wrap align-items-center gap-1"
          >
            <NavLink to={`/funfacts/${fact.classification}`}>
              <Button variant={fact.variant} size="sm">
                {fact.classification}
              </Button>
            </NavLink>

            <p className="my-2">{fact.fact}</p>
          </div>
        );
      })}
      <hr />
      <Button
        href="/funfacts"
        variant="outline-success"
        className={buttonStyles.clickBtn}
      >
        戻す
      </Button>
    </div>
  );
});
