//import './style.css'
///import io from 'socket.io-client'

//const socket = io('http://localhost:8080') //el puerto donde esta mi servidor y mis sockets del servidor.


let query

async function postData(url = "", data = {}) {
const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
    "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
});
return response.json();
}

const chats = []

var root = document.getElementById("container")


const humanMessage = {
    view: function(vnode) {
        return m("div", { "class": "flex justify-end"} , [
            m(
                "span",
                { "class": "py-2 px-3 text-gray-950 whitespace-pre-line bg-green-100 rounded-md shadow max-w-[640px]"},
                vnode.attrs.chat.content)
        ])    
    }
}

const aiMessage = {
    view: function(vnode) {
        return m("div", { "class": "flex justify-start" }, [
            m(
                "span",
                { "class": "py-2 px-3 bg-white text-gray-950 whitespace-pre-line rounded-md shadow max-w-[640px]"},
                vnode.attrs.chat.content)
        ])    
    }
}

m.mount(root, {
    view: function() {
        return m("div", { "class": "flex flex-col min-h-full w-full"} , [
        m("div", { "class": "grow py-8 space-y-6 overflow-y-auto" } , [

            chats.map((chat, i) => {
                return chat.role === "HumanMessage" ? m(humanMessage, { chat: chat } ) : m(aiMessage, { chat: chat} )
            })

        ]),
        m("div", { "class": "pt-2 pb-8 fixed bottom-0 w-[640px] bg-gray-100" }, [
        m("form", { "class": "flex flex-row", "action":"#"},
        [
            m("div", { "class": "grow"} ,
            [
                m("div",
                [
                    m("div", {"class":"-m-0.5 rounded-lg p-0.5" },
                    [
                        m("label", {"class":"sr-only","for":"mensaje"}, 
                        "Mensaje"
                        ),
                        m("div", {"class":"relative mt-2 rounded-md shadow-sm"},
                        [
                            m("div", {"class":"pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"}, 
                                m("svg", {"class":"size-6 text-gray-400","xmlns":"http://www.w3.org/2000/svg","fill":"none","viewBox":"0 0 24 24","stroke-width":"1.5","stroke":"currentColor"}, 
                                    m("path", {"stroke-linecap":"round","stroke-linejoin":"round","d":"M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"})
                                )
                            ),
                            m("input", {
                                oninput: (e)=> query = e.target.value, value: query,
                                onkeydown: (e)=> {
                                    
                                    if(e.key === 'Enter'){
                                        e.preventDefault()
                                        
                                        chats.push(
                                        { 
                                            role: "HumanMessage",
                                            content: query
                                        }
                                    )

                                    postData("http://localhost:8080/chat", { content: query, history: chats.slice(0, -1) })
                                    .then((data) => {

                                        chats.push(
                                            { 
                                                role: "AiMessage",
                                                content: data.answer
                                            }
                                        )

                                        query = ""

                                        m.redraw()

                                    })
                                    }
                                },
                                "class":"block w-full rounded-md border-0 py-2 pl-[48px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600","type":"text","name":"message","id":"message","autocomplete":"off","placeholder":"Escribe un mensaje"
                            }),
                            m("div", {"class":"pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"}, 
                                m("svg", {"class":"mr-1 size-6 text-gray-400","xmlns":"http://www.w3.org/2000/svg","fill":"none","viewBox":"0 0 24 24","stroke-width":"1.5","stroke":"currentColor"}, 
                                    m("path", {"stroke-linecap":"round","stroke-linejoin":"round","d":"m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"})
                                )
                            )
                        ]
                        )
                    ]
                    ),
                ]
                )
            ]
            ),
            m("div", {"class":"mt-2 ml-4 flex justify-end"},
            m("button", {
                onclick: function(event) {
                    event.preventDefault()

                    chats.push(
                        { 
                            role: "HumanMessage",
                            content: query
                        }
                    )

                    postData("http://localhost:8080/chat", { content: query, history: chats.slice(0, -1) })
                    .then((data) => {

                        chats.push(
                            { 
                                role: "AiMessage",
                                content: data.answer
                            }
                        )

                        query = ""

                        m.redraw()

                    })
                },
                "class": "h-[40px] w-[40px] flex items-center justify-center rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600","type":"button"}, 
                    m("svg", {"class":"size-5","xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 20 20","fill":"currentColor"}, 
                        m("path", {"fill-rule":"evenodd","d":"M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z","clip-rule":"evenodd"})
                    )
                ), 
            )
        ]
        )
        ])
        
        ])
    }
})

// const messages = document.getElementById("messages");
// const form = document.getElementById("form");
// const input = document.getElementById("input");

// form.addEventListener("submit", function (event) {
//   event.preventDefault();
//   if (input.value) {
//     const item = document.createElement("li");
//     item.classList.add('chat_message');
//     const logo = document.createElement("div");
//     logo.classList.add('chat_user_icon');
//     item.appendChild(logo);
//     const itemTxt = document.createElement('div');
//     itemTxt.classList.add('chat_message_content');
//     itemTxt.innerText = input.value;
//     item.appendChild(itemTxt);
//     messages.appendChild(item);
//     //socket emit escucha el evento chat message y envia el mensaje del usuario hacia el servidor.
//     console.log('Segundo paso: El usuario envia su mensaje:',input.value); //este console log se ve en la consola del navegador! estamos del lado del cliente
//     socket.emit("chat message", input.value);
//     console.log(socket)
//     input.value = "";
//   }
// });

// socket.on('connect', () => {
//   console.log('Connected to server');
// });

// socket.on("chat message", function (msg) {
//   console.log("Quinto Paso: El servidor me envio de vuelta el mensaje del usuario, lo muestro nuevamente en pantalla") //este console log se ve en la consola del navegador!!
//   const item = document.createElement("li");
//   item.classList.add('chat_message_ai');
//   const itemTxt = document.createElement('div');
//   itemTxt.classList.add('chat_message_content');
//   let logo = document.createElement("div");
//   logo.classList.add('chat_ai_icon');
//   ***el svg del logo***
//   item.appendChild(logo);
//   itemTxt.textContent = msg;
//   item.appendChild(itemTxt);
//   messages.appendChild(item);
//   window.scrollTo(0, document.body.scrollHeight);
// });

