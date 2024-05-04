// import loginpic from "/loginpic.svg";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import loginpic from "../../assets/loginpic.svg";
import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/check_user", {
        email,
        password,
      });
      if (response.data.success) {
        navigate("/landing"); // Redirect to home page or wherever you want after successful login
      } else {
        setErrorMessage("Wrong credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };
  return (
    <>
      <div className="container py-5 p-0  h-100">
        <div className="d-flex flex-row align-items-center  flex-grow-1">
          <div className="">
            <img src={loginpic} alt="" />
          </div>
          <div>
            <div className="">
              <div style={{ color: "white" }}>
                wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
              </div>
              <form action="" onSubmit={handleSubmit}>
                {/* <!-- Email input --> */}
                <div data-mdb-input-init className="form-outline mb-4 ">
                  <input
                    type="email"
                    id="form1Example13"
                    className="form-control form-control-lg vw100"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {/* <!-- Password input --> */}
                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="password"
                    id="form1Example23"
                    placeholder="Password"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-around align-items-center mb-4">
                  {/* <!-- Checkbox --> */}
                  {/* TO BE CONFIGURED */}
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="form1Example3"
                      checked
                    />
                    <label className="form-check-label" htmlFor="form1Example3">
                      {" "}
                      Remember me{" "}
                    </label>
                  </div>
                  <a href="#!">Forgot password?</a>
                </div>
                {/* <!-- Submit button --> */}
                <button
                  type="submit"
                  data-mdb-ripple-init
                  className="btn btn-primary btn-lg btn-block"
                  style={{ width: "100%" }}
                >
                  Sign in
                </button>
                {errorMessage && <p>{errorMessage}</p>}
                {/* Boundary */}
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>
                <div className="row d-flex">
                  <a
                    data-mdb-ripple-init
                    className="btn btn-primary btn-lg btn-block"
                    style={{ backgroundColor: "#3b5998", marginBottom: "5px" }}
                    href="#!"
                    role="button"
                  >
                    <i className="fab fa-facebook-f me-2"></i>Continue with
                    Facebook
                  </a>
                  <a
                    data-mdb-ripple-init
                    className="btn btn-primary btn-lg btn-block"
                    style={{ backgroundColor: "#55acee" }}
                    href="#!"
                    role="button"
                  >
                    <i className="fab fa-twitter me-2"></i>Continue with Twitter
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
