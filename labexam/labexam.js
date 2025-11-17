let commentsData = {
    1: [],
    2: []
};

document.querySelectorAll(".commentForm").forEach(form => {
    let articleId = form.getAttribute("data-id");
    let selectedRating = 0;

    // star rating
   form.querySelectorAll(".stars span").forEach(star => {

    star.addEventListener("click", () => {
        selectedRating = star.getAttribute("data-value");
        form.querySelector(".selectedRating").textContent = selectedRating;

        form.querySelectorAll(".stars span").forEach(s => {
            s.classList.remove("selected");
        });

        form.querySelectorAll(".stars span").forEach(s => {
            if (s.getAttribute("data-value") <= selectedRating) {
                s.classList.add("selected");
            }
        });
    });
});

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let name = form.querySelector(".name").value.trim();
        let email = form.querySelector(".email").value.trim();
        let comment = form.querySelector(".comment").value.trim();

        let nameError = form.querySelector(".nameError");
        let emailError = form.querySelector(".emailError");
        let commentError = form.querySelector(".commentError");

        nameError.textContent = "";
        emailError.textContent = "";
        commentError.textContent = "";

        // validation
        let ok = true;

        if (name.length < 2 || name.length > 50) {
            nameError.textContent = "Name should be between 2 and 50 characters";
            ok = false;
        }

        if (email !== "" && !email.includes("@")) {
            emailError.textContent = "Please enter a valid email address";
            ok = false;
        }

        if (comment.length < 10 || comment.length > 500) {
            commentError.textContent = "Comment should between 10 and 500 characters";
            ok = false;
        }

        if (!ok) return;

        // save comment
        commentsData[articleId].push({
            name,
            email,
            comment,
            rating: Number(selectedRating)
        });

        updateComments(articleId);
        form.reset();
        selectedRating = 0;
        form.querySelector(".selectedRating").textContent = "0";
    });
});

// update comments for article
function updateComments(id) {
    let list = document.getElementById("comments" + id);
    list.innerHTML = "";

    let total = commentsData[id].length;
    let sumRating = 0;
    let ratedCount = 0;

    commentsData[id].forEach(c => {
        let box = document.createElement("div");
        box.className = "commentBox";

        box.innerHTML = `
            <strong>${c.name}</strong> (${c.email || "No Email"})<br>
            Rating: ${c.rating}<br>
            ${c.comment}
        `;

        list.appendChild(box);

        if (c.rating > 0) {
            sumRating += c.rating;
            ratedCount++;
        }
    });

    document.getElementById("count1").textContent = commentsData[1].length;
    document.getElementById("count2").textContent = commentsData[2].length;

    document.getElementById("avg1").textContent = ratedCount ? (sumRating / ratedCount).toFixed(1) : 0;
    document.getElementById("avg2").textContent = ratedCount ? (sumRating / ratedCount).toFixed(1) : 0;
}
