const title = document.querySelector('.title');
const section = document.querySelector('.main');
const requestsURL = [
	'json/addpost.js',
	'json/colorsheme.js',
	'json/interview.js',
	'json/signin.js',
	'json/signup.js'
];
const request = new XMLHttpRequest();
request.open('GET', requestsURL[4]); // МЕНЯТЬ ТУТ [0 - 4]
request.responseType = 'text';
request.send();

request.onload = function () {
	const jsonText = request.response;
	const jsonObj = JSON.parse(jsonText);
	createPage(jsonObj);
}

function createPage(jsonObj) {
	const keys = Object.keys(jsonObj)
	title.textContent = jsonObj.name.toUpperCase();

	//fields
	jsonObj["fields"].forEach((elem, i) => {
		const fieldsKeys = Object.keys(elem);
		fieldsKeys.forEach(el => {
			switch (el) {
				case "input":
					createInput(elem[el], i);
					break;
				// case "buttons"
				case "label":
					createLabel(elem, i)
				default:
					break;
			}
		});
	});

	//references
	jsonObj["references"].forEach((elem) => {
		const referencesKeys = Object.keys(elem);
		// console.log(referencesKeys)
		createReference(elem);
		referencesKeys.forEach(el => {

			if (el == "input") {
				// console.log(elem[el])
				createInput(elem[el], 'tofix')
				return 0;
			}
			else {
				return 0;
			}
		});
	});

	//buttons
	jsonObj["buttons"].forEach((elem, index) => {
		createButton(elem, index);
	});

}

function createInput(obj, i) {
	if (obj["type"] == "textarea") {
		const textarea = document.createElement("textarea")
		textarea.classList.add("mb-3", "form-control");
		if (obj["required"]) {
			textarea.required = true;
		}
		textarea.setAttribute("id", i);
		section.appendChild(textarea);
		return 0;
	}
	if (obj["type"] == "technology") {
		const select = document.createElement("select");
		select.multiple = true;
		obj["technologies"].forEach(element => {
			const option = document.createElement("option");
			option.textContent = element;
			select.appendChild(option);
		});
		select.classList.add("mb-3", "form-control");
		select.size = obj["technologies"].length;
		section.appendChild(select);
		return 0;
	}


	const input = document.createElement("input");
	input.classList.add("mb-3", "form-control");
	input.type = obj["type"];
	if (obj["placeholder"]) {
		input.placeholder = obj["placeholder"];
	}
	if (obj["required"]) {
		input.required = true;
	}
	if (obj["checked"]) {
		input.checked = true;
		input.classList.remove("form-control");
	}
	if (obj["multiple"]) {
		input.multiple = true;
	}
	if (obj["filetype"]) {
		const accept = [];
		obj["filetype"].forEach((element, index) => {
			switch (element) {
				case "jpeg":
				case "png":
					accept[index] = `image/${element}`
					break;
				default:
					accept[index] = `application/${element}`
					break;
			}
		});
		input.accept = accept.join(",")
		// console.log(input);
	}
	if (obj["type"] == "checkbox") {
		input.classList.remove("form-control");
	}
	if (obj["mask"]) {
		//mask
		input.placeholder = obj["mask"];
	}
	input.setAttribute("id", i);
	section.appendChild(input);
}

function createReference(obj) {
	const span = document.createElement("span");
	const a = document.createElement("a");
	const div = document.createElement("div");
	span.textContent = obj["text without ref"];
	span.classList.add("me-1");
	a.textContent = obj["text"];
	a.setAttribute("href", obj["ref"]);
	div.classList.add("mb-3");
	div.appendChild(span);
	div.appendChild(a);
	section.appendChild(div);

}

function createButton(obj, index) {
	const button = document.createElement("button");
	button.type = "button";
	button.classList.add("btn", "mb-3", "me-3");
	if (index == 0) {
		button.classList.add("btn-primary");
	} else {
		button.classList.add("btn-outline-primary");
	}
	button.textContent = obj["text"];
	section.appendChild(button);
}

function createLabel(obj, i) {
	const label = document.createElement("label");
	// console.log(obj)
	label.classList.add("form-control")
	label.setAttribute("for", i)
	label.textContent = obj["label"]


	section.appendChild(label)

}

