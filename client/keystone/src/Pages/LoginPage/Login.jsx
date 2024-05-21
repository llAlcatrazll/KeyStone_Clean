import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Background from "../../assets/Encode _Officers/login_bg.svg"; // Make sure the path is correct
import Logo from "../../assets/dark-logo.png";
import { UserLink } from "../../App";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${UserLink}/check_user`, {
        email,
        password,
      });
      if (response.data.Login) {
        localStorage.setItem("token", response.data.token);
        // Optionally, store other user data as well
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        navigate("/landing");
      } else {
        setErrorMessage("Wrong credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center "
      style={{
        height: "100vh",
        backgroundColor: "#dddddd",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-25 bg-white shadow-lg  p-3 rounded">
        <div>
          <div className=" justify-content-center  align-items-center text-center my-2 py-5 ">
            <img src={Logo} alt="" />
          </div>
          <form action="" onSubmit={handleSubmit}>
            {/* Email input */}
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="email"
                id="form1Example13"
                className="form-control form-control-lg"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Password input */}
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
              {/* Checkbox */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="form1Example3"
                  checked
                />
                <label className="form-check-label" htmlFor="form1Example3">
                  Remember me
                </label>
              </div>
              <a href="#!">Forgot password?</a>
            </div>
            {/* Submit button */}
            <button
              type="submit"
              data-mdb-ripple-init
              className="btn btn-primary btn-lg btn-block"
              style={{ width: "100%" }}
            >
              Sign in
            </button>
            {errorMessage && <p>{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
