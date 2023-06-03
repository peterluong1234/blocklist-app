import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as BlocklistAPI from "../../utilities/blocklists-api"
import { Blocklist as BlocklistModel } from "../../models/blocklist";
import { redirect } from "react-router-dom";

interface RouteParams {
    [key: string]: string | undefined;
}

const ViewEditBlocklist: React.FC = () => {
    const [blocklist, setBlocklist] = useState<BlocklistModel>({
        _id: '',
        name: '',
    });

    const { blocklistId } = useParams<RouteParams>();

    useEffect(() => {
        async function loadBlocklist() {
            try {
                const list = await BlocklistAPI.fetchList(blocklistId!);
                const { name, _id } = list;
                if (!name || !_id) throw new Error("Blocklist does not exist. No name or ID")
                setBlocklist(list);
                // console.log(list)
            } catch (error) {
                console.error(error);
            }
        }
        loadBlocklist();
    }, [])

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setBlocklist((prevValue) => {
            // if(!prevValue) return null;
            return { ...prevValue, name: newName }
        });
    }

    const handleURLChange = (index: number, value: string) => {
        const newURL = [...blocklist?.listOfURL || []];
        newURL[index] = value;
        setBlocklist((prevValues) => {
            // if(!prevValues) return null;
            return { ...prevValues, listOfURL: newURL }
        })
    }

    const addURL = () => {
        setBlocklist((prevValues) => ({
            ...prevValues,
            listOfURL: [...(prevValues.listOfURL || []), '']
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await BlocklistAPI.updateBlocklist(blocklist, blocklistId!)
        } catch (error) {
            console.error(error);
        }
    }

    const deleteBlocklist = async () => {
        try {
            await BlocklistAPI.deleteBlocklist(blocklistId!); 

        } catch (error) {
            console.error(error);
            alert(error);
        }
        
    }

    return (<>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input value={blocklist?.name} onChange={handleNameChange} />
            </div>
            <label>URLs:</label>
            <div>
                {
                    blocklist?.listOfURL?.map((url, index) => (
                        <div key={index}><input value={url} onChange={(e) => handleURLChange(index, e.target.value)} /></div>
                    ))
                }
            </div>
            <button type="button" onClick={addURL}>Add URL</button>
            <button type="submit">Save</button>
        </form>
        <button type="button" onClick={deleteBlocklist}>Delete</button>
    </>
    )
}

export default ViewEditBlocklist;