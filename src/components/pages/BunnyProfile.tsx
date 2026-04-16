import { memo, useState, type FC } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";

import buttonStyles from "../css/button.module.scss";
import { useIdBunnyProfiles } from "../hooks/useIdBunnyProfiles";
import axios from "axios";

export const BunnyProfile: FC = memo(() => {
  const { id } = useParams();
  const {
    bunnyProfiles: bunny,
    fetchLoading,
    fetchError,
  } = useIdBunnyProfiles(id ?? "");

  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<boolean>(false);
  // APIに削除する関数
  const deleteBunnyProfile = () => {
    setDeleteLoading(true);
    axios
      .delete(`/api/bunny-profile/${id}`)
      .then(() => {
        window.location.href = "/bunnylist";
      })
      .catch((err) => {
        console.log(err);
        setDeleteError(true);
      })
      .finally(() => setDeleteLoading(false));
  };
  // 削除のクリックをハンドルする関数
  const onClickDeleteBunny = () => {
    if (window.confirm("本当に削除しますか？")) {
      deleteBunnyProfile();
    }
  };

  if (fetchLoading) {
    return <div>うさぎの情報がLoading...</div>;
  }
  if (fetchError) {
    return <div>うさぎの情報の取得に失敗しました。</div>;
  }
  if (deleteLoading) {
    return <div>うさぎの情報の削除がLoading...</div>;
  }
  if (deleteError) {
    return <div>うさぎの情報の削除に失敗しました。</div>;
  }

  if (!bunny) {
    return <div>ウサギが見つかりません</div>;
  }
  // 生年月日を年と月に分割して表示する関数
  const formatBirthYearMonth = (yearMonth: string) => {
    const year = yearMonth.slice(0, 4);
    const month = yearMonth.slice(4, 6);
    return [year, month];
  };

  return (
    <div>
      <h1>Bunny Profile</h1>
      {bunny && (
        <>
          <Container>
            <h2>{bunny.name}</h2>
          </Container>

          <hr />
          <Container fluid className="mt-3">
            <Row>
              {/* 左側ナビゲーション 幅6割 */}
              <Col lg={6}>
                <Row>
                  <Col
                    xs={12}
                    md={4}
                    className="fw-bold my-1 align-self-center"
                  >
                    生年：
                  </Col>
                  <Col xs={12} md={8} className="my-1">
                    {formatBirthYearMonth(bunny.birthYearMonth)[0]}年
                    {formatBirthYearMonth(bunny.birthYearMonth)[1]}月
                  </Col>

                  <Col
                    xs={12}
                    md={4}
                    className="fw-bold my-1 align-self-center"
                  >
                    メインカラー：
                  </Col>
                  <Col xs={12} md={8} className="my-1">
                    {bunny.color}
                  </Col>

                  <Col
                    xs={12}
                    md={4}
                    className="fw-bold my-1 align-self-center"
                  >
                    耳のタイプ：
                  </Col>
                  <Col xs={12} md={8} className="my-1">
                    {bunny.earType}
                  </Col>
                </Row>
              </Col>

              {/* メインコンテンツ　幅6割 */}
              <Col lg={6}>
                <img
                  src={`https://bunny-profile.s3.ap-northeast-1.amazonaws.com/${bunny.img || "img/default.png"}`}
                  alt={bunny.name}
                  // style={{ width: "70%", objectFit: "contain" }}
                  className="mx-auto d-block img-fluid"
                  style={{
                    height: "200px",
                    objectFit: "contain",
                    width: "80%",
                  }}
                />
              </Col>
            </Row>
          </Container>
          <hr />
          <Container>
            <p className="fw-bold">簡単な自己紹介：</p>
            <p>{bunny.description}</p>
          </Container>
        </>
      )}
      <hr />
      <Container className="d-flex">
        <Button
          variant="outline-danger"
          className={`${buttonStyles.deleteBtn} me-auto`}
          style={{ width: "15%" }}
          onClick={onClickDeleteBunny}
          disabled={bunny.disabled}
        >
          削除
        </Button>
        <Button
          href={`/bunnylist/${id}/edit`}
          variant="outline-success"
          className={`${buttonStyles.clickBtn} ms-auto`}
          style={{ width: "15%" }}
          disabled={bunny.disabled}
        >
          編集
        </Button>
        <Button
          href="/bunnylist"
          variant="outline-success"
          className={`${buttonStyles.clickBtn} ms-2`}
          style={{ width: "25%" }}
        >
          戻す
        </Button>
      </Container>
      {bunny.disabled && (
        <div
          className="text-danger text-center mt-3"
          style={{ color: "#dc3545" }}
        >
          このうさぎは閲覧専用のため、編集や削除はできません。
        </div>
      )}
    </div>
  );
});
