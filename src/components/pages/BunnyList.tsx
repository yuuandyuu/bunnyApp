import { memo, type FC } from "react";
import { Button, Card } from "react-bootstrap";

import buttonStyles from "../css/button.module.scss";
import { useAllBunnyProfiles } from "../hooks/useAllBunnyProfiles";

export const BunnyList: FC = memo(() => {
  const { bunnyProfiles, loading, error } = useAllBunnyProfiles();

  if (loading) {
    return <div>うさぎの情報がLoading...</div>;
  }
  if (error) {
    return <div>うさぎの情報の取得に失敗しました。</div>;
  }
  return (
    <div>
      <h1>Bunny List</h1>
      <div className="d-flex flex-wrap gap-3">
        {/* 新規うさぎのプロフィールを登録するためのカード */}
        <div>
          <Card style={{ width: "13rem" }}>
            <div style={{ height: "180px" }} className="d-flex">
              <Card.Img
                variant="top"
                src="https://bunny-profile.s3.ap-northeast-1.amazonaws.com/img/create.png"
                style={{ width: "70%", objectFit: "contain" }}
                className="mx-auto my-3"
              />
            </div>
            <Card.Body>
              <Card.Title>新しいうさぎは～</Card.Title>
              <Card.Text>こちらになります₍ᐢᐢ₎</Card.Text>

              <div className="d-grid gap-2">
                <Button
                  variant="outline-success"
                  className={buttonStyles.clickBtn}
                  href="/bunnylist/new"
                >
                  うさぎを登録
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* うさぎのプロフィールをカード形式で表示 */}
        {bunnyProfiles.map((bunny) => (
          <div key={bunny.id}>
            <Card style={{ width: "13rem" }}>
              <div style={{ height: "180px" }} className="d-flex">
                <Card.Img
                  variant="top"
                  src={`https://bunny-profile.s3.ap-northeast-1.amazonaws.com/${bunny.img || "img/default.png"}`}
                  style={{ width: "70%", objectFit: "contain" }}
                  className="mx-auto my-3"
                />
              </div>

              <Card.Body>
                <Card.Title>
                  {bunny.name}
                  <span style={{ fontSize: "14px", color: "#dc3545" }}>
                    {bunny.disabled && " (編集不可)"}
                  </span>
                </Card.Title>
                <Card.Text className="text-truncate">
                  {bunny.description}
                </Card.Text>

                <div className="d-grid gap-2">
                  <Button
                    variant="outline-success"
                    className={buttonStyles.clickBtn}
                    href={`/bunnylist/${bunny.id}`}
                  >
                    詳細一覧
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
});
