import { memo, useRef, useState, type FC } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import axios from "axios";

import buttonStyles from "../css/button.module.scss";
import type { CreateBunnyProfileType } from "../types/CreateBunnyProfileType";
import { placeholders } from "../data/BunnyProfilePlaceholders";

export const BunnyProfileCreate: FC = memo(() => {
  // データ
  const bunny = {
    name: "未知のうさぎ",
    color: "不明",
    earType: "不明",
    birthYearMonth: "??????",
    description: "A cute bunny.",
    img: "https://bunny-profile.s3.ap-northeast-1.amazonaws.com/img/default.png",
    disabled: false,
  };

  // 生年月日を年と月に分割して表示する関数
  const formatBirthYearMonth = (yearMonth: string) => {
    const year = yearMonth.slice(0, 4);
    const month = yearMonth.slice(4, 6);
    return [year, month];
  };

  // 入力値のstate
  const [name, setName] = useState(bunny.name);
  const [color, setColor] = useState(bunny.color);
  const [earType, setEarType] = useState(bunny.earType);
  const [year, setYear] = useState(
    formatBirthYearMonth(bunny.birthYearMonth)[0],
  );
  const [month, setMonth] = useState(
    formatBirthYearMonth(bunny.birthYearMonth)[1],
  );
  const [description, setDescription] = useState(bunny.description);

  const [imgData, setImgData] = useState<string>("");
  const refInputImg = useRef<HTMLInputElement>(null);

  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<boolean>(false);

  // APIに新規追加する関数
  const addBunnyProfile = (addBunny: CreateBunnyProfileType) => {
    setUploadLoading(true);
    return axios
      .post(`/api/bunny-profile`, addBunny)
      .then((res) => {
        window.location.href = "/bunnylist";
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        setUploadError(true);
        throw err;
      })
      .finally(() => setUploadLoading(false));
  };

  if (uploadLoading) {
    return <div>うさぎの情報の追加がLoading...</div>;
  }
  if (uploadError) {
    return <div>うさぎの情報の追加に失敗しました。</div>;
  }
  // 新規追加のクリックをハンドルする関数
  const onClickAddBunny = () => {
    const newBunny: CreateBunnyProfileType = {
      name: name?.trim() || bunny.name,
      color: color?.trim() || bunny.color,
      earType: earType?.trim() || bunny.earType,
      birthYearMonth: `${year}${month}`?.trim() || bunny.birthYearMonth,
      description: description?.trim() || bunny.description,
      disabled: bunny.disabled,
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

  return (
    <div>
      <h1>Bunny Profile - New</h1>
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
                  src={imgData || bunny.img}
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
            <Form.Label className="fw-bold">簡単なうさぎ紹介：</Form.Label>
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
          登録
        </Button>
        <Button
          href={`/bunnylist`}
          variant="outline-success"
          className={`${buttonStyles.clickBtn} ms-2`}
          style={{ width: "25%" }}
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
