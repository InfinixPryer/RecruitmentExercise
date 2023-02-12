import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './LoginPage.css'

const LoginPage = () => {
    const url = process.env.REACT_APP_ACCOUNT_LOGIN;
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userLogin, setUserLogin] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate()

    const HandleUsernameChange = (input) => {
        setUserLogin({ ...userLogin, username: input.target.value })
    }

    const HandlePasswordChange = (input) => {
        setUserLogin({ ...userLogin, password: input.target.value })
    }

    const Login = async (inputs) => {
        inputs.preventDefault();
        if (userLogin.username && userLogin.password) {

            let formBody = [];
            for (var property in userLogin) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(userLogin[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json",
                },
                body: formBody
            })
            if (response.status === 200 && !userLoggedIn) {
                setUserLoggedIn(true);
            }
        }
    }

    if (!userLoggedIn) {
        return (
            <div id="login-container">
                <div className="form-container">
                    <form className="formInput" onSubmit={(inputs) => { Login(inputs) }}>
                        <div className="input-container">
                            <label className="usernameLabel">Username</label>
                        </div>
                        <input type="text" title="usernameInput" className="usernameInput" placeholder="Enter username" name="username" value={userLogin.username} onChange={(input) => HandleUsernameChange(input)} required />
                        <div className="input-contatiner">
                            <label className="passwordLabel">Password</label>
                        </div>
                        <input type="password" title="passwordInput" className="passwordInput" placeholder="Enter password" name="pass" value={userLogin.password} onChange={(input) => HandlePasswordChange(input)} required />
                        <div className="button-container">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    } else {
        return (
            <Routes>
                <Route path="*" element={<Navigate to="/home/index/" state={userLoggedIn} />} />
            </Routes>
        )
    }
}

export default LoginPage;