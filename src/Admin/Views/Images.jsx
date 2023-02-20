import React, { useEffect, useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL, getStorage, listAll, deleteObject } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faTrash } from '@fortawesome/free-solid-svg-icons'

import { Layout } from './../Layout';
import { Button } from "../Components";

export const Images = ({ children, ...props }) => {

    const [file, setFile] = useState();
    const [files, setFiles] = useState([]);
    const [previewURL, setPreviewURL] = useState();
    const [activeImage , setActiveImage] = useState();

    const hiddenFileInput = useRef(null);

    const storage = getStorage();
    const storageRef = ref(storage, "images");

    const [percent, setPercent] = useState(0);

    useEffect(() => {
        setFiles([]);

        getFiles()
    }, []);

    useEffect(() => {
        if (file) {
          setPreviewURL(URL.createObjectURL(file));
        }
        else if(!file)
        {
            setPreviewURL();
        }
      }, [file]);

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
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);

                    setFile();
                    setPreviewURL();
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
        setFile(event.target.files[0]);
    }

    const closePreview = () =>
    {
        setActiveImage()   
    }

    const handleUploadButtonClick = () =>
    {
        hiddenFileInput.current.click();
    }

    return (
        <Layout title="Bilder">

            <h3>Bild Hochladen</h3>

            <div className="ImageUploader">
                {
                    previewURL &&
                    <img className="image-preview" src={previewURL} alt="" />
                }

                <div className="upload-bar">
                    <div className="upload-inner-bar" style={{ width: percent + "%" }}></div>
                </div>
   
                <input className="Button" type="file" onChange={handleChange} ref={hiddenFileInput} accept="/image/*" style={{ display: "none" }}/>

                <div className="interaction">
                    <Button onClick={handleUploadButtonClick}>Datei Auswählen</Button>
                    <Button success onClick={handleUpload} disabled={!file}>Hochladen</Button>
                </div>

            </div>

            <h3>Gallerie</h3>

            {
                <ul className="image-list">
                {
                    files.map((file, i) =>
                    {
                        return(
                            <li key={i} className="image-list-item">
                                <div 
                                    className="list-image"
                                    onClick={() => setActiveImage(file.url)}
                                    style={{
                                        backgroundImage: `url(${file.url})`,
                                        backgroundPosition: 'center center',
                                        backgroundSize: "cover",
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                ></div>
                                <FontAwesomeIcon
                                    onClick={() => deleteFile(file.path)}
                                    className="icon"
                                    icon={faTrash}
                                />
                            </li>
                        )
                    })
                }
                </ul>
            }

            {
                activeImage &&
                (
                    <div className="preview-zoom">
                        <div className="image" style={{ 
                            backgroundImage: `url(${ activeImage })`,
                            backgroundPosition: 'center center',
                            backgroundSize: '100%',
                            backgroundRepeat: 'no-repeat'
                            }}>
                                <FontAwesomeIcon
                                    onClick={() => closePreview()}
                                    className="cancel"
                                    icon={faXmark}
                                />
                            </div>
                    </div>
                )
            }

        </Layout>
    )
}
