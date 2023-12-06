import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import Answer from "../Answer";
import React, {useState} from "react";
import beautify from "xml-beautifier";
import {first_url} from "../data/consts";


function DeleteRequest() {
    const [showModal, setShowModal] = useState(false);

    const [getData, setGetData] = useState("");
    return (
        <div className="element">
            <h3><a style={{color: "red"}}>DELETE</a> /musicbands/id</h3>
            <h5>Получить элемент по id</h5>

            <TextField id="element-id-del" label="ID элемента" variant="standard"/>
            <br/>


            <Button variant="text" className={"button"} onClick={get}>Run</Button>
            <Button variant="text" className={"button"} onClick={ () => setShowModal(false)}>Clear</Button>

            {showModal ? <Answer getData={getData}/>: null}

        </div>
    )

    function get() {
        const id = document.getElementById("element-id-del").value
        const req = new XMLHttpRequest();
        req.addEventListener("load", getReqListener);
        req.open("DELETE", `${first_url}/musicbands/` + id);
        req.send();
    }

    function getReqListener() {
        var data = this.responseText.trim();
        setShowModal(true)

        if (this.status === 204) {
            setGetData("OK")
        } else {
            var message = data.split("<message>")[1].split("</message>")[0]
            setGetData("Ошибка: " + message)

        }
    }
}

export default DeleteRequest;