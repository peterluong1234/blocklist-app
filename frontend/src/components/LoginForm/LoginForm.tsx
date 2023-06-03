import { useState } from "react";
import { User } from "../../models/user";
import * as usersService from "../../utilities/users-service";
import { useNavigate} from "react-router-dom";

interface LoginFormProps {
    setUser: (user: User) => void;
}

interface FormValues {
    username: string,
    password: string
}


const LoginForm= ({ setUser }: LoginFormProps) => {
    const nav = useNavigate();
    const [formValues, setFormValues] = useState<FormValues>({
        username: '',
        password: ''
    });

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({...prevValues, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            // console.log(formValues);
            const user = await usersService.login(formValues);
            setUser(user);
            if(user) nav("/");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" name="username" value={formValues.username} onChange={handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={formValues.password} onChange={handleChange} />
            <button type="submit">Login</button>
        </form>
)}

export default LoginForm;