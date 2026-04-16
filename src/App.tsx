// import "./App.css";

import { HeaderLayout } from "./components/layout/HeaderLayout";
import { MainLayout } from "./components/layout/MainLayout";
import { Router } from "./router/Router";

function App() {
  return (
    <>
      <HeaderLayout>
        <MainLayout>
          <Router />
        </MainLayout>
      </HeaderLayout>
    </>
  );
}

export default App;
