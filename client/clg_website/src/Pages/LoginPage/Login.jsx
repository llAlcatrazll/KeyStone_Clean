// import loginpic from "/loginpic.svg";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import loginpic from "../../assets/loginpic.svg";

import { Box, Title, Text, Button } from "@mantine/core";

function LoginPage() {
  return (
    <>
      <div className="container py-5 p-0  h-100">
        <div className="d-flex flex-row align-items-center  flex-grow-1">
          <div className="">
            {/* <img src={loginpic} alt="" /> */}
            <Box>
              <Title>Nice Title</Title>
              <Text>Hellow world</Text>
              <Button>Click Here!</Button>
              <button className="btn btn-dark">tesitn</button>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
