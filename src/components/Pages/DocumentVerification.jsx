import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import axios from 'axios';

function DocumentVerification() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const [documents, setDocuments] = useState([])
  const {token} = useContext(AuthContext)
  useEffect(function(){
    axios.get(baseUrl + '/documents/', {
      headers: {
        Authorization: `Token ${token}`
      }
    }).then(function(response){
      setDocuments(response.data)
    }).catch(function(error){
      console.log(error)
    })
  },[])
  return (
		<>
			<h1>Document Verification</h1>
			{documents.map((document, index) => (
				<div key={index} className="card">
					{Object.keys(document).map((key, subIndex) => (
						<div key={subIndex} className="fields">
							<span className="fieldName">{key}:</span>{" "}
							{JSON.stringify(document[key])}
						</div>
					))}
				</div>
			))}
		</>
  );

}

export default DocumentVerification