const socket = io("http://localhost:2000");
socket.on("connection", () => {
    console.log("socket")
})
let namespaceSocket;
function stringToHTML(str){
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html")
    return doc.body.firstChild
}

function initNamespaceConnection(endpoint){
    namespaceSocket = io(`http://localhost:2000/${endpoint}`)
    namespaceSocket.on("connect", ()=>{
        console.log("socket")
        namespaceSocket.on("roomList", rooms =>{
            const roomsElement = document.querySelector("#contacts ul")
            roomsElement.innerHTML = ""
            for (const room of rooms) {
                console.log(room.image);
                const html = stringToHTML(`
                <li class="contact" roomName="${room.name}">
                    <div class="wrap">
                        <img src='${room.image}' height='40'/>
                        <div class="meta">
                            <p class="name">${room.name}</p>
                            <p class="preview" >${room.description}</p>
                        </div>
                    </div>
                </li>`)
                roomsElement.appendChild(html)
            }
            const roomNodes = document.querySelectorAll("ul li.contact");
            for (const room of roomNodes) {
                room.addEventListener("click", () => {
                    const roomName = room.getAttribute("roomName")
                    getRoomInfo(roomName)
                })
            }
        })
    })
}
function getRoomInfo(room){
    namespaceSocket.emit("joinRoom", room)
}
socket.on("connect", () => {
    console.log("socket connect")
    socket.on("namespacesList", namespacesList =>{
        const namespaceElement = document.getElementById("namespaces");
        namespaceElement.innerHTML = ""
        initNamespaceConnection(namespacesList[0].endpoint)
        for (const namespace of namespacesList) {
            const li = document.createElement("li")
            const p = document.createElement("p")
            p.setAttribute("class", "namespaceTitle")
            p.setAttribute("endpoint", namespace.endpoint)
            p.innerText = namespace.title
            li.appendChild(p)
            namespaceElement.appendChild(li)
        }
        const roomNode = document.querySelectorAll("#namespaces li p.namespaceTitle")
        for (const namespace of roomNode) {
            namespace.addEventListener("click", () => {
                const endpoint = namespace.getAttribute("endpoint");
                initNamespaceConnection(endpoint)
                // const roomName = this.getAttribute("roomName")
            })
        }
    })
})