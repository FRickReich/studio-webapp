import React, { useEffect, useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL, getStorage, listAll, deleteObject } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { Layout } from './../Layout';

export const Images = ({ children, ...props }) => {

    const [file, setFile] = useState();
    const [files, setFiles] = useState([]);
    const [previewURL, setPreviewURL] = useState();

    const hiddenFileInput = useRef(null);

    const storage = getStorage();
    const storageRef = ref(storage, "images");

    // progress
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        setFiles([]);

        getFiles()
    }, []);

    const getFiles = async () =>
    {
        const result = await listAll(storageRef);

        const allFiles = result.items.map(item => {
            getDownloadURL(item).then((url) =>  
            {
                setFiles(oldFiles => [...oldFiles, 
                { 
                    path: item._location.path,
                    url
                }])
            });
        });

        return allFiles;
    }

    const deleteFile = (path) =>
    {
        const deleteRef = ref(storage, path);
        
        deleteObject(deleteRef).then(() => {
            setFiles(oldFiles => oldFiles.filter(item => item.path !== path));
          }).catch((error) => {
            
          });
    }

    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }

        const storageRef = ref(storage, `/images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // getFiles();
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);

                    setPreviewURL("");
                    setPercent(0)
                    setFiles(oldFiles => [{
                        url, 
                        path: uploadTask.snapshot.ref._location.path
                    }, ...oldFiles])
                });
            }
        );
    };

    const handleChange = (event) => {
        // console.log(event.target.files[0]);
        setFile(event.target.files[0]);
    }

    const handleUploadButtonClick = () =>
    {
        hiddenFileInput.current.click();
    }

    useEffect(() => {
        if (file) {
          setPreviewURL(URL.createObjectURL(file));
        }
      }, [file]);


    return (
        <Layout title="Bilder">

            <div>
                <img className="image-preview" src={previewURL} alt="" />

                <div className="upload-bar">
                    <div className="upload-inner-bar" style={{ width: percent + "%" }}></div>
                </div>
   
                <input className="Button" type="file" onChange={handleChange} ref={hiddenFileInput} accept="/image/*" style={{ display: "none" }}/>
                <button className="Button" onClick={handleUploadButtonClick}>Datei Auswählen</button>
                <button className="Button" onClick={handleUpload}>Hochladen</button>
            </div>

            <h3>Gallerie</h3>

            {
                <ul className="image-list">
                {
                    files.map((file, i) =>
                    {
                        return(
                            <li key={i} className="image-list-item">
                                <img
                                    src={file.url}
                                    alt=""
                                />
                                <FontAwesomeIcon
                                    onClick={() => deleteFile(file.path)}
                                    className="icon"
                                    icon={faXmark}
                                />
                            </li>
                        )
                    })
                }
                </ul>
            }

        </Layout>
    )
}
