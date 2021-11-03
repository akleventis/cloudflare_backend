
### Cloudflare Internship Project
-------------
Backend api: https://my-worker.alex-leventis1.workers.dev

Front end: https://cloudflare-frontend-dj1.pages.dev/


GET posts/

`https://my-worker.alex-leventis1.workers.dev/posts`
 - Returns all posts stored in [cloudflares KV db system](https://developers.cloudflare.com/workers/runtime-apis/kv)
```
[
    {
        "title": "Initial",
        "username": "alex",
        "content": "Not the prettiest... but",
        "id": "1"
    },
    {
        "title": "Post2",
        "username": "alex",
        "content": "Just Aother post (:",
        "id": "3"
    },
]
```
POST posts/
 - Puts post into db, returns request, id is auto generated
```
{
    "title": "Title 3",
    "username": "its me",
    "content": "Just Aother post (:",
    "id": "5"
}
```
DELETE posts/:id
 - Deletes post by id if present, 404 not found if no post with id x
 ```
 Post Deleted || Post id '12':  not found
 ```




Further documentation for Wrangler can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler).
