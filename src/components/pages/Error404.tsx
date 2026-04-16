import { memo, type FC } from "react";

export const Error404: FC = memo(() => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>ここはウサギがありません。</p>
    </div>
  );
});
