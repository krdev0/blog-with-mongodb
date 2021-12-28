const loadCommentsButton = document.getElementById("load-comments-btn");
const commentsSection = document.getElementById("comments");
const commentForm = document.querySelector("#comments-form form");
const commentTitle = document.getElementById("title");
const commentText = document.getElementById("text");

function createCommentsList(comments) {
    const commentListEl = document.createElement("ol");

    for (const comment of comments) {
        const commentEl = document.createElement("li");
        commentEl.innerHTML = `
        <article class="comment-item">
            <h2>${comment.title}</h2>
            <p>${comment.text}</p>
        </article>
        `;

        commentListEl.append(commentEl);
    }

    return commentListEl;
}

async function fetchCommentsForPost(e) {
    const postId = loadCommentsButton.dataset.postid;

    try {
        const commentsResponse = await fetch(`/posts/${postId}/comments`);

        if (!commentsResponse.ok) {
            alert('Fetching comments failed!');
            return;
        }
        const commentsData = await commentsResponse.json();

        if (commentsData && commentsData.length > 0) {
            const commentsListElement = createCommentsList(commentsData);
            commentsSection.innerHTML = '';
            commentsSection.append(commentsListElement);
        } else {
            commentsSection.firstElementChild.textContent = "We could not find any comments";
        }
    } catch (error) {
        alert('Getting comments failed!');
    }


}

async function saveComment(e) {
    e.preventDefault();
    const postId = loadCommentsButton.dataset.postid;
    const title = commentTitle.value;
    const text = commentText.value;

    const comment = {
        title: title,
        text: text
    }

    try {
        const response = await fetch(`/posts/${postId}/comments`, {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            fetchCommentsForPost();
        } else {
            alert('Could not send the comment!');
        }
    } catch (error) {
        alert('Could not send request! Try again later.');
    }
}

loadCommentsButton.addEventListener("click", fetchCommentsForPost);
commentForm.addEventListener("submit", saveComment);