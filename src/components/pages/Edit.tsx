import { memo, useEffect, useState, type FC } from "react";
import { useParams } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import axios from "axios";

import { useIdBunnyProfiles } from "../hooks/useIdBunnyProfiles";
import { placeholders } from "../data/BunnyProfilePlaceholders";

export const Edit: FC = memo(() => {
  // APIデータ
  const { id } = useParams();
  const {
    bunnyProfiles: bunny,
    fetchLoading,
    fetchError,
  } = useIdBunnyProfiles(id ?? "");

  // 入力値のstate
  const [name, setName] = useState("");
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<boolean>(false);

  useEffect(() => {
    if (bunny) setName(bunny.name);
  }, [bunny]);

  // APIに新規追加する関数
  const addBunnyProfile = (addBunny: string) => {
    setUploadLoading(true);
    return axios
      .put(`/api/bunny-profile/${id}`, addBunny)
      .then((res) => {
        window.location.href = `/bunnylist/${id}`;
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        setUploadError(true);
        throw err;
      })
      .finally(() => setUploadLoading(false));
  };
  const onClickAddBunny = () => {
    const newBunny = {
      name: name?.trim() || bunny?.name || "未知のうさぎ",
    };

    addBunnyProfile(newBunny.toString());
  };
  //関数
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onFocusChangeText = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };
  //判断
  if (fetchLoading) {
    return <div>うさぎの情報の取得がLoading...</div>;
  }
  if (fetchError) {
    return <div>うさぎの情報の取得に失敗しました。</div>;
  }
  if (!bunny) {
    return <div>ウサギが見つかりません</div>;
  }
  if (uploadLoading) {
    return <div>うさぎの情報の追加がLoading...</div>;
  }
  if (uploadError) {
    return <div>うさぎの情報の追加に失敗しました。</div>;
  }
  return (
    <>
      <h1>Bunny Profile - Edit</h1>
      <p>bunny: {bunny.name}</p>
      <p>bunny:{name}</p>
      <button onClick={onClickAddBunny}>Update</button>
      <Container>
        <Form.Control
          size="lg"
          type="text"
          placeholder={placeholders.name}
          value={bunny.name}
          className="w-50 fw-bold mt-3"
          onChange={onChangeName}
          onFocus={onFocusChangeText}
        />
      </Container>
    </>
  );
});
