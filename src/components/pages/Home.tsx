import { memo, type FC } from "react";

export const Home: FC = memo(() => {
  return (
    <div>
      <h1>Home</h1>
      <p>今のウサギがありますか？</p>
    </div>
  );
});
