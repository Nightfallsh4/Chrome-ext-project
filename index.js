const myUrl = document.getElementById("textInput")
const myList = document.getElementById("lists")
let myLeads = []
let input =""
let listMessage = ""

let leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromStorage){
    myLeads = leadsFromStorage
    listedHTML()
    render()
}

document.getElementById("save").addEventListener("click",save)
document.getElementById("delete").addEventListener("click", del)
document.getElementById("saveTab").addEventListener("click",saveTab)
function save(){
    input = myUrl.value
    myLeads.push(input)
    myUrl.value = ""
    listedHTML()
    localStorage.clear()
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render()
}
function saveTab(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        let currentUrl = tabs[0].url
        console.log(currentUrl)
        myLeads.push(currentUrl)
        console.log(myLeads)
        listedHTML()
        localStorage.clear()
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render()
    })
    
}
function del() {
    localStorage.setItem("myLeads", null)
    myLeads = []
    listedHTML()
    render()
}

function listedHTML(){
    listMessage = ""
    for (let i=0;i<myLeads.length;i++){
        listMessage += `<li>
                            <a href='${myLeads[i]}' target='_blank'>
                                ${myLeads[i]} 
                            </a>
                        </li>`
    }
}

function render(){
    myList.innerHTML = listMessage
}

