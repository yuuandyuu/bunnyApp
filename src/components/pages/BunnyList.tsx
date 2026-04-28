import { memo, type FC } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import buttonStyles from "../css/button.module.scss";
import { useAllBunnyProfiles } from "../hooks/useAllBunnyProfiles";

export const BunnyList: FC = memo(() => {
  const navigate = useNavigate();
  const { bunnyProfiles, loading, error } = useAllBunnyProfiles();
  const onClickCreate = () => {
    navigate("/bunnylist/create");
  };
  const onClickProfile = (id: string) => {
    navigate(`/bunnylist/${id}`);
  };

  if (loading) {
    return <div>うさぎの情報がLoading...</div>;
  }
  if (error) {
    return <div>うさぎの情報の取得に失敗しました。</div>;
  }
  return (
    <div>
      <h1>Bunny List</h1>
      {/* 新規うさぎのプロフィールを登録するためのカード */}
      <Row xs={2} sm={2} md={3} lg={4} className="g-3">
        <Col>
          <Card>
            <div style={{ height: "180px" }} className="d-flex">
              <Card.Img
                variant="top"
                src="https://bunny-profile.s3.ap-northeast-1.amazonaws.com/img/create.png"
                style={{ width: "70%", objectFit: "contain" }}
                className="mx-auto my-3"
              />
            </div>
            <Card.Body>
              <Card.Title>新しいうさぎは</Card.Title>
              <Card.Text>こちらになります₍ᐢᐢ₎</Card.Text>

              <Button
                variant="outline-success"
                className={`d-block w-100 ${buttonStyles.clickBtn}`}
                onClick={onClickCreate}
              >
                うさぎを登録
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* うさぎのプロフィールをカード形式で表示 */}
        {bunnyProfiles.map((bunny) => (
          <Col key={bunny.id}>
            <Card>
              <div style={{ height: "180px" }} className="d-flex">
                <Card.Img
                  variant="top"
                  src={`https://bunny-profile.s3.ap-northeast-1.amazonaws.com/${bunny.img || "img/default.png"}`}
                  style={{ width: "90%", objectFit: "contain" }}
                  className="mx-auto my-3"
                />
              </div>

              <Card.Body>
                <Card.Title className="d-flex align-items-center">
                  {bunny.disabled && (
                    <Badge
                      bg="danger"
                      className="flex-shrink-0" //省略防止
                      style={{ fontSize: "12px" }}
                    >
                      編集不可
                    </Badge>
                  )}
                  <span className="text-truncate">{bunny.name}</span>
                </Card.Title>

                <Card.Text className="text-truncate">
                  {bunny.description}
                </Card.Text>

                <Button
                  variant="outline-success"
                  className={`d-block w-100 ${buttonStyles.clickBtn}`}
                  onClick={() => onClickProfile(bunny.id)}
                >
                  詳細一覧
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
});
