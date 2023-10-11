function capitalize(input) {
    return input.charAt(0).toUpperCase() + input.substring(1);
}

function centsToEuros(cents) {
    return ((cents / 100).toFixed(2)).replace(".", ",")
}

// Template copying
fetch("../scripts/placeholder.json").then((res) => {res.json().then((members) => {
    const membersContainer = document.getElementById("members");
    const addMember = membersContainer.firstChild;
    const template = document.getElementById("member-template");
    members.forEach((member, i) => {
        const clone = template.content.cloneNode(true);
        // Add the data to the clone
        clone.querySelector(".member-account-type").innerText = member.accountType;
        clone.querySelector(".member-account-name").innerText = member.firstName;
        if (member.unpaidFine > 0) {
            clone.querySelector(".member-unpaid-fine").innerText = `Openstaande boete: €${centsToEuros(member.unpaidFine)}`;
        } else {
            clone.querySelector(".member-unpaid-fine").remove();
        }
        
        if (member.borrowedArticles) {
            clone.querySelector(".member-borrowed-articles").innerText = `Geleende arikelen: ${member.borrowedArticles}`;
        } else {
            clone.querySelector(".member-borrowed-articles").remove();
        }
        
        if (member.nextTurnInDate) {
            clone.querySelector(".member-next-turn-in-date").innerText = `Eerstvolgende inleverdatum: ${member.nextTurnInDate}`;
        } else {
            clone.querySelector(".member-next-turn-in-date").innerText="Geen artikelen";
        }
        
        if (member.picture) {
            clone.querySelector(".member-profile-picture").src = member.picture;
            clone.querySelector(".member-profile-picture").alt = member.firstName;
        } else {
            clone.querySelector(".member-profile-picture").src = "../image/profile-user-svgrepo-com.svg"
            clone.querySelector(".member-profile-picture").alt = "default profile picture";
        }

        clone.querySelector(".member-view").href = `./lid?lid=${i}`;

        membersContainer.insertBefore(clone, addMember);

        if (member.accountType == "beheerder") {
            document.getElementById("family-name").innerText = capitalize(member.lastName);
        }
    });
})});