import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField';
import {Button, DialogContentText, FormLabel} from "@mui/material";
import {useState} from "react";
import React, {Component} from 'react';
import beautify from "xml-beautifier";
import CodeEditor from '@uiw/react-textarea-code-editor';
import Answer from "./Answer";
import GetRequest from "./requests/GetRequest";
import PostRequest from "./requests/PostRequest";
import GetById from "./requests/GetById";
import UpdateRequest from "./requests/UpdateRequest";
import DeleteRequest from "./requests/DeleteRequest";
import AverageNumberOfParts from "./requests/AverageNumberOfParts";
import DeleteEstab from "./requests/DeleteEstab";
import UniqueGenres from "./requests/UniqueGenres";
import AddParts from "./requests/AddParts";
import AddAlbum from "./requests/AddAlbum";


function MusicBandPage() {


    return (
        <div>
            <h4 style={{margin: 4}}>MusicBand</h4>

            <GetRequest/>

            <GetById/>

            <PostRequest/>

            <UpdateRequest/>

            <DeleteRequest/>

            <AverageNumberOfParts/>

            <DeleteEstab/>

            <UniqueGenres/>

            <AddParts/>

            <AddAlbum/>

        </div>
    );


}


export default MusicBandPage;