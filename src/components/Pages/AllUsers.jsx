import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function AllUsers() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const [users, setUsers] = useState([]);
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
      .get(`${baseUrl}/auth/all`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <h1>All Users</h1>
      {users.map((user, index) => {
        return (
          <div key={index} className="card">
            {Object.keys(user).map((key) => {
              return (
                <div className="fields" key={key + user[key]}>
                  <span className="fieldName">{formatText(key)}: </span>{" "}
                  {user[key]}
                </div>
              );
            })}
          </div>
        );
      })}
      {users.length === 0 && <p>No Users</p>}
    </div>
  );
}

export default AllUsers;
