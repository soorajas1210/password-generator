import { useState } from "react";
import "../App.css";

import Checkbox from "../Components/Checkbox";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { BASE_URL } from "./Assets/helper";
import { Button, Grid, Paper, TextField } from "@mui/material";


function Home() {
  let token = localStorage.getItem("userToken");
  const inputStyle = { marginBottom: "16px" };
  const buttonStyle = {
    width: "100%",
    backgroundColor: "#5d645cbe",
    color: "#fff",
  };

  const [name, setName] = useState();

const handleSave = () => {
  if (name && handelText && token) {

    console.log(name, handelText);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const data = { name, handelText }; 

    axios
      .post(`${BASE_URL}/addData`, data, config)
      .then((response) => {
        console.log("Response from protected endpoint:", response.data);
      })
      .catch((error) => {
        console.error("Please login", error.message);
      });
  }
};

  const [passwordGen, setPasswordGen] = useState({
    length: 5,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });
  const [handelText, setHandelText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChangeUppercase = () => {
    setPasswordGen({
      ...passwordGen,
      uppercase: !passwordGen.uppercase,
    });
  };

  const handleChangeLowercase = () => {
    setPasswordGen({
      ...passwordGen,
      lowercase: !passwordGen.lowercase,
    });
  };

  const handleChangeNumbers = () => {
    setPasswordGen({
      ...passwordGen,
      numbers: !passwordGen.numbers,
    });
  };

  const handleChangeSymbols = () => {
    setPasswordGen({
      ...passwordGen,
      symbols: !passwordGen.symbols,
    });
  };

  const setPasswordLength = (val) => {
    setPasswordGen({
      ...passwordGen,
      length: val,
    });
  };

  function generatePassword() {
    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbolsArray = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

    const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map((code) =>
      String.fromCharCode(code)
    );
    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
    );

    const { length, uppercase, lowercase, numbers, symbols } = passwordGen;

    const generateTheWord = (
      length,
      uppercase,
      lowercase,
      numbers,
      symbols
    ) => {
      const availableCharacters = [
        ...(lowercase ? lowerCaseLetters : []),
        ...(uppercase ? upperCaseLetters : []),
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray : []),
      ];
      const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
      const characters = shuffleArray(availableCharacters).slice(0, length);
      setHandelText(characters.join(""));
      return characters;
    };

    generateTheWord(length, uppercase, lowercase, numbers, symbols);
  }

  return (
    <>
      <Navbar token={token} />

      <div className="wrapper">
        <div className="caption">
          <h1>Random Password Generator </h1>
          <h3>
            Create strong and secure passwords to keep your account safe online.
          </h3>
        </div>
        <div className="container wrapper-box">
          <h2>Password Generator</h2>
          <div className="password-box">
            <input
              type="text"
              value={handelText}
              placeholder=""
              autoComplete="off"
              onChange={(e) => setHandelText(e.target.value)}
            />
            <button
              className="copy-button"
              onClick={() => {
                if (handelText.length > 0) {
                  navigator.clipboard.writeText(handelText);
                  setCopied(true);
                  setInterval(() => {
                    setCopied(false);
                  }, 2000);
                }
              }}
            >
              {copied ? "Copied!" : "Copy text"}
            </button>
          </div>
          <br />
          <div className="word-crieteria__box">
            <div>
              <label>Password length</label>
            </div>
            <div>
              <input
                type="number"
                min="4"
                max="20"
                value={passwordGen.length}
                onChange={(e) => setPasswordLength(e.target.value)}
              />
            </div>
          </div>
          <div className="word-crieteria__box">
            <div>
              <label>Include uppercase letters</label>
            </div>
            <div>
              <Checkbox
                value={passwordGen.uppercase}
                onChange={handleChangeUppercase}
              />
            </div>
          </div>
          <div className="word-crieteria__box">
            <div>
              <label>Include lowercase letters</label>
            </div>
            <div>
              <Checkbox
                value={passwordGen.lowercase}
                onChange={handleChangeLowercase}
              />
            </div>
          </div>
          <div className="word-crieteria__box">
            <div>
              <label>Include numbers</label>
            </div>
            <div>
              <Checkbox
                value={passwordGen.numbers}
                onChange={handleChangeNumbers}
              />
            </div>
          </div>
          <div className="word-crieteria__box">
            <div>
              <label>Include symbols</label>
            </div>
            <div>
              <Checkbox
                value={passwordGen.symbols}
                onChange={handleChangeSymbols}
              />
            </div>
          </div>
          <div>
            <button className="generate-button" onClick={generatePassword}>
              Generate password
            </button>
          </div>
        </div>
        <Paper style={{ padding: "16px" }} elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                style={inputStyle}
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField value={handelText} style={inputStyle} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Button
                style={buttonStyle}
                onClick={handleSave}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Footer />
      </div>
    </>
  );
}

export default Home;
