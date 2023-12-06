import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import Answer from "../Answer";
import React, {useState} from "react";
import beautify from "xml-beautifier";
import CodeEditor from "@uiw/react-textarea-code-editor";
import app from "../App";
import {first_url} from "../data/consts";


function UpdateRequest() {
    const [showModal, setShowModal] = useState(false);

    const [answer, setAnswer] = useState("");

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
            <h3><a style={{color: "orange"}}>PUT</a> /musicbands/id</h3>
            <h5>Обновить элемент</h5>

            <TextField id="element-id-upd" label="ID элемента" variant="outlined"/>
            <br/>
            <br/>

            <h4>Музыкальная группа:</h4>

            <TextField id="put-element-name" label="Имя группы" variant="outlined" error = {!isNameValid}
                       helperText={!isNameValid && "Имя должно быть не пустым"}/>

            <TextField id="put-element-coordX" label="Координата X" variant="outlined" error = {!isCoordXValid}
                       helperText={!isCoordXValid && "Поле должно быть числом и не null"}/>

            <TextField id="put-element-coordY" label="Координата Y" variant="outlined" error = {!isCoordYValid}
                       helperText={!isCoordYValid && "Поле должно быть числом не более 967 и не null"}/>
            <br/>


            <TextField id="put-element-numberParts" label="Количество участников" variant="outlined" error = {!isNumberPartsValid}
                       helperText={!isNumberPartsValid && "Поле должно быть числом более 0 и не null"}/>

            <TextField id="put-element-description" label="Описание группы" variant="outlined" />
            <br/>


            <TextField id="put-element-date" label="Дата создания (YYYY-MM-DD)" variant="outlined" error = {!isDateValid}
                       helperText={!isDateValid && "Поле не null"}/>


            <TextField id="put-element-genre" label="Жанр" variant="outlined" error = {!isGenreValid}
                       helperText={!isGenreValid && "Поле должно быть не null"}/>
            <br/><br/>

            <h4>Их лучший альбом:</h4>
            <TextField id="put-element-album" label="Название" variant="outlined" error = {!isAlbumNameValid}
                       helperText={!isAlbumNameValid && "Поле должно быть не пустым и быть не null"}/>

            <TextField id="put-element-tracks" label="Количество треков" variant="outlined" error = {!isTrackNumberValid}
                       helperText={!isTrackNumberValid && "Поле должно быть числом больше 0 или null"}/>

            <TextField id="put-element-length" label="Длина альбома" variant="outlined" error = {!isLengthValid}
                       helperText={!isLengthValid && "Поле должно быть числом больше 0 или null"}/>

            <TextField id="put-element-sales" label="Sales" variant="outlined" error = {!isSalesValid}
                       helperText={!isSalesValid && "Поле должно быть числом больше 0"}/>
            <br/>
            {/*<CodeEditor value={body} onChange={e => setBody(e.target.value)} id="data" language="xml" data-color-mode="dark" style={{fontwhiteSpace: "pre-wrap"}}/>*/}

            <Button variant="text" className={"button"} onClick={get}>Run</Button>
            <Button variant="text" className={"button"} onClick={ () => setShowModal(false)}>Clear</Button>

            {showModal ? <Answer getData={answer}/>: null}


        </div>
    )

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

    function validate() {
        var isValid = true;
        clearErrors()

        var nameField = document.getElementById("put-element-name")
        if (nameField.value.trim() === "") {
            isValid = false
            setIsNameValid(false)
        }

        var coordXField = document.getElementById("put-element-coordX")
        if (isNaN(Number(coordXField.value.trim())) || coordXField.value.trim() === "") {
            isValid = false
            setIsCoordXValid(false)
        }

        var coordYField = document.getElementById("put-element-coordY")
        if (isNaN(Number(coordYField.value.trim())) || Number(coordYField.value.trim()) > 967 || coordYField.value.trim() === "") {
            isValid = false
            setIsCoordYValid(false)
        }

        var numberPartsField = document.getElementById("put-element-numberParts")
        if (isNaN(Number(numberPartsField.value.trim())) || Number(numberPartsField.value.trim()) <= 0 || numberPartsField.value.trim() === "") {
            isValid = false
            setIsNumberPartsValid(false)
        }

        var dateField = document.getElementById("put-element-date")
        if (dateField.value.trim() === "") {
            isValid = false
            setIsDateValid(false)
        }

        var genreField = document.getElementById("put-element-genre")
        if (genreField.value.trim() === "") {
            isValid = false
            setIsGenreValid(false)
        }

        var albumField = document.getElementById("put-element-album")
        if (albumField.value.trim() === "") {
            isValid = false
            setIsAlbumNameValid(false)
        }

        var tracksField = document.getElementById("put-element-tracks")
        if (tracksField.value.trim() !== "") {
            if (isNaN(Number(tracksField.value.trim())) || Number(tracksField.value.trim()) <= 0) {
                isValid = false
                setIsTrackNumberValid(false)
            }
        }

        var lengthField = document.getElementById("put-element-length")
        if (lengthField.value.trim() !== "") {
            if (isNaN(Number(lengthField.value.trim())) || Number(lengthField.value.trim()) <= 0) {
                isValid = false
                setIsLengthValid(false)
            }
        }

        var salesField = document.getElementById("put-element-sales")
        if (isNaN(Number(salesField.value.trim())) || Number(salesField.value.trim()) <= 0 || salesField.value.trim() === "") {
            isValid = false
            setIsSalesValid(false)
        }


        return isValid
    }

    function get() {
        if (!validate()) return
        var data = generateRequestBody()
        const id = document.getElementById("element-id-upd").value
        const req = new XMLHttpRequest();
        req.addEventListener("load", getReqListener);
        req.open("PUT", `${first_url}/musicbands/` + id);
        req.setRequestHeader('Content-Type', 'application/xml');
        req.setRequestHeader('Accept', 'application/xml');
        req.setRequestHeader('Access-Control-Allow-Origin', '*');
        req.setRequestHeader('Accept-Language', 'ru');
        console.log(data)
        req.send(data);
    }

    function getReqListener() {
        var status = this.status;
        var data = this.responseText;
        setShowModal(true)
        console.log(this.status)
        if (status === 200) {
            var id = data.split("<id>")[1].split("</id>")[0]

            setAnswer(`Группа успешно обновлена. Её идентификатор = ${id}`)
        } else {
            var message = data.split("<message>")[1].split("</message>")[0]
            setAnswer("Ошибка: " + message)
        }
    }

    function generateRequestBody() {
        var name = document.getElementById("put-element-name").value
        var coordX = document.getElementById("put-element-coordX").value
        var coordY = document.getElementById("put-element-coordY").value

        var numberParts = document.getElementById("put-element-numberParts").value
        var description = document.getElementById("put-element-description").value

        var date = document.getElementById("put-element-date").value
        var genre = document.getElementById("put-element-genre").value

        var album = document.getElementById("put-element-album").value
        var tracks = document.getElementById("put-element-tracks").value
        var length = document.getElementById("put-element-length").value
        var sales = document.getElementById("put-element-sales").value

        var reqBody = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n` +
            `<element>\n` +
            `  <name>${name}</name>\n` +
            `  <coordinates>\n` +
            `    <x>${coordX}</x>\n` +
            `    <y>${coordY}</y>\n` +
            `  </coordinates>\n` +
            `  <numberOfParticipants>${numberParts}</numberOfParticipants>\n` +
            `  <description>${description}</description>\n` +
            `  <establishmentDate>${date}</establishmentDate>\n` +
            `  <genre>${genre}</genre>\n` +
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

export default UpdateRequest;