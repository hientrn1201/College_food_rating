import {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import "./Auth.css";


export const Auth = () => {
    const [loginUser, setLoginUser] = useState({username: '', password: ''});
    const [signUpUser, setSignUpUser] = useState({username: '', password: ''});
    const auth = useAuth();
    const history = useHistory();
    const {currentUser} = useAuth();

    const handleLogin = async () => {
        try {
            await auth.login(loginUser.username, loginUser.password);
            history.push('/');
        } catch (err) {
            if (err.request && err.request.response) {
                console.log(JSON.parse(err.request.response).message);
                alert(JSON.parse(err.request.response).message);
            } else {
                console.log(err);
                alert(err);
            }
        }

    };

    const handleSignUp = async () => {
        try {
            await auth.signup(signUpUser.username, signUpUser.password);
            alert("Sign up successful!")
            history.push('/')
        } catch (err) {
            if (err.response) {
                alert(err.response.data.message);
            } else if (err.request) {
                console.log(err.request);
                alert("Network error or no response from the server");
            } else {
                console.log('Error', err.message);
                alert("Error during the request setup: " + err.message);
            }
        }
    };

    useEffect(() => {
        if (currentUser && !signUpUser.username) {
            history.push('/');
        }
    }, [currentUser, signUpUser.username, history]);

    if (currentUser) {
        return null;
    }

    return (
        (
            <div className="auth-container">
                <form className="auth-form">
                    <h2>Login</h2>
                    <label>Username:</label>
                    <input
                        type="text"
                        onChange={(e) => setLoginUser({...loginUser, username: e.target.value})}
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        onChange={(e) => setLoginUser({...loginUser, password: e.target.value})}
                    />
                    <button type="button" onClick={handleLogin}>Login</button>
                </form>

                <form className="auth-form">
                    <h2>Sign Up</h2>
                    <label>Username:</label>
                    <input
                        type="text"
                        onChange={(e) => setSignUpUser({...signUpUser, username: e.target.value})}
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        onChange={(e) => setSignUpUser({...signUpUser, password: e.target.value})}
                    />
                    <button type="button" onClick={handleSignUp}>Sign Up</button>
                </form>
            </div>
        )
    );
};
