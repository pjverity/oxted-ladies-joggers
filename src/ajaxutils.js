import $ from "jquery";

function getJSON(url) {
	return $.get(url);
}

function postJSON(url, newData) {
	return $.ajax(url, {
		processData: false,
		contentType: 'application/json',
		method: 'POST',
		data: JSON.stringify(newData)
	});
}

function patchJSON(url, changes) {
	return $.ajax(url, {
		processData: false,
		contentType: 'application/json',
		method: 'PATCH',
		data: JSON.stringify(changes)
	});
}

function deleteJSON(url) {
	return $.ajax(url, {
		processData: false,
		contentType: 'application/json',
		method: 'DELETE'
	});
}
module.exports = {
	getJSON, postJSON, patchJSON, deleteJSON
};