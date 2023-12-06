import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import Answer from "../Answer";
import React, {useState} from "react";
import beautify from "xml-beautifier";
import {first_url, second_url} from "../data/consts";
import $ from "jquery";


function AddParts() {
    const [showModal, setShowModal] = useState(false);

    const [getData, setGetData] = useState("");
    return (
        <div className="element">
            <h3><a style={{color: "green"}}>POST</a> /grammy/band/id/participants/add</h3>
            <h5>Добавить группе участника</h5>

            <TextField id="element-id-util" label="ID элемента" variant="standard"/>
            <br/>


            <Button variant="text" className={"button"} onClick={get}>Run</Button>
            <Button variant="text" className={"button"} onClick={() => setShowModal(false)}>Clear</Button>

            <table id={"table-add-parts"} hidden={!showModal}>
                <th>id</th>
                <th>name</th>
                <th>coord.x</th>
                <th>coord.y</th>
                <th>creation date</th>
                <th>number of participants</th>
                <th>description</th>
                <th>establishment date</th>
                <th>genre</th>
                <th>album name</th>
                <th>tracks</th>
                <th>length</th>
                <th>album sales</th>


            </table>

        </div>
    )

    function get() {
        const id = document.getElementById("element-id-util").value
        const req = new XMLHttpRequest();
        req.addEventListener("load", getReqListener);
        req.open("POST", `${second_url}/grammy/band/` + id + `/participants/add`);
        req.send();
    }

    function getReqListener() {
        var data = this.responseText;
        setShowModal(true)
        if (this.status === 200) {
            var table = document.getElementById("table-add-parts")

            $("#table-add-parts tbody tr").remove()


            setShowModal(true)
            table.insertRow(0)
            var id = data.split("<id>")[1].split("</id>")[0]
            console.log(data)
            var name = data.split("<name>")[1].split("</name>")[0]
            var coordX = data.split("<x>")[1].split("</x>")[0]
            var coordY = data.split("<y>")[1].split("</y>")[0]
            var creatdate = data.split("<creationDate>")[1].split("</creationDate>")[0]
            var parts = data.split("<numberOfParticipants>")[1].split("</numberOfParticipants>")[0]
            var desc = data.split("<description>")[1].split("</description>")[0]
            var estabDate = data.split("<establishmentDate>")[1].split("</establishmentDate>")[0]
            var genre = data.split("<genre>")[1].split("</genre>")[0]
            var albumName = data.split("<name>")[2].split("</name>")[0]
            var tracks = data.split("<tracks/>")[1]
            if (tracks === undefined) {
                tracks = data.split("<tracks>")[1].split("</tracks>")[0]
            } else {
                tracks = ""
            }

            var length = data.split("<length/>")[1]
            if (length === undefined) {
                length = data.split("<length>")[1].split("</length>")[0]
            } else {
                length = ""
            }
            var sales = data.split("<sales>")[1].split("</sales>")[0]
            addToTable(table, 0, id, name, coordX, coordY, creatdate, parts, desc, estabDate, genre, albumName, tracks, length, sales)

        } else {
            var message = data.split("<message>")[1].split("</message>")[0]

            setGetData("Ошибка: " + message)

        }
    }

    function addToTable(table, i, id, name, x, y, cd, parts, desc, ed, genre, albname, tracks, length, sales) {
        var row = table.insertRow(i)
        var idCell = row.insertCell(0)
        idCell.innerHTML = id

        var nameCell = row.insertCell(1)
        nameCell.innerHTML = name

        var xCell = row.insertCell(2)
        xCell.innerHTML = x

        var yCell = row.insertCell(3)
        yCell.innerHTML = y

        var cdCell = row.insertCell(4)
        cdCell.innerHTML = cd

        var partsCell = row.insertCell(5)
        partsCell.innerHTML = parts

        var descCell = row.insertCell(6)
        descCell.innerHTML = desc

        var edCell = row.insertCell(7)
        edCell.innerHTML = ed

        var genreCell = row.insertCell(8)
        genreCell.innerHTML = genre

        var albCell = row.insertCell(9)
        albCell.innerHTML = albname

        var tCell = row.insertCell(10)
        tCell.innerHTML = tracks

        var lCell = row.insertCell(11)
        lCell.innerHTML = length

        var saleCell = row.insertCell(12)
        saleCell.innerHTML = sales
    }
}

export default AddParts;