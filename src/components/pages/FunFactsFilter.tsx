import { memo, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FunFactsData } from "../data/FunFactsData";
import { Button, Col } from "react-bootstrap";

import buttonStyles from "../css/button.module.scss";

export const FunFactsFilter: FC = memo(() => {
  // URLパラメータから分類を取得
  const { classification } = useParams();
  // 分類に基づいてデータをフィルタリング
  const filteredFacts = FunFactsData.filter(
    (fact) => fact.classification === classification,
  );

  const navigate = useNavigate();
  const onClickBack = () => {
    navigate("/funfacts");
  };
  const onClickClassification = () => {
    navigate(`/funfacts/${classification}`);
  };

  if (!filteredFacts.length) {
    return <div>この豆知識の分類が見つかりません</div>;
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
            <Button
              variant={fact.variant}
              size="sm"
              onClick={onClickClassification}
            >
              {fact.classification}
            </Button>

            <p className="my-2">{fact.fact}</p>
          </div>
        );
      })}
      <hr />
      <Col xs={12} md={4} lg={3} className="ms-auto">
        <Button
          variant="outline-success"
          className={`${buttonStyles.clickBtn} w-100`}
          onClick={onClickBack}
        >
          戻す
        </Button>
      </Col>
    </div>
  );
});
