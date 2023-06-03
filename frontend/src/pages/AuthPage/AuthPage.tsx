import React, { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm"
import {User} from "../../models/user"
import LoginForm from "../../components/LoginForm/LoginForm";

interface AuthPageProps {
    setUser: (user: User | null) => void;
}

const AuthPage: React.FC<AuthPageProps> = ( { setUser }) => {
    const [loginBtn, setLoginBtn] = useState(false);

    return (
    <div>
        {
            <button onClick={() => {setLoginBtn(!loginBtn)}}>
                {loginBtn ? "Login" : "Sign Up" }
            </button>
        }   
        {
            loginBtn ? 
            <SignUpForm setUser={setUser} />
            :
            <LoginForm setUser={setUser}/>
        }
    </div>
)}

export default AuthPage;