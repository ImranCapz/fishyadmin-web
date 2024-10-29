import { useState } from "react";

function InitialAdmin() {
  const [message, setMessage] = useState("");

  const handleInitialAdmin = async (email) => {
    try {
      const response = await fetch(
        "https://us-central1-sea1-2a585.cloudfunctions.net/setInitialAdmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }), 
        }
      );

      if (!response.ok) {
        throw new Error("Error");
      }

      const data = await response.text();
      console.log(data); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={() => handleInitialAdmin("imranam1704@gmail.com")}>
        Get Admin
      </button>
      {message}
    </div>
  );
}

export default InitialAdmin;
