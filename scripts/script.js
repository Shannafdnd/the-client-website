const body = document.querySelector('body'),
sidebar = body.querySelector('nav'),
toggle = body.querySelector(".toggle"),
searchBtn = body.querySelector(".search-box"),
modeSwitch = body.querySelector(".toggle-switch"),
modeText = body.querySelector(".mode-text");


toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click" , () =>{
    sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode";
    }else{
        modeText.innerText = "Dark mode";
        
    }
});

// Template copying
fetch("/scripts/placeholder.json").then((res) => {res.json().then((members) => {
    //console.log(members);
    const membersContainer = document.getElementById("members");
    const addMember = membersContainer.firstChild;
    const template = document.getElementById("member-template");
    members.forEach((member) => {
        const clone = template.content.cloneNode(true);

        // Add the data to the clone
        clone.querySelector(".member-account-type").innerText = member.accountType;
        clone.querySelector(".member-account-name").innerText = member.name;
        const fineString = ((member.unpaidFine / 100).toFixed(2)).replace(".", ",");
        clone.querySelector(".member-unpaid-fine").innerText = `Openstaande boete: €${fineString}`;
        clone.querySelector(".member-borrowed-articles").innerText = `Geleende artikelen: ${member.borrowedArticles}`;
        clone.querySelector(".member-next-turn-in-date").innerText = `Eerstvolgende inleverdatum: ${member.nextTurnInDate}`;

        membersContainer.insertBefore(clone, addMember);
    });
})});