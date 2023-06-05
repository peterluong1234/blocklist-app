import { useState } from "react";
import { BlocklistInput } from "../../utilities/blocklists-api";
import * as BlocklistAPI from "../../utilities/blocklists-api";
import styles from "../AddBlocklist/AddBlocklist.module.css"
import { User } from '../../models/user';

interface BlocklistProps {
    user: User
}
interface FormValues {
    userId: string;
    name: string;
    listOfURL?: string[];
}

const AddBlocklist = ({ user }: BlocklistProps ) => {
    const [formValues, setFormValues] = useState<FormValues>({
        userId: user._id,
        name: '',
    });

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setFormValues((prevValues) => ({
            ...prevValues,
            name: newName,
        }));
    };

    const handleInputChange = (index: number, value: string) => {
        const newValues = [...(formValues.listOfURL || [])];
        newValues[index] = value;
        setFormValues((prevValues) => ({
            ...prevValues,
            listOfURL: newValues,
        }));
    };

    const addInput = () => {
        setFormValues((prevValues) => ({
            ...prevValues,
            listOfURL: [...(prevValues.listOfURL || []), ''],
        }));
    };

    const removeInput = (index: number) => {
        const newValues = [...(formValues.listOfURL || [])];
        newValues.splice(index, 1);
        setFormValues((prevValues) => ({
            ...prevValues,
            listOfURL: newValues,
        }));
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault();
        try {
            await BlocklistAPI.createBlocklist(formValues)
            setFormValues({ userId: user._id, name: '' });
            
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.moveDown}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={formValues.name}
                    onChange={handleNameChange}
                />
            </div>

            <div>
                <label>URL(s):</label>
                {formValues.listOfURL &&
                    formValues.listOfURL.map((value, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                            />
                            <button onClick={() => removeInput(index)}>X</button>
                        </div>
                    ))}
            </div>

            <button type="button" onClick={addInput}>
                Add URL
            </button>
            <button type="submit">Submit</button>
        </form>
    );
};


export default AddBlocklist;
