/** Users can enter their name to receive a token from the API. */
import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext"; // adjust path as needed

const Entrance = () => {
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signup(username);
      console.log("Signup successful!");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };
  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <h1>Cave Entrance</h1>
      <p>Your journey has brought you to the base of a rocky mountain.</p>
      <p>
        The quickest path forward is through the mountain's winding tunnels, but
        a sturdy metal gate sits closed before you.
      </p>
      <p>
        Two giant badgers stand guard on either side of the gate, their eyes
        fixed on you. The one on the left opens its mouth, and with a deep,
        rumbling voice, it asks, "Who approaches? Speak your name."
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" onChange={handleNameChange} />
        </label>
        <button>Respond</button>
      </form>
    </>
  );
};
export default Entrance;
