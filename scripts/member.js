function centsToEuros(cents) {
    return ((cents / 100).toFixed(2)).replace(".", ",")
}

const URLParams = new URLSearchParams(window.location.search);

fetch("../../scripts/placeholder.json").then((res) => {res.json().then((members) => {
    console.log(members);
    console.log(URLParams.get("lid") ?? 0);
    const member = members[URLParams.get("lid") ?? 0];
    console.log(member);
    document.getElementById("member-name").innerText = member.firstName + " " + member.lastName;

    const currentlyBorrowedTempalate = document.getElementById("currently-borrowed-template");
    const currentlyBorrowed = document.getElementById("currently-borrowed");
    member.currentlyBorrowed.forEach((book) => {
        const clone = currentlyBorrowedTempalate.content.cloneNode(true);
        clone.querySelector(".book-name").innerText = book.name;
        clone.querySelector(".turn-in-date").innerText = book.turnInDate;
        clone.querySelector(".book-image").src = `../../image/books/${book.image}`;
        clone.querySelector(".book-image").alt = book.name;

        if (book.fine > 0) {
        clone.querySelector(".fine").innerText = "€" + centsToEuros(book.fine);
        } else {
            clone.querySelector(".fine").parentElement.remove();
        }
        currentlyBorrowed.appendChild(clone);
    });
})})