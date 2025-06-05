export function crearHeader() {
    const header = document.createElement("div");
    header.className = "header";

    const divimg = document.createElement("div");
    divimg.className = "divimg";
    header.appendChild(divimg);

    const img = document.createElement("img");
    img.src = "https://brandlogos.net/wp-content/uploads/2020/09/raspberry-pi-logo.png";
    divimg.appendChild(img);

    const divText = document.createElement("p");
    divText.className = "textoRPW";
    divText.innerText = "Raspberry Pico W";
    header.appendChild(divText);

    const divVers = document.createElement("div");
    divVers.className = "divVers";
    divVers.innerText = "V 1.0";
    header.appendChild(divVers);

    document.body.appendChild(header);
}
