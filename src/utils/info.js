let apiDoc = `<!DOCTYPE html>
<body>
    <b>GET /posts</b>
    <p>        [
    {
        "title": "Initial post",
        "username": "Alex Leventis",
        "content": "I'm hungry",
        "id": "1"
    },
    {
        "title": "Post 2",
        "username": "Alex Leventis",
        "content": "It's alive!",
        "id": "2"
    },
]
</p>

    <b>POST /posts</b>
    <li>id auto increments, tied to key</li>
    <p>{
        "title": "Internship",
        "username": "Alex",
        "content": "Chicken noodle soup"
    }</p>
    <b>DELETE /posts/:id</b>
    <li>If is not present, 404 Not found</li>
    <li>Otherwise delete and return 200</li>

    <ul>Error codes
    <li>500 Internal Service Error</li>
    <li>404 Not Found</li>
    <li>400 Bad Request</li>
    <li>201 Created</li>
    </ul>
</body>
</html>`;
export default apiDoc;