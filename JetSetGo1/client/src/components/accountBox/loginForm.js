import React, { useContext, useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import { jwtDecode } from "jwt-decode"; // Fix import name
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  LineText,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from './accountContext';

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  // State for login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for Forgot Password
  const [forgotUsername, setForgotUsername] = useState("");
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Toggle view

  // Login handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    fetch("http://localhost:8000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then(data => {
        if (data.token) {
          Cookies.set("auth_token", data.token, { expires: 7 });
          const decodedToken = jwtDecode(data.token);
          const { id, userType } = decodedToken;
          console.log("User ID:", id);
          console.log("User Type:", userType);
        } else {
          alert("Login failed: No token received.");
        }
      })
      .catch(error => console.error("Error logging in:", error));
  };

  // Forgot Password handler
  const handleForgotPassword = async () => {
    setForgotPasswordMessage("");
    try {
      // Fetch email by username
      const emailResponse = await fetch('http://localhost:8000/user/getmail', {
        method: "POST", // Use POST instead of GET
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email }), // Include username in the body
      });
      if (!emailResponse.ok) {
        throw new Error("Failed to fetch email for username");
      }

      const emailData = await emailResponse.json();
      const userEmail = emailData.email;
      setForgotPasswordMessage(`Password reset email sent to ${userEmail}.`);
    } catch (error) {
      setForgotPasswordMessage(error.message || "Error during password reset process.");
    }
  };


  return (
    <BoxContainer>
      {!isForgotPassword ? (
        <>
          <FormContainer>
            <Input
              type="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormContainer>
          <Marginer direction="vertical" margin={10} />
          <MutedLink href="#" onClick={() => setIsForgotPassword(true)}>
            Forget your password?
          </MutedLink>
          <Marginer direction="vertical" margin="1.6em" />
          <SubmitButton type="submit" onClick={handleSubmit}>
            Signin
          </SubmitButton>
          <Marginer direction="vertical" margin="5px" />
          <LineText>
            Don't have an account?{" "}
            <BoldLink onClick={switchToSignup} href="#">
              Signup
            </BoldLink>
          </LineText>
        </>
      ) : (
        <>
          <FormContainer>
            <Input
              type="text"
              placeholder="Enter your username"
              value={forgotUsername}
              onChange={(e) => setForgotUsername(e.target.value)}
            />
          </FormContainer>
          <Marginer direction="vertical" margin="10px" />
          <SubmitButton onClick={handleForgotPassword}>
            Send Reset Email
          </SubmitButton>
          {forgotPasswordMessage && (
            <div style={{ marginTop: "10px", color: forgotPasswordMessage.includes("sent") ? "green" : "red" }}>
              {forgotPasswordMessage}
            </div>
          )}
          <Marginer direction="vertical" margin="10px" />
          <MutedLink href="#" onClick={() => setIsForgotPassword(false)}>
            Back to Login
          </MutedLink>
        </>
      )}
    </BoxContainer>
  );
}
