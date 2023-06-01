import { useState } from "react";
import { BlocklistInput } from "../../utilities/blocklists-api";
import * as BlocklistAPI from "../../utilities/blocklists-api";

// const AddBlocklist = () => {
//     const [formValues, setFormValues] = useState<BlocklistInput>({
//         name: '',
//         // listOfURL: [],
//     });

//     // interface webInput {
//     //     website: string,
//     // }
//     const [websiteList, setWebsiteList] = useState<string[]>([]);

//     // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     //     const { name, value } = e.target;
//     //     setFormValues({...formValues, [name]: value})
//     // }

//     // const handleWebInputChange = (index: number, value: string) => {
//     //     const newWebsiteList = [...(formValues.listOfURL || [])];
//     //     newWebsiteList[index] = value;
//     //     // setWebsiteList(newWebsiteList)
//     //     setFormValues((prevValues) => ({
//     //         ...prevValues,
//     //         listOfURL: newWebsiteList,
//     //     }))
//     // }


//     const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const newName = e.target.value;
//         setFormValues((prevValues) => ({
//           ...prevValues,
//           name: newName,
//         }));
//       };

//       const handleInputChange = (index: number, value: string) => {
//         const newValues = [...(formValues.listOfURL || [])];
//         newValues[index] = value;
//         setFormValues((prevValues) => ({
//           ...prevValues,
//           listOfURL: newValues,
//         }));
//       };

//     const handleSubmit = async(event: React.FormEvent<HTMLFormElement> ) => {
//         try {
//             event.preventDefault();

//             console.log(event)  
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const addInput = () => {
//         setWebsiteList([...websiteList, '']);
//     }

//     return(
//         <form id="addBlocklistForm" onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="name">Name:</label>
//                 <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formValues.name}
//                     onChange={handleNameChange}
//                 />
//             </div>
//             <div>
//                 <label>Add URL:</label>
//                 { websiteList.map((website, idx) => (
//                         <input 
//                         key={idx}
//                         type="text"
//                         // id="url"
//                         name="url"
//                         value={website}
//                         onChange={e => handleInputChange(idx, e.target.value)}
//                         placeholder="URL"
//                     />
//     ))
//                 }
//             </div>
//             <button type="button" onClick={addInput}>Add Input</button>
//             <button
//                 type="submit"
//                 id="addBlocklistForm"
//             >
//                 Save
//             </button>
//         </form>
//     )
// }

interface FormValues {
    name: string;
    listOfURL?: string[];
}

const AddBlocklist: React.FC = () => {
    const [formValues, setFormValues] = useState<FormValues>({
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
            setFormValues({ name: '' });
            
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
