import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { loginToSelectedIdP } from '../solidInrupt';

import { login, handleIncomingRedirect, getDefaultSession, fetch } from "@inrupt/solid-client-authn-browser";
import { addUrl, addStringNoLocale, createSolidDataset, createThing, getPodUrlAll, getSolidDataset, getThingAll, getStringNoLocale, removeThing, saveSolidDatasetAt, setThing } from "@inrupt/solid-client";
import { SCHEMA_INRUPT, RDF, AS } from "@inrupt/vocab-common-rdf";



const idp_options = [
    {"key": "https://login.inrupt.com", "value": "https://login.inrupt.com (PodSpaces)"},
];
const pod_options = [];

function LoginForm() {
    const navigate = useNavigate();
    const [isButtonDisabled, setButtonDisabled] = useState(true);
    const [textValue, setTextValue] = useState('Default Text');
    const handleChange = (e) => {
        setTextValue(e.target.value);
    };
    
    
    const [selectorIdP, setSelectorIdP] = useState('');
    const [webId, setWebId] = useState('');

    const changeSelectorIdP = (e) => {
        setSelectorIdP(e.target.value);
        setButtonDisabled(!isButtonDisabled);
    }
    
    // 1a. Start Login Process. Call login() function.
    async function loginToPodSpaces() {
        const SELECTED_IDP = selectorIdP;
        //alert(new URL("/login", window.location.href).toString());
        const session = await login({
            oidcIssuer: "https://login.inrupt.com",
            redirectUrl: new URL("/login", window.location.href).toString(),
            clientName: "IRDB",
        });
        alert(session.info);
        // Check if the login was successful.
        if (session.info.isLoggedIn) {
            // Update the page with the status.
            setWebId(session.info.webId);
        } else {
            // Handle the login failure.
        }
    }



    

    // 1b. Login Redirect. Call handleIncomingRedirect() function.
    // When redirected after login, finish the process by retrieving session info
    async function handleRedirectAfterLogin() {
        try {
            await handleIncomingRedirect();
            const session = getDefaultSession();
            console.log('session: ', session.info);
            //alert(session)
            if (session.info.isLoggedIn) {
                // Update the page with the status.
                setWebId(session.info.webId);
            
                // Enable Read button to read Pod URL
                //buttonRead.removeAttribute("disabled");
            }
            alert(656565)
              } catch (error) {
            console.error('Error handling redirect:', error);
            alert(76)
          }
              
    }

    // 2. Get Pod(s) associated with the WebID
    async function getMyPods() {
        //if(webId){
            const mypods = await getPodUrlAll(webId, { fetch: fetch });
            //alert(mypods.keys)
            // Update the page with the retrieved values
            mypods.forEach((mypod) => {
                pod_options.push({mypod});
            });
        //}
    }

    /* 3. Create the Reading List
    async function createList() {
        labelCreateStatus.textContent = "";
        const SELECTED_POD = mypods[0];//document.getElementById("select-pod").value;
    
        // For simplicity and brevity, this tutorial hardcodes the  SolidDataset URL.
        // In practice, you should add in your profile a link to this resource
        // such that applications can follow to find your list.
        const readingListUrl = `${SELECTED_POD}getting-started/readingList/myList`;
    
        let titles = document.getElementById("titles").value.split("\n");
    
        // Fetch or create a new reading list.
        let myReadingList;
    
        try {
            // Attempt to retrieve the reading list in case it already exists.
            myReadingList = await getSolidDataset(readingListUrl, { fetch: fetch });
            // Clear the list to override the whole list
            let items = getThingAll(myReadingList);
            items.forEach((item) => {
                myReadingList = removeThing(myReadingList, item);
            });
        } catch (error) {
            if (typeof error.statusCode === "number" && error.statusCode === 404) {
                // if not found, create a new SolidDataset (i.e., the reading list)
                myReadingList = createSolidDataset();
            } else {
                console.error(error.message);
            }
        }
    
        // Add titles to the Dataset
        let i = 0;
        titles.forEach((title) => {
            if (title.trim() !== "") {
                let item = createThing({ name: "title" + i });
                item = addUrl(item, RDF.type, AS.Article);
                item = addStringNoLocale(item, SCHEMA_INRUPT.name, title);
                myReadingList = setThing(myReadingList, item);
                i++;
            }
        });
    
        try {
            // Save the SolidDataset
            let savedReadingList = await saveSolidDatasetAt(
                readingListUrl,
                myReadingList,
                { fetch: fetch }
            );
        
            labelCreateStatus.textContent = "Saved";
        
            // Refetch the Reading List
            savedReadingList = await getSolidDataset(readingListUrl, { fetch: fetch });
        
            let items = getThingAll(savedReadingList);
        
            let listcontent = "";
            for (let i = 0; i < items.length; i++) {
                let item = getStringNoLocale(items[i], SCHEMA_INRUPT.name);
                if (item !== null) {
                listcontent += item + "\n";
                }
            }
        
            document.getElementById("savedtitles").value = listcontent;
        } catch (error) {
            console.log(error);
            labelCreateStatus.textContent = "Error" + error;
            labelCreateStatus.setAttribute("role", "alert");
        }
    }*/
        
    const solidLogin = () => {
        //loginToSelectedIdP(); handleRedirectAfterLogin();
        loginToPodSpaces();
        console.log('webId: ', webId);
        getMyPods();

    }

    return (<>
        <header>
            <div onClick={() => navigate('/')}>Back to Home</div>
            <h3>Getting Started</h3>
        </header>

        <section id="login" className="panel">
            <div className="row">
            <label id="labelIdP" htmlFor="select-idp">1. Select your Identity Provider: </label>

            <select 
                value={selectorIdP} 
                onChange={changeSelectorIdP}
                name="select-idp"
                id="select-idp"
            >
                <option value="">--Please select an Identity Provider (IdP)--</option>
                {idp_options.map((val, index) => (
                <option value={val.key} key={index}>{val.value}</option>
                ))}
            </select>
            
            <button onClick={solidLogin} disabled={isButtonDisabled}>Login</button>
            </div>
        </section>


        <div id="write" className="panel">
            <div className="row">
                <label id="writelabel">3.Create a private reading list in my Pod.</label>
            </div>
            <br />
            <div className="row">
                <div>
                    <label id="podlabel" htmlFor="select-pod">a. Write to your Pod: </label>

                    <select id="select-pod" name="select-pod" widths="120">
                    <option value="">--Please select your Pod--</option>
                    </select>getting-started/readingList/myList
                </div>
            </div>
            <br />
            <div className="row">
                <div>
                    <label id="listLabel" htmlFor="titles">b. Enter items to read: </label>
                    <textarea id="titles" name="titles" rows="5" cols="42" defaultValue={textValue} onChange={handleChange} />
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
                    <label id="labelRetrieved" htmlFor="savedtitles">Retrieved to validate:</label>
                    <textarea id="savedtitles" name="savedtitles" rows="5" cols="42" disabled=""></textarea>
                </div>
            </div>
        </div>

    </>);
}

export default LoginForm;
