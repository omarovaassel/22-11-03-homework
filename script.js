const authorsSelect = $("#author_select");
const postsDiv = $("#post_list");

const drawPosts = postsArray => {
    postsDiv.empty();

    postsArray.map(post => {
        postsDiv.append(`
            <div onclick="postClick(${post.id})">
                <p>Post Title: ${post.title}</p>
                <p>Post Body: ${post.body}</p>
                <hr>
            </div>
        `)
    })
}

const loadAuthors = () => {
    const settings = {
        url: 'https://jsonplaceholder.typicode.com/users',
        method: 'get',
        success: (response) => {
            authorsSelect.empty();
            authorsSelect.append(`<option value="">Выберите автора...</option>`)
            response.map(user => authorsSelect.append(`<option value="${user.id}">${user.name}</option>`)) // response - это массив, который нам возвращает сервер, идем по массиву
        },
    }

    $.ajax(settings); //вместо fetch, передаем ajax объект settings
}

loadAuthors();

const loadPosts = authorId => {
    const settings = {
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: 'get', // по умолчанию идет get, здесь просто написали
        // data: {login: asd} // передаем логин в адресную строку
        success: (response) => {  // response -  это то что нам вернет сервер
            const filteredPosts = authorId ? response.filter(post => post.userId == authorId) : response; //если автор айди есть, то я отфильтрую посты по этому автор айди, если его нет, то я полный респонс запизну в респонс
            drawPosts(filteredPosts);
        },
        error: (error) => {
            alert("что-то пошло не так")
        }
    }

    $.ajax(settings); //вместо fetch, передаем ajax объект settings
}

loadPosts();

authorsSelect.change(() => {
    const selectedUserId = authorsSelect.val();
    loadPosts(selectedUserId);
})


const postClick = postId => {
    localStorage.setItem('postId', postId);
    location.href = 'comments.html';
}