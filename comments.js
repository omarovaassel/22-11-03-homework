const postId = +localStorage.getItem('postId');

$.ajax({
    url: 'https://jsonplaceholder.typicode.com/comments?postId='+postId,
    method: 'get',
    success: response => {
        $("#comments_list").empty();
        response.map(comment => $("#comments_list").append(`
        <p>Comment name: ${comment.name}</p>
        <p>E-mail: ${comment.email}</p>
        <p>Comment body: ${comment.body}</p>
        <hr>
        `))
    },
    error: error => {
        alert("Что-то пошло не так!")
    }
});