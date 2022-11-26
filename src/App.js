import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faFile, faFolder } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import "./App.css";



export default function App() {
  const [clicked, setClicked] = useState([]);
  const [levels, setLevels] = useState({});
  const files = {
    type: "folder",
    name: "afsd",
    items: [
      {
        type: "folder",
        name: "fas",
        items: []
      },
      {
        type: "folder",
        name: "gas",
        items: [
          {
            type: "file",
            name: "inside",
          }
        ]
      },
      {
        type: "file",
        name: "sfd",
      }
    ]
  };

  const handleClicked = (fileName) => {
    
    let temp = [...clicked];
    if (temp.includes(fileName)) {
      temp.splice(temp.indexOf(fileName), 1);
    } else {
      temp.push(fileName);
    }

    setClicked(temp);
  };

  const expand = (file) => {
    return (
      <div>
        
        <button className="btn" onClick={() => handleClicked(file.name)}>
          {file.type === 'folder' && (clicked.includes(file.name) ? (<>&nbsp;&nbsp;<FontAwesomeIcon icon={faChevronDown} /></>) : (<>&nbsp;&nbsp;<FontAwesomeIcon icon={faChevronRight} /></>))
          }


          {file.type === 'folder' ? (<>&nbsp;&nbsp;<FontAwesomeIcon icon={faFolder} /></>) : (<>&nbsp;&nbsp;<FontAwesomeIcon icon={faFile} /></>)}
          &nbsp;

          {file.name}
        </button>

        {clicked.includes(file.name) && file.items && (

          <div>{file.items.map((i) => expand(i))}</div>
        )}
      </div>
    );
  };


  return <div className="App">{expand(files)}</div>;
}
