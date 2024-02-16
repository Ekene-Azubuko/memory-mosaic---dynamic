import React, {useEffect, useState } from "react";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Login from "./Login";

function Home() {


  // const [notes, setNotes] = useState([]);
  const [loggedin, setLoggedin] = useState(false);
  const [username, setUsername] = useState('');
  const [dbNotes, setDbNotes]= useState([]);

  const handleDbNotes = async () => {
    if (loggedin && username) {
      const credentials = { username };

      try {
        const response = await fetch('https://memory-mosiac-37193ea89723.herokuapp.com/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        if (response.ok) {
          const data = await response.json();
          setDbNotes(data.notes);
          console.log('Db notes retrieved', data);
        } else {
          console.error('Failed to retrieve db notes');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  
  useEffect(() => {
    handleDbNotes(); // Call it to load notes initially and on username/loggedin change
  }, [loggedin, username]);

  // useEffect(() => {
  //   // This function will be called when `loggedin` changes to `true` and `username` is set
  //   const handleDbNotes = async () => {
  //     if (loggedin && username) {
  //       const credentials = { username };

  //       try {
  //         const response = await fetch('http://localhost:3001/notes', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify(credentials),
  //         });
      
  //         if (response.ok) {
  //           const data = await response.json();
  //           setDbNotes(data.notes);
  //           console.log('Db notes retrieved', data);
  //         } else {
  //           console.error('Failed to retrieve db notes');
  //         }
  //       } catch (error) {
  //         console.error('Error:', error);
  //       }
  //     }
  //   };

  //   handleDbNotes();
  // }, [loggedin, username]);
  


  // function addNote(newNote) {
  //   setNotes(prevNotes => {
  //     return [...prevNotes, newNote];
  //   });
  // }

  // function deleteNote(id) {
  //   setNotes(prevNotes => {
  //     return prevNotes.filter((noteItem, index) => {
  //       return index !== id;
  //     });
  //   });
  // };

  async function deleteNote(description) {
    const credentials = { username, description };

    // send the credentials to the backend
    console.log(credentials);

    try {
        const response = await fetch('https://memory-mosiac-37193ea89723.herokuapp.com/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
    
        const data = await response.json();
        console.log(response)
    
        if (response.ok) {
          console.log('Delete successful', data);
          handleDbNotes()
        } else {
          console.error('Delete failed', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
  }

  function checkLogin(ans,person) {
    setLoggedin(ans)
    setUsername(person)
  }

  return (
    <div>
      {loggedin ? (
        <>
          <CreateArea 
          onAdd={handleDbNotes}
          user= {username}
           />
          {dbNotes.map((noteItem, index) => (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.description}
              onDelete={deleteNote}
            />
          ))}
          <Footer />
        </>
      ) : (
        <Login decision={checkLogin} />
      )}
    </div>
  );
  
}

export default Home;

