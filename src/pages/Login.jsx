import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "components/custom/CustomInput";
import CustomButton from "components/custom/CustomButton";
import { useColors } from "context/ColorContext";
import axiosInstance, { loginApi } from "axiosInstance";

import XIcon from "assets/icons/x-mark.svg";
import Logo from "assets/logo/logo.svg";
import LogoName from "assets/logo/logo_name.svg";
import AppleLogo from "assets/logo/logo-Apple.svg";
import GoogleLogo from "assets/logo/logo-Google.svg";

const Login = () => {
  const colors = useColors();
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [autoLogin, setAutoLogin] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await loginApi(emailValue, passwordValue);

      const { accessToken, refreshToken } = response.data;

      // JWT 토큰을 Authorization 헤더에 담아서 저장
      axiosInstance.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

      // 리프레시 토큰을 쿠키에 저장
      if (autoLogin) {
        document.cookie = `refreshToken=${refreshToken}; path=/; max-age=604800`; // 쿠키에 리프레시 토큰 저장 (1주일)
      }

      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error.response || error.message);
      alert("로그인 실패. 이메일 또는 비밀번호를 확인해주세요.");
    }
  };

  return (
    <Wrapper>
      <LoginWrapper>
        <NavTitle>
          Login
          <Link to="/">
            <img src={XIcon} alt="x-icon" />
          </Link>
        </NavTitle>
        <Container>
          <LogoContainer>
            <Link to="/">
              <LogoBox>
                <img src={Logo} alt="logo" />
                <img src={LogoName} alt="logo-name" />
              </LogoBox>
            </Link>
            <Script>
              Find the perfect space for your cherished moments with Kong tour
            </Script>
          </LogoContainer>
          <LoginForm>
            <CustomInput
              labelText={"Email"}
              placeholder={"Email"}
              type={"email"}
              onChange={setEmailValue}
              validateType={"email"}
            />
            <CustomInput
              labelText={"Password"}
              placeholder={"Password"}
              type={"password"}
              onChange={setPasswordValue}
              validateType={"password"}
            />

            <CheckboxContainer>
              <CheckboxLabel>
                <Checkbox type="checkbox" />
                Auto Login
              </CheckboxLabel>
              <Link to="/find-password">
                <PasswordLink>Forgot Password?</PasswordLink>
              </Link>
            </CheckboxContainer>

            <CustomButton fontWeight={"600"}>Login</CustomButton>
            <Link to="/sign-up">
              <CustomButton
                bgColor={"#fff"}
                textColor={"#333"}
                borderColor={"#ccc"}
                fontWeight={"600"}
              >
                Sign up
              </CustomButton>
            </Link>
          </LoginForm>

          <OauthContainer>
            <OauthText>Other ways to sign in</OauthText>
            <CustomButton
              bgColor={"#fff"}
              textColor={"#666"}
              padding={"0.5rem"}
              fontSize={"0.9rem"}
              imageSrc={GoogleLogo}
              shadow={"0px 2px 5px rgba(0, 0, 0, 0.2)"}
            >
              Sign in with Goolgle
            </CustomButton>
            <CustomButton
              bgColor={"#000"}
              textColor={"#fff"}
              padding={"0.5rem"}
              fontSize={"0.9rem"}
              imageSrc={AppleLogo}
            >
              Sign in with Apple
            </CustomButton>
            <PolicyText color={colors.sub}>
              By continueting, you agree to Kong tour Terms of use, read use
              Privacy Policy.
            </PolicyText>
          </OauthContainer>
        </Container>
      </LoginWrapper>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoginWrapper = styled.div`
  width: 30%;
  height: 95%;
  border: 2px solid #ececec;
  border-radius: 1rem;
  margin: auto;
  overflow: hidden;
`;
const NavTitle = styled.div`
  height: 8%;
  padding: 0 1rem;
  background-color: #ececec;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  img {
    cursor: pointer;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }
`;

const Container = styled.div`
  padding: 2rem 1rem;
`;

const LogoContainer = styled.div`
  width: 60%;
  margin: auto;
  margin-bottom: 2rem;
`;
const LogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;
const Script = styled.p`
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.8;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Checkbox = styled.input``;
const CheckboxLabel = styled.label`
  font-size: 0.8rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  cursor: pointer;
`;
const PasswordLink = styled.span`
  font-size: 0.8rem;
  color: #666;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const OauthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;
const OauthText = styled.p`
  font-size: 0.8rem;
`;
const PolicyText = styled.p`
  width: 80%;
  text-align: center;
  font-size: 0.9rem;
  line-height: 1.8;
  color: ${(props) => props.color};
`;
