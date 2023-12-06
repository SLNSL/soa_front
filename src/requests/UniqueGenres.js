import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import Answer from "../Answer";
import React, {useState} from "react";
import beautify from "xml-beautifier";
import {first_url, second_url} from "../data/consts";
import $ from "jquery";


function UniqueGenres() {
    const [showModal, setShowModal] = useState(false);

    const [getData, setGetData] = useState("");
    return (
        <div className="element">
            <h3><a style={{color: "blue"}}>GET</a> /musicbands-util/genres-unique</h3>
            <h5>Вернуть массив уникальных значений поля genre по всем объектам.</h5>

            <Button variant="text" className={"button"} onClick={get}>Run</Button>
            <Button variant="text" className={"button"} onClick={() => setShowModal(false)}>Clear</Button>

            <table id={"table-unique-genres"} hidden={!showModal}>
                <th>genre</th>
            </table>

        </div>
    )

    function get() {


        const req = new XMLHttpRequest();
        req.addEventListener("load", getReqListener);
        req.open("GET", `${first_url}/musicbands-util/genres-unique`);
        req.send();
    }


    function getReqListener() {
        var data = this.responseText;
        var table = document.getElementById("table-unique-genres")

        $("#table-unique-genres tbody tr").remove()


        var listOfObjects = data.split("</item>")
        setShowModal(true)
        for (let i = 0; i < listOfObjects.length - 1; i++) {
            table.insertRow(i)
            var genre = listOfObjects[i].split("<item>")[1]

            addToTable(table, i, genre)
        }
    }


    function addToTable(table, i, genre) {
        var row = table.insertRow(i)
        var genresCell = row.insertCell(0)
        genresCell.innerHTML = genre

    }
}

export default UniqueGenres;