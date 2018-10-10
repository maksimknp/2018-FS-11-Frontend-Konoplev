const say = function (name) {
    let block = document.createElement("div");
    block.style.background = "grey";
	block.style.width = "220px";
	block.style.height = "80px";
	block.style.textAlign = "center";
	block.style.lineHeight = "80px";
	block.style.margin = "auto";
	block.style.boxShadow = "4px 4px 11px 0px grey";

    let text = document.createElement("p");
    text.textContent = `Hello, ${name}!`;
	text.style.color = "#00e6b8";
	text.style.fontFamily = "Century Gothic";

	block.appendChild(text);
	document.body.appendChild(block);
};

export default say;
