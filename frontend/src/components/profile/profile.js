import axios from "axios";
import React, { useEffect, useState } from "react";
import './profile.css'

function Profile() {
    let [file, setFile] = useState();

    const CheckToken = () => {
        let token = localStorage.getItem("token")
        console.log(token)
    }

    useEffect(() => {
        CheckToken()
    }, [])

    const UploadFile = async () => {
        console.log("yes");
        const data = new FormData();
        data.append("file", file);
        try {
            let res = await axios.post('http://localhost:5000/upload', data)
            console.log(res);
        }
        catch (error) {
            alert("Error - " + error)
        }
    }

    return (
        <div>
            <header className="app-header">
                <form action="#">
                    <label htmlFor="file" >File</label>
                    <input type="file" accept=".pdf, .excel, .csv" onChange={(event) => {
                        const file = event.target.files[0];
                        setFile(file)
                    }} />
                </form>
                <button onClick={UploadFile}>upload</button>
            </header>
        </div>
    )
}

export default Profile