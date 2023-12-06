import TextField from "@mui/material/TextField";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Answer from "../Answer";
import React, {useState} from "react";
import beautify from "xml-beautifier";
import $ from 'jquery';
import {first_url} from "../data/consts";


function GetRequest() {
    const [showModal, setShowModal] = useState(false);

    const [showError, setShowError] = useState(false);


    const [getData, setGetData] = useState("");

    const [filterConf, setFilterConf] = useState("")

    const [filterField, setFilterField] = useState("")


    return (
        <div className="element">
            <h3> <a style={{color: "blue"}}>GET</a> /musicbands</h3>
            <h5>Получить массив объектов</h5>

            <TextField id="get-page-number" label="Номер страницы" variant="outlined"/>
            <br/>

            <TextField id="get-page-size" label="Размер страницы" variant="outlined"/>
            <br/>

            <TextField id="get-sort-field" label="Поле для сортировки" variant="outlined"/>
            <br/>


            <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel id="field-filter-label">Поле для фильтрации</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Поле"
                    onChange={(e) => setFilterField(e.target.value)}
                >
                    <MenuItem value={"id"}>id</MenuItem>
                    <MenuItem value={"name"}>name</MenuItem>
                    <MenuItem value={"creationDate"}>creation date</MenuItem>
                    <MenuItem value={"numberOfParticipants"}>numberOfParticipants</MenuItem>
                    <MenuItem value={"description"}>description</MenuItem>
                    <MenuItem value={"establishmentDate"}>establishmentDate</MenuItem>
                    <MenuItem value={"genre"}>genre</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="filter-conf-label">Фильтр</InputLabel>
                <Select
                    labelId="filter-conf-label"
                    id="filter-conf-label"
                    label="Фильтр"
                    onChange={(e) => setFilterConf(e.target.value)}
                >
                    <MenuItem value={":"}>Равно</MenuItem>
                    <MenuItem value={">"}>Больше</MenuItem>
                    <MenuItem value={"<"}>Меньше</MenuItem>
                </Select>
            </FormControl>
            <TextField id="get-filter-value" label="Значения поля для фильтрации" variant="outlined"/>
            <br/>


            <Button variant="text" className={"button"} onClick={get}>Run</Button>
            <Button variant="text" className={"button"} onClick={ clear}>Clear</Button>

            {showError ? <Answer getData={getData}/> : null}


            <table id={"table"} hidden={!showModal}>
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

    function clear() {
        setShowModal(false)
    }

    function get() {
        var params = ""
        var page_number_value = document.getElementById("get-page-number").value
        if (page_number_value !== "") params += "page=" + page_number_value + "&"

        var page_size_value = document.getElementById("get-page-size").value
        if (page_size_value !== "") params += "size=" + page_size_value + "&"

        var sort_field = document.getElementById("get-sort-field").value
        if (sort_field !== "") params += "sort=" + sort_field + "&"


        var filterFieldName = filterField
        var filterFieldConf = filterConf
        var filterFieldVal = document.getElementById("get-filter-value").value

        if (filterFieldName !== "" && filterFieldConf !== "" && filterFieldVal !== "") {
            params += "search=" + filterFieldName + filterFieldConf + filterFieldVal + "&"
        }


        if (params !== "") params = "?" + params.slice(0, params.length - 1)
        alert(`${first_url}/musicbands` + params)
        const req = new XMLHttpRequest();
        req.addEventListener("load", getReqListener);
        req.open("GET", `${first_url}/musicbands` + params);
        req.send();
    }

    function getReqListener() {
        var data = this.responseText;
        var table = document.getElementById("table")

        $("#table tbody tr").remove()

        if (this.status !== 200) {
            setShowError(true)
            var message = data.split("<message>")[1].split("</message>")[0]

            setGetData("Ошибка: " + message)
            return;
        }


        var listOfObjects = data.split("<content>")
        setShowModal(true)
        for (let i = 2; i < listOfObjects.length; i++) {
            var row = table.insertRow(i - 2)
            var id = listOfObjects[i].split("<id>")[1].split("</id>")[0]
            var name = listOfObjects[i].split("<name>")[1].split("</name>")[0]
            var coordX = listOfObjects[i].split("<x>")[1].split("</x>")[0]
            var coordY = listOfObjects[i].split("<y>")[1].split("</y>")[0]
            var creatdate = listOfObjects[i].split("<creationDate>")[1].split("</creationDate>")[0]
            var parts = listOfObjects[i].split("<numberOfParticipants>")[1].split("</numberOfParticipants>")[0]
            var desc = listOfObjects[i].split("<description>")[1].split("</description>")[0]
            var estabDate = listOfObjects[i].split("<establishmentDate>")[1].split("</establishmentDate>")[0]
            var genre = listOfObjects[i].split("<genre>")[1].split("</genre>")[0]
            var albumName = listOfObjects[i].split("<name>")[2].split("</name>")[0]

            var tracks = listOfObjects[i].split("<tracks/>")[1]
            console.log(tracks)
            if (tracks === undefined) {
                console.log(listOfObjects[i])
                tracks = listOfObjects[i].split("<tracks>")[1].split("</tracks>")[0]
            } else {
                tracks = ""
            }

            var length = listOfObjects[i].split("<length/>")[1]
            if (length === undefined) {
                length = listOfObjects[i].split("<length>")[1].split("</length>")[0]
            } else {
                length = ""
            }


            var sales = listOfObjects[i].split("<sales>")[1].split("</sales>")[0]

            addToTable(table, i-2, id, name, coordX, coordY, creatdate, parts, desc, estabDate, genre, albumName, tracks, length, sales)
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

export default GetRequest;