import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, managePermissions, checkEarnings, checkPaidData } from '../solidInrupt';


  
function LoginForm() {
    const navigate = useNavigate();
    const [webId, setWebId] = useState('');

    const solidLogin = () => {
        //console.log(login);
        const username = 'your_username';
        const password = 'your_password';
        const webId = 'https://example.com/user1#me';
        const permissions = ['Read', 'Write'];
        const date = '2023-09-18';

        login(username, password)
            .then(() => managePermissions(webId, permissions))
            .then(() => checkEarnings(webId))
            .then(() => checkPaidData(webId, date))
            .catch(error => console.error('Error:', error));
    }

    return (<>
        <header>
            <div onClick={() => navigate('/')}>Back to Home</div>
            <h3>Getting Started</h3>
        </header>

        <section id="login" className="panel">
            <div className="row">
            <label id="labelIdP" for="select-idp">1. Select your Identity Provider: </label>
            <select id="select-idp" name="select-idp">
                <option value="">--Please select an Identity Provider (IdP)--</option>
                {/*-- Update the select-idp option if not using PodSpaces --*/}
                <option value="https://login.inrupt.com">https://login.inrupt.com (PodSpaces)</option>

            </select>
            <button onClick={solidLogin} name="btnLogin" id="btnLogin">Login</button>
            </div>
        </section>

        <div id="read" className="panel">
            <div className="row">
            <label id="readlabel" for="myWebID">2. Logged in with your WebID: </label>
            <input type="text" id="myWebID" name="myWebID" size="50" disabled="" />

            <button name="btnRead" id="btnRead" disabled="disabled">Get Pod URL(s)</button>
            </div>
        </div>

        <div id="write" className="panel">
            <div className="row">
                <label id="writelabel">3.Create a private reading list in my Pod.</label>
            </div>
            <br />
            <div className="row">
                <div>
                    <label id="podlabel" for="select-pod">a. Write to your Pod: </label>

                    <select id="select-pod" name="select-pod" widths="120">
                    <option value="">--Please select your Pod--</option>
                    </select>getting-started/readingList/myList
                </div>
            </div>
            <br />
            <div className="row">
                <div>
                    <label id="listLabel" for="titles">b. Enter items to read: </label>
                    <textarea id="titles" name="titles" rows="5" cols="42">Leaves of Grass
            RDF 1.1 Primer</textarea>
                    <button name="btnCreate" id="btnCreate" disabled="disabled">Create</button>
                </div>
                <br />
            </div>
        </div>

        <div id="results" className="panel">
            <div className="row">
                <label>Create Reading List Status</label>
                <span id="labelCreateStatus"></span>
            </div>
            <div className="row">
                <div>
                    <label id="labelRetrieved" for="savedtitles">Retrieved to validate:</label>
                    <textarea id="savedtitles" name="savedtitles" rows="5" cols="42" disabled=""></textarea>
                </div>
            </div>
        </div>

    </>);
}

export default LoginForm;
