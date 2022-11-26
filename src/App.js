import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faFile, faFolder, faFolderPlus, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import "./App.css";
import { IconButton, Tooltip } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DoneIcon from '@mui/icons-material/Done';



export default function App() {
  const [clicked, setClicked] = useState([]);
  const [editing, setEditing] = useState('');
  const [temp, setTemp] = useState('');
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


  const handleNameClick = (event, file) => {
    // console.log('file name', file.name);
    if (editing) {
      setEditing('')
    }
    else {
      setEditing(file.name)
    }

  }

  const expand = (file, level) => {
    return (
      <div className='item'>

        <span>{'\xa0\xa0\xa0\xa0'.repeat(level)}</span>

        &nbsp;&nbsp;

        <button className="btn" onClick={() => handleClicked(file.name)}>
          {file.type === 'folder' && (clicked.includes(file.name) ? (<><FontAwesomeIcon icon={faChevronDown} /></>) : (<><FontAwesomeIcon icon={faChevronRight} /></>))
          }

          &nbsp;

          {file.type === 'folder' ? (<>&nbsp;&nbsp;<FontAwesomeIcon icon={faFolder} /></>) : (<><FontAwesomeIcon icon={faFile} /></>)}

          &nbsp;

          {editing === file.name ? <input /> : <div className='file-name'>
            {file.name}
          </div>}

        </button>


        &nbsp;
        {editing === file.name ?
          <Tooltip title="done">
            <DoneIcon onClick={e => handleNameClick(e, file)} style={{ color: 'grey', cursor: 'pointer', fontSize: '16px' }} />
          </Tooltip>
          :
          <Tooltip title="rename">
            <DriveFileRenameOutlineIcon onClick={e => handleNameClick(e, file)} style={{ color: 'grey', cursor: 'pointer', fontSize: '16px' }} />
          </Tooltip>
        }



        {file.type === 'folder' && (
          <>
            <Tooltip title="add folder">
              <CreateNewFolderIcon style={{ color: 'grey', cursor: 'pointer', fontSize: '16px' }} />
            </Tooltip>
            <Tooltip title='add file'>
              <NoteAddIcon style={{ color: 'grey', cursor: 'pointer', fontSize: '16px' }} />
            </Tooltip>
          </>)}

        {clicked.includes(file.name) && file.items && (

          <div>{file.items.map((i) => expand(i, level + 1))}</div>
        )}

      </div>
    );
  };


  return <div className="App expand">{expand(files, 0)}</div>;
}
