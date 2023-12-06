import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import Answer from "../Answer";
import React, {useState} from "react";
import beautify from "xml-beautifier";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {first_url, second_url} from "../data/consts";


function AddAlbum() {
    const [showModal, setShowModal] = useState(false);

    const [getData, setGetData] = useState("");

    const [isNameValid, setIsNameValid] = useState(true)
    const [isCoordYValid, setIsCoordYValid] = useState(true)
    const [isCoordXValid, setIsCoordXValid] = useState(true)
    const [isNumberPartsValid, setIsNumberPartsValid] = useState(true)
    const [isDateValid, setIsDateValid] = useState(true)
    const [isGenreValid, setIsGenreValid] = useState(true)
    const [isAlbumNameValid, setIsAlbumNameValid] = useState(true)
    const [isTrackNumberValid, setIsTrackNumberValid] = useState(true)
    const [isLengthValid, setIsLengthValid] = useState(true)
    const [isSalesValid, setIsSalesValid] = useState(true)



    return (
        <div className="element">
            <h3><a style={{color: "green"}}>POST</a> /grammy/band/8/singles/add</h3>
            <h5>Создать новый объект</h5>
            <br/>

            <h4>Музыкальная группа:</h4>
            <TextField id="element-id-utils" label="ID элемента" variant="standard"/>
            <br/>

            <h4>альбом:</h4>
            <TextField id="post-element-album-util" label="Название" variant="outlined" error = {!isAlbumNameValid}
                       helperText={!isAlbumNameValid && "Поле должно быть не пустым и быть не null"}/>

            <TextField id="post-element-tracks-util" label="Количество треков" variant="outlined" error = {!isTrackNumberValid}
                       helperText={!isTrackNumberValid && "Поле должно быть числом больше 0 или null"}/>

            <TextField id="post-element-length-util" label="Длина альбома" variant="outlined" error = {!isLengthValid}
                       helperText={!isLengthValid && "Поле должно быть числом больше 0 или null"}/>

            <TextField id="post-element-sales-util" label="Sales" variant="outlined" error = {!isSalesValid}
                       helperText={!isSalesValid && "Поле должно быть числом больше 0"}/>
            <br/>


            <Button variant="text" className={"button"} onClick={send}>Run</Button>
            <Button variant="text" className={"button"} onClick={clear}>Clear</Button>

            {showModal ? <Answer getData={getData}/>: null}


        </div>
    )

    function validate() {
        var isValid = true;
        clearErrors()

        var albumField = document.getElementById("post-element-album-util")
        if (albumField.value.trim() === "") {
            isValid = false
            setIsAlbumNameValid(false)
        }

        var tracksField = document.getElementById("post-element-tracks-util")
        if (tracksField.value.trim() !== "") {
            if (isNaN(Number(tracksField.value.trim())) || Number(tracksField.value.trim()) <= 0) {
                isValid = false
                setIsTrackNumberValid(false)
            }
        }

        var lengthField = document.getElementById("post-element-length-util")
        if (lengthField.value.trim() !== "") {
            if (isNaN(Number(lengthField.value.trim())) || Number(lengthField.value.trim()) <= 0) {
                isValid = false
                setIsLengthValid(false)
            }
        }

        var salesField = document.getElementById("post-element-sales-util")
        if (isNaN(Number(salesField.value.trim())) || Number(salesField.value.trim()) <= 0 || salesField.value.trim() === "") {
            isValid = false
            setIsSalesValid(false)
        }

        return isValid
    }

    function clear() {
        setShowModal(false)
        clearErrors()
    }

    function clearErrors() {
        setIsNameValid(true)
        setIsCoordXValid(true)
        setIsCoordYValid(true)
        setIsNumberPartsValid(true)
        setIsDateValid(true)
        setIsGenreValid(true)
        setIsAlbumNameValid(true)
        setIsTrackNumberValid(true)
        setIsLengthValid(true)
        setIsSalesValid(true)
    }

    function send() {
        if (!validate()) return
        var data = generateRequestBody()

        const id = document.getElementById("element-id-utils").value
        console.log(id)

        const req = new XMLHttpRequest();
        req.addEventListener("load", getReqListener);
        req.open("POST", `${second_url}/grammy/band/${id}/singles/add`);
        req.setRequestHeader('Content-Type', 'application/xml');
        req.setRequestHeader('Accept', 'application/xml');
        req.send(data);
    }

    function getReqListener() {
        var status = this.status;
        var data = this.responseText;
        setShowModal(true)
        if (status === 200) {
            var id = data.split("<id>")[1].split("</id>")[0]
            setGetData(`Группа успешно созданна. Её идентификатор = ${id}`)
        } else {
            var message = data.split("<message>")[1].split("</message>")[0]

            setGetData("Ошибка: " + message)

        }
    }

    function generateRequestBody() {
        var album = document.getElementById("post-element-album-util").value
        var tracks = document.getElementById("post-element-tracks-util").value
        var length = document.getElementById("post-element-length-util").value
        var sales = document.getElementById("post-element-sales-util").value

        var reqBody = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n` +
            `  <bestAlbum>\n` +
            `    <name>${album}</name>\n` +
            `    <tracks>${tracks}</tracks>\n` +
            `    <length>${length}</length>\n` +
            `    <sales>${sales}</sales>\n` +
            `  </bestAlbum>\n` +
            `</element>`
        return reqBody
    }
}

export default AddAlbum;