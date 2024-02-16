import React, { useState } from "react";


function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const username = props.user

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    const credentials = {username, note };

    
    // send the credentials to the backend

    try {
        const response =  fetch('https://memory-mosiac-37193ea89723.herokuapp.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
       
        console.log(response);        
        if (response.ok) {
          console.log('Submission successful');
        } else {
          console.error('Submission failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    setNote({
      title: "",
      content: ""
    });
    props.onAdd();
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <button onClick={submitNote}>add</button>
      </form>
    </div>
  );
}

export default CreateArea;
