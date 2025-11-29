import React from "react";
import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
    import { Link } from "react-router-dom";        

const Create = () => {
  const [roomName, setRoomName] = useState("");
  const [roomLink, setRoomLink] = useState();

  const formatRoomName = (name) => {
    return name
      .trim() // remove spaces at start/end
      .toLowerCase() // make it consistent
      .replace(/\s+/g, "_") // replace spaces with underscores
      .replace(/[^a-z0-9_]/gi, ""); // remove weird symbols
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    console.log(roomName);
    const validLink = formatRoomName(roomName);
    console.log("valid link is this",validLink)
    const Link = `http://localhost:5173/room/${validLink}`;
    setRoomLink(Link);
    console.log("Room Link", roomLink);
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div>
        <Typography variant="h6" component="div" gutterBottom>
          Enter to Create Room :
        </Typography>

        <form
          onSubmit={joinRoomHandler}
          className="flex justify-center items-center gap-3"
        >
          <TextField
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            id="outlined-basic"
            sx={{
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputLabel-root.Mui-focused": { color: "white" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "white",
                },
            }}
            label="JoinRoom"
            variant="outlined"
            className=" m-9"
          ></TextField>

          <button type="submit" className="btn btn-primary">
            Create{" "}
          </button>
        </form>
        <div>
          <Typography variant="h6" component="div" gutterBottom>
            {roomLink}
            <button className="btn btn-info">
              <Link to={roomLink}>Join Room</Link>
            </button>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Create;
