import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import PropTypes from "prop-types";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

function DocumentVerification() {
	const baseUrl = import.meta.env.VITE_BACKEND_URL;
	const [documents, setDocuments] = useState([]);
  const [errormsg,setErrorMessage]=useState("")
	const { token } = useContext(AuthContext);
	useEffect(function () {
		axios
			.get(baseUrl + "/documents/", {
				headers: {
					Authorization: `Token ${token}`,
				},
			})
			.then(function (response) {
				setDocuments(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);
	return (
		<>
			<h1>Document Verification</h1>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Document</th>
						<th>Is Verified</th>
						<th>Verification Time</th>
						<th>Is Rejected</th>
						<th>Comments</th>
						<th>User Id</th>
						<th>Verified By</th>
						<th>Sync</th>
					</tr>
				</thead>
				<tbody>
					{documents.map((document, index) => (
						<DocumentRow key={index} document={document} setErrorMessage={setErrorMessage}/>
					))}
				</tbody>
			</table>
            <ErrorMessage message={errormsg} />
		</>
	);
}

DocumentRow.propTypes = {
	document: PropTypes.object.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

function DocumentRow({ document,setErrorMessage }) {
	const [modified, setModified] = useState(false);
	const [newDoc, setNewDoc] = useState({ ...document });
	const { token } = useContext(AuthContext);
  console.log(document,newDoc)
	function submitHandler() {
    console.log(document,newDoc)
    setModified(false)
		axios
			.patch(baseUrl + "/documents/verify/" + document.id+"/", newDoc, {
				headers: {
					Authorization: `Token ${token}`,
				},
			})
			.then(function () {
				setModified(false);
        setErrorMessage("")
			})
			.catch(function (error) {
				console.log(error);
        setModified(true);
        setErrorMessage("Error in syncing changes")
			});
	}

	return (
		<>
			<tr>
				<td>{document.id} </td>
				<td><KeyValuePairsList data={newDoc.document}/> </td>
				<td>
					<input
						type="checkbox"
						checked={newDoc.is_verified}
						onChange={(e) => {
							setModified(true);
							setNewDoc({
								...newDoc,
								is_verified: e.target.checked,
							});
						}}
					/>
				</td>
				<td>{newDoc.verification_time ?? "Not verified"} </td>
				<td>
					<input
						type="checkbox"
						checked={newDoc.is_rejected}
						onChange={(e) => {
							setModified(true);
							setNewDoc({
								...newDoc,
								is_rejected: e.target.checked,
							});
						}}
					/>
				</td>
				<td>
					<input
						type="text"
						value={newDoc.comments}
						onChange={(e) => {
							setModified(true);
							setNewDoc({ ...newDoc, comments: e.target.value });
						}}
					/>
				</td>
				<td>{newDoc.user_id} </td>
				<td>{newDoc.verified_by} </td>
				<td>
					<button disabled={!modified} onClick={submitHandler}>
						Sync Changes
					</button>
				</td>
			</tr>
		</>
	);
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

function ErrorMessage({ message }) {
	if (message === "") return null;
	return (
		<div className="error-message">
			<p>{message}</p>
		</div>
	);
}

KeyValuePairsList.propTypes = {
  data: PropTypes.object.isRequired,
};
function KeyValuePairsList({ data }) {
	// Convert the object into an array of key-value pairs
	const keyValueArray = Object.entries(data);

	return (
		<div>
			<div>
				{keyValueArray.map(([key, value]) => (
					<div key={key}>
						<strong>{key}:</strong> {value}
					</div>
				))}
			</div>
		</div>
	);
}



export default DocumentVerification;
