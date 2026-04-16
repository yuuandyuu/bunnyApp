import sleepDown from "../img/sleepDown.png";
import shadow from "../img/shadow.png";
import runCome from "../img/runCome.png";
import eatingGrass from "../img/eatingGrass.png";
import halfEarLaying from "../img/halfEarLaying.png";
import cleaning from "../img/cleaning.png";
import lookBack from "../img/lookBack.png";

// 一覧取得
// https://bunnyapi.hina-zakura.com/bunny-profile GET
// https://bunnyapi.hina-zakura.com/fun-fact GET

// 1件取得
// https://bunnyapi.hina-zakura.com/bunny-profile/1 GET

// 1件追加
// https://bunnyapi.hina-zakura.com/bunny-profile POST
// {
//     name: "Bunny 8",
//     color: "白い",
//     earType: "ドロップ",
//     birthYearMonth: "202603",
//     description: "A cute brown bunny.",
//     imgData: "data:image/png;base64,..."
// }

// 1件更新(imgDataは任意。imgDataを送らない場合は既存の画像を保持)
// ※画像を更新しない場合、imgDataを設定しないでほしい
// https://bunnyapi.hina-zakura.com/bunny-profile/1 PUT
// {
//     name: "Bunny 8",
//     color: "白い",
//     earType: "ドロップ",
//     birthYearMonth: "202603",
//     description: "A cute brown bunny.",
//     imgData: "data:image/png;base64,..."
// }

// 1件削除
// https://bunnyapi.hina-zakura.com/bunny-profile/1 DELETE

// 画像
// https://bunny-profile.s3.ap-northeast-1.amazonaws.com/img/cleaning.png

export const BunnyProfileData = [
  {
    id: "1",
    name: "Bunny 1",
    color: "白い",
    earType: "ドロップ",
    birthYear: 2026,
    birthMonth: 3,
    description: "A cute white bunny.",
    img: sleepDown,
  },
  {
    id: "2",
    name: "Bunny 2",
    color: "黒い",
    earType: "立つ",
    birthYear: 2025,
    birthMonth: 6,
    description: "A cute black bunny.",
    img: shadow,
  },
  {
    id: "3",
    name: "Bunny 3",
    color: "茶色",
    earType: "立つ",
    birthYear: 2024,
    birthMonth: 10,
    description: "A cute brown bunny.",
    img: runCome,
  },
  {
    id: "4",
    name: "Bunny 4",
    color: "白い",
    earType: "ドロップ",
    birthYear: 2023,
    birthMonth: 12,
    description: "A cute white bunny.",
    img: eatingGrass,
  },
  {
    id: "5",
    name: "Bunny 5",
    color: "白い",
    earType: "立つ",
    birthYear: 2022,
    birthMonth: 5,
    description: "A cute white bunny.",
    img: halfEarLaying,
  },
  {
    id: "6",
    name: "Bunny 6",
    color: "黄色い",
    earType: "立つ",
    birthYear: 2021,
    birthMonth: 8,
    description: "A cute yellow bunny.",
    img: cleaning,
  },
  {
    id: "7",
    name: "Bunny 7",
    color: "白い",
    earType: "立つ",
    birthYear: 2020,
    birthMonth: 1,
    description: "A cute white bunny.",
    img: lookBack,
  },
];
