import { useState, useRef, use, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const passwordRef = useRef(null);
  const [commonPassword, setcommonPassword] = useState([]);
useEffect(() => {
  fetch("/assets/CommonPasswords.txt")
    .then((res) => res.text())
    .then((text) => {
      const list = text.split("\n").map(i => i.trim());
      setcommonPassword(list); 
    });
}, []);

  
  const checkpass = (e) => {
    e.preventDefault();
    let password = passwordRef.current.value;
    const newMessages = [];

    const patternUpper = /[A-Z]/;
    const patternLower = /[a-z]/;
    const patternCommon = /[A-Z]|[a-z][W][123]]/
    const patternDigit = /\d/;
    const patternSpecial = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < 8) {
      newMessages.push("❌ Must contain at least 8 characters");
    }
    if (!patternUpper.test(password)) {
      newMessages.push("❌ Must include an uppercase letter");
    }
    if (!patternCommon.test(password)) {
      newMessages.push("❌ Too Common");
    }
    if (!patternLower.test(password)) {
      newMessages.push("❌ Must include a lowercase letter");
    }
    if (!patternDigit.test(password)) {
      newMessages.push("❌ Must include a number");
    }
    if (!patternSpecial.test(password)) {
      newMessages.push("❌ Must include a special character");
    }

    if (newMessages.length === 0) {
      newMessages.push("✅ Strong Password!");
    }



    if(commonPassword.includes(password)){
      newMessages.push("❌ Too common password")
    }



    setMessages(newMessages);

  };

  return (
    <div className="container">
      <div className="content">
        <form>
          <label className="form-title">Password Strength Checker</label>
          <input
            type="password"
            placeholder="Enter Password"
            ref={passwordRef}
          />
          <button type="submit" onClick={checkpass}>
            Check
          </button>

          <p>
            {messages.map((message, index) => (
              <span key={index}>{message}<br/></span>
            ))}
          </p>
        </form>
      </div>
    </div>
  );
}

export default App;
  