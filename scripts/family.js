function capitalize(input) {
    return input.charAt(0).toUpperCase() + input.substring(1);
}

// Template copying
fetch("../scripts/placeholder.json").then((res) => {res.json().then((members) => {
    //console.log(members);
    const membersContainer = document.getElementById("members");
    const addMember = membersContainer.firstChild;
    const template = document.getElementById("member-template");
    members.forEach((member) => {
        const clone = template.content.cloneNode(true);

        // Add the data to the clone
        clone.querySelector(".member-account-type").innerText = member.accountType;
        clone.querySelector(".member-account-name").innerText = member.firstName;
        if (member.unpaidFine > 0) {
            const fineString = ((member.unpaidFine / 100).toFixed(2)).replace(".", ",");
            clone.querySelector(".member-unpaid-fine").innerText = `Openstaande boete: €${fineString}`;
        } else {
            clone.querySelector(".member-unpaid-fine").remove();
        }
        clone.querySelector(".member-borrowed-articles").innerText = `Geleende artikelen: ${member.borrowedArticles}`;
        clone.querySelector(".member-next-turn-in-date").innerText = `Eerstvolgende inleverdatum: ${member.nextTurnInDate}`;
        if (member.picture) {
            clone.querySelector(".member-profile-picture").src = member.picture;
            clone.querySelector(".member-profile-picture").alt = member.firstName;
        } else {
            clone.querySelector(".member-profile-picture").src = "../image/profile-user-svgrepo-com.svg"
            clone.querySelector(".member-profile-picture").alt = "default profile picture";
        }

        membersContainer.insertBefore(clone, addMember);

        if (member.accountType == "beheerder") {
            document.getElementById("family-name").innerText = capitalize(member.lastName);
        }
    });
})});