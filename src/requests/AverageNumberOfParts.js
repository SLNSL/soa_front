import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import Answer from "../Answer";
import React, {useState} from "react";
import beautify from "xml-beautifier";
import {first_url, second_url} from "../data/consts";


function AverageNumberOfParts() {
    const [showModal, setShowModal] = useState(false);

    const [getData, setGetData] = useState("");
    return (
        <div className="element">
            <h3><a style={{color: "green"}}>POST</a> /musicbands-util/average-number-of-participants</h3>
            <h5>Среднее значение поля numberOfParticipants для всех объектов</h5>

            <Button variant="text" className={"button"} onClick={get}>Run</Button>
            <Button variant="text" className={"button"} onClick={ () => setShowModal(false)}>Clear</Button>

            {showModal ? <Answer getData={getData}/>: null}

        </div>
    )

    function get() {
        const req = new XMLHttpRequest();
        req.addEventListener("load", getReqListener);
        req.open("POST", `${first_url}/musicbands-util/average-number-of-participants`);
        req.send();
    }

    function getReqListener() {
        var data = this.responseText;
        setShowModal(true)
        if (this.status === 200) {
            var value = data.split("<Double>")[1].split("</Double>")[0]
            setGetData(value)
        } else {
            var message = data.split("<message>")[1].split("</message>")[0]

            setGetData("Ошибка: " + message)
        }
    }
}

export default AverageNumberOfParts;