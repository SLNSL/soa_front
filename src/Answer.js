import logo from './logo.svg';
import './App.css';
import CodeEditor from "@uiw/react-textarea-code-editor";
import React from "react";

function Answer(props) {
    return(<div>
        <h4>Ответ:</h4>
        <CodeEditor data-color-mode="dark" value={props.getData} language="xml" style={{whiteSpace: "pre-wrap", maxHeight: "600px", overflowY: "visible"}}>
        </CodeEditor></div>
    )
}

export default Answer;