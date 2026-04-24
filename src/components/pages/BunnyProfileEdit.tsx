import { memo, useEffect, useRef, useState, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import axios from "axios";

import buttonStyles from "../css/button.module.scss";
import { useIdBunnyProfiles } from "../hooks/useIdBunnyProfiles";
import { placeholders } from "../data/BunnyProfilePlaceholders";
import type { EditBunnyProfileType } from "../types/EditBunnyProfileType";

export const BunnyProfileEdit: FC = memo(() => {
  //routerのnavigate関数を取得
  const navigate = useNavigate();

  // データ
  const { id } = useParams();

  const {
    bunnyProfiles: bunny,
    fetchLoading,
    fetchError,
  } = useIdBunnyProfiles(id ?? "");

  // 生年月日を年と月に分割して表示する関数
  const formatBirthYearMonth = (yearMonth: string) => {
    const year = yearMonth.slice(0, 4);
    const month = yearMonth.slice(4, 6);
    return [year, month];
  };

  // 入力値のstate
  const [name, setName] = useState("未知のうさぎ");
  const [color, setColor] = useState("不明");
  const [earType, setEarType] = useState("不明");
  const [year, setYear] = useState("????");
  const [month, setMonth] = useState("??");
  const [description, setDescription] = useState("A cute bunny.");

  const [imgData, setImgData] = useState<string>("");
  const [imgOriginal, setImgOriginal] = useState<string>(
    `https://bunny-profile.s3.ap-northeast-1.amazonaws.com/img/default.png`,
  );
  const refInputImg = useRef<HTMLInputElement>(null);

  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<boolean>(false);
  useEffect(() => {
    if (bunny) {
      setName(bunny.name);
      setColor(bunny.color);
      setEarType(bunny.earType);
      setYear(formatBirthYearMonth(bunny.birthYearMonth)[0]);
      setMonth(formatBirthYearMonth(bunny.birthYearMonth)[1]);
      setDescription(bunny.description);
      if (bunny.img) {
        setImgOriginal(
          `https://bunny-profile.s3.ap-northeast-1.amazonaws.com/${bunny.img}`,
        );
      }
    }
  }, [bunny]);

  // APIに新規追加する関数
  const addBunnyProfile = (addBunny: EditBunnyProfileType) => {
    setUploadLoading(true);
    return axios
      .put(`/api/bunny-profile/${id}`, addBunny)
      .then((res) => {
        navigate(`/bunnylist/${id}`);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        setUploadError(true);
        throw err;
      })
      .finally(() => setUploadLoading(false));
  };

  // 新規追加のクリックをハンドルする関数
  const onClickAddBunny = () => {
    const newBunny: EditBunnyProfileType = {
      name: name?.trim() || bunny?.name || "未知のうさぎ",
      color: color?.trim() || bunny?.color || "不明",
      earType: earType?.trim() || bunny?.earType || "不明",
      birthYearMonth:
        `${year}${month}`?.trim() || bunny?.birthYearMonth || "??????",
      description: description?.trim() || bunny?.description || "A cute bunny.",
    };
    if (imgData) {
      newBunny.imgData = imgData;
    }
    addBunnyProfile(newBunny);
  };

  // 画像変更の関数
  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImgData(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImgData("");
    }
  };
  // 画像変更のクリックをハンドルする関数
  const onClickInputImg = () => {
    refInputImg.current?.click();
  };

  // 戻るクリックの関数
  const onClickBack = () => {
    navigate(`/bunnylist/${id}`);
  };

  // 入力値の変更をハンドルする関数
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };
  const onChangeEarType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEarType(e.target.value);
  };
  const onChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value.length <= 4) setYear(value);
  };
  const onBlurYear = () => {
    if (year && year.length < 4 && year.length > 0) {
      setYear(year.padStart(4, "0"));
    }
  };
  const onChangeMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value.length <= 2) setMonth(value);
  };
  const onBlurMonth = () => {
    if (month && month.length === 1) {
      setMonth(month.padStart(2, "0"));
    }
  };
  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  // テキスト入力にフォーカスしたときに全選択する関数
  const onFocusChangeText = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };
  // ローディングとエラーの表示
  if (fetchLoading) {
    return <div>うさぎの情報の取得がLoading...</div>;
  }
  if (fetchError) {
    return <div>うさぎの情報の取得に失敗しました。</div>;
  }
  if (uploadLoading) {
    return <div>うさぎの情報の追加がLoading...</div>;
  }
  if (uploadError) {
    return <div>うさぎの情報の追加に失敗しました。</div>;
  }

  if (!bunny) {
    return <div>ウサギが見つかりません</div>;
  }

  return (
    <div>
      <h1>Bunny Profile - Edit</h1>
      {bunny && (
        <>
          <Container>
            <Form.Control
              size="lg"
              type="text"
              placeholder={placeholders.name}
              value={name}
              className="w-50 fw-bold mt-3"
              onChange={onChangeName}
              onFocus={onFocusChangeText}
            />
          </Container>

          <hr />
          <Container fluid className="mt-3">
            <Row>
              {/* 左側ナビゲーション 幅6/12 */}
              <Col lg={6}>
                <Row>
                  <Col
                    xs={12}
                    md={4}
                    className="fw-bold my-1 align-self-center"
                  >
                    生年：
                  </Col>
                  <Col
                    xs={12}
                    md={8}
                    className="my-1 d-flex align-items-center"
                  >
                    <Form.Control
                      size="sm"
                      type="tel"
                      className="w-25 me-2 text-center"
                      placeholder={placeholders.year}
                      value={year}
                      onChange={onChangeYear}
                      onBlur={onBlurYear}
                      onFocus={onFocusChangeText}
                    />
                    年
                    <Form.Control
                      size="sm"
                      type="tel"
                      className="w-25 ms-2 me-2 text-center"
                      placeholder={placeholders.month}
                      value={month}
                      onChange={onChangeMonth}
                      onBlur={onBlurMonth}
                      onFocus={onFocusChangeText}
                    />
                    月
                  </Col>

                  <Col
                    xs={12}
                    md={4}
                    className="fw-bold my-1 align-self-center"
                  >
                    メインカラー：
                  </Col>
                  <Col xs={12} md={8} className="my-1">
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder={placeholders.color}
                      value={color}
                      onChange={onChangeColor}
                      onFocus={onFocusChangeText}
                    />
                  </Col>

                  <Col
                    xs={12}
                    md={4}
                    className="fw-bold my-1 align-self-center"
                  >
                    耳のタイプ：
                  </Col>
                  <Col xs={12} md={8} className="my-1">
                    <Form.Select
                      aria-label="Default select example"
                      size="sm"
                      onChange={onChangeEarType}
                    >
                      <option disabled>元の選択：{bunny.earType}</option>
                      <option value="不明">不明</option>
                      <option value="立つ">立つ</option>
                      <option value="ドロップ">ドロップ</option>
                      <option value="その他">その他</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Col>

              {/* メインコンテンツ　幅6/12 */}
              <Col lg={6}>
                <img
                  src={imgData || imgOriginal}
                  alt={bunny.name}
                  className="mx-auto d-block img-fluid mt-2"
                  style={{
                    height: "200px", // 固定の高さを設定
                    objectFit: "contain",
                    width: "80%",
                  }}
                />
                <Button
                  variant="outline-success"
                  className="d-block w-100 mt-2"
                  onClick={onClickInputImg}
                >
                  画像を変更
                </Button>
              </Col>
            </Row>
          </Container>
          <hr />
          <Container>
            <Form.Label className="fw-bold">簡単な自己紹介：</Form.Label>
            <Form.Control
              type="text"
              placeholder={placeholders.description}
              value={description}
              onChange={onChangeDescription}
              onFocus={onFocusChangeText}
            />
          </Container>
        </>
      )}
      <hr />
      <Container className="d-flex">
        <Button
          variant="outline-success"
          className={`${buttonStyles.clickBtn} ms-auto`}
          style={{ width: "15%" }}
          onClick={onClickAddBunny}
        >
          更新
        </Button>
        <Button
          variant="outline-success"
          className={`${buttonStyles.clickBtn} ms-2`}
          style={{ width: "25%" }}
          onClick={onClickBack}
        >
          戻す
        </Button>
      </Container>
      <input
        type="file"
        accept="image/*"
        ref={refInputImg}
        onChange={onChangeImg}
        className="d-none"
      />
    </div>
  );
});
