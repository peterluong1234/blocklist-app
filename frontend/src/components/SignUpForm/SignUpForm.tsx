import React, { useState } from "react";
import { signUpUser } from "../../utilities/users-service";
import {User} from "../../models/user"

interface SignUpFormProps {
    setUser: (user: User) => void;
}

interface FormValues {
	username: string,
	email: string,
	password: string,
}

const SignUpForm: React.FC<SignUpFormProps> = ({ setUser }) => {
    const [formValues, setFormValues] = useState<FormValues>({
        username: '',
        email: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({...prevValues, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = await signUpUser(formValues);
        console.log(user);
        setUser(user!);
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input type="text" name="username" value={formValues.username} onChange={handleChange} required />
            </div>
            <div>
                <label>Email</label>
                <input type="email" name="email" value={formValues.email} onChange={handleChange} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" value={formValues.password} onChange={handleChange} required />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    </div>
}

export default SignUpForm;