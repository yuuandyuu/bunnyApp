import { memo, type FC } from "react";
import Button from "react-bootstrap/esm/Button";

import buttonStyles from "../css/button.module.scss";
import { useNavigate } from "react-router-dom";
import { Col } from "react-bootstrap";

export const Error404: FC = memo(() => {
  const navigate = useNavigate();
  const onClickBack = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>ここはウサギがありません。</p>
      <hr />
      <Col xs={12} md={4} lg={3} className="ms-auto">
        <Button
          variant="outline-success"
          className={`${buttonStyles.clickBtn} w-100`}
          onClick={onClickBack}
        >
          ホームページに戻す
        </Button>
      </Col>
    </div>
  );
});
