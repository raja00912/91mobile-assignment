import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mycontext from "../../context/context";
import './profile.css'

function Profile() {
    let [allFiles, setAllFiles] = useState(JSON.parse(localStorage.getItem("files")) || [])
    let [file, setFile] = useState();
    let [user, setUser] = useContext(mycontext);
    let navigate = useNavigate();

    const CheckUser = async () => {
        let token = localStorage.getItem("token");
        if (!(token)) {
            navigate('/');
        }
    }

    useEffect(() => {
        CheckUser()
    }, [])

    const UploadFile = async () => {
        let fileArray = JSON.parse(localStorage.getItem("files")) || []
        const data = new FormData();
        data.append("file", file);
        try {
            let res = await axios.post('http://localhost:5000/upload', data)
            fileArray.push(res.data.name);
            localStorage.setItem("files", JSON.stringify(fileArray))
            setAllFiles(fileArray)
        }
        catch (error) {
            alert("Error - " + error)
        }
    }

    const DeleteFile = async (filename, index) => {
        let data = JSON.parse(localStorage.getItem("files")) || [];
        // setAllFiles((prev) => {
        //     prev.splice(index, 1);
        // })
        console.log(data);
        try {
            let res = await axios.delete(`http://localhost:5000/delete/${filename}`)
            let array = data.filter((elem, ind) => {
                if (ind != index) {
                    return elem;
                }
            })
            console.log(array)
            localStorage.setItem("files", JSON.stringify(array || []));
            setAllFiles(array || [])
        } catch (err) {
            alert("Something went wrong");
        }

    }

    return (
        <div id="profile_parent_div">
            <div>
                <h2>Name :- {user.name}</h2>
                <h2>Email :- {user.email}</h2>
            </div>
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
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Name</th>
                            <th>View</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(allFiles) ? allFiles.map((elem, ind) => {
                            return (
                                <tr key={ind + 1}>
                                    <td>{ind + 1}</td>
                                    <td>{elem}</td>
                                    <td><Link to={`http://localhost:5000/profile/${elem}`}>view</Link></td>
                                    <td><button onClick={() => {
                                        DeleteFile(elem, ind);
                                    }}>delete</button></td>
                                </tr>
                            )
                        }) : <></>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Profile