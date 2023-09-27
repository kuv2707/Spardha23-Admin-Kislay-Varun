import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function SportsRegistrations() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const [contingents, setContingents] = useState([]);
  const { token } = useContext(AuthContext);

  const formatText = (str) => {
    const words = str.split("_");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    const result = capitalizedWords.join(" ");
    return result;
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/teams/contingent/all`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setContingents(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <h1>All Sports Registrations</h1>
      {contingents.map((contingent, index) => {
        console.log(contingent);
        return (
          <div key={index} className="card">
            {Object.keys(contingent).map((key) => {
              return (
                  <div className="fields">
                    {" "}
                    <span className="fieldName">{formatText(key)}: </span>{" "}
                    {key === "games" ? contingent[key].join(" , "):contingent[key]}{" "}
                  </div>
              );
            })}
          </div>
        );
      })}
      {contingents.length === 0 && <p>No Registrations</p>}
    </div>
  );
}

export default SportsRegistrations;
