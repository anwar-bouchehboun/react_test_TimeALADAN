import "./App.css";
import MainContext from "./components/MainContext.1";
import { Container } from "@mui/material";
function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
        }}
      >
        <Container maxWidth="xl">
          <MainContext />
        </Container>
      </div>
    </>
  );
}

export default App;
