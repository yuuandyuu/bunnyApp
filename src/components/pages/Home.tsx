import { memo, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container } from "react-bootstrap";

import buttonStyles from "../css/button.module.scss";

export const Home: FC = memo(() => {
  const navigate = useNavigate();
  const onClickBunnyList = () => {
    navigate("/bunnylist");
  };

  return (
    <>
      <Container className="py-4 py-md-5">
        {/* タイトル */}
        <div className="mb-5">
          <h1>うさぎコレクション</h1>
          <p>好きなうさぎの画像を、1枚ずつ集めていこう。</p>
        </div>

        {/* セクション 1（サイトの役割） */}
        <div className="mb-5">
          <p>
            このサイトでは、誰でも自由にうさぎの画像を追加できます。
            <br />
            みんなで投稿すればするほど、うさぎコレクションがどんどん豊かになっていきます。
            <br />
            下のボタンをクリックして、あなたの好きなうさぎを投稿してみてください。
          </p>

          {/* ボタン：うさぎコレクションへ行く */}
          <Col xs={12} md={4} lg={3} className="me-auto">
            <Button
              variant="outline-success"
              className={`d-block w-100 ${buttonStyles.clickBtn}`}
              onClick={onClickBunnyList}
            >
              うさぎコレクションへ行く
            </Button>
          </Col>
        </div>

        {/* セクション 2（技術紹介） */}
        <div className="mb-5">
          <div>
            <span>✨</span>
            <span>このページの技術的な特徴</span>
          </div>

          <ul>
            <li>レスポンシブ対応（スマホ・タブレット・PC）</li>
            <li>React × Bootstrap CSS × CSS Modules の混在</li>
            <li>API を使ったデータ連携</li>
            <li>コンポーネント単位で整理されたコード構造</li>
          </ul>

          <div className="mt-4 text-secondary fst-italic">
            「うーん…、すごすぎるとは言えないけれど、
            <br />
            『このうさぎサイト、ちょっと面白い』って思ってもらえたら嬉しいです。」
          </div>
        </div>
      </Container>
    </>
  );
});
