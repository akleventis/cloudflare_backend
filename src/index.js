import { Router } from 'itty-router'
import { getHomepage, getPosts, postData, deletePost, } from './utils/handlers';
import { genericInternalError, notFoundError, paramError } from './utils/errorCodes';


const router = Router();
const corsHeaders = {
  'Access-Control-Allow-Headers': "*",
  'Access-Control-Allow-Methods': "GET,HEAD,POST,OPTIONS,DELETE",
  'Access-Control-Allow-Origin': '*',
}
// ------------------------------ ENDPOINTS ----------------------------
// Get homepage
router.get('/', () => {
  const html =  getHomepage();
    return new Response(html, {
    headers: { 
      ...corsHeaders,
      'content-type': 'text/html;charset=UTF-8'},
  });
})

router.options('*', () => {
  return new Response('OK', {
    headers: {
      ...corsHeaders,
    }
  })
})
// Get all posts
router.get('/posts', async (request) => {
  try {
    let response = await getPosts();
    return new Response(response, { // default 200 code
      headers: {
        ...corsHeaders,
        'content-type': 'application/json'}
    })
  } catch (error) {
    // should return empty array, if still error, it's internal
    return genericInternalError(error.message);
  }
});

// Post 
router.post('/posts', async (request) => {
  console.log(request.method)
  const content = await request.json()
  try {

    // inserts into KV store
    const data = await postData(content);
    return new Response(data, {
      status: 201, // created
      headers: {  
        ...corsHeaders, 
        'content-type': 'application/json' },
    })
  } catch (error) {
    // missing/incorrect params
    if (error.message.includes("Missing")) return paramError(error.message);
    // internal error
    return genericInternalError(error.message)
  }
})

// Delete by id
router.delete('/posts/:id', async ({params}) => {
  try {
    const id = params.id
    // check if post is present, throw not found error if not
    const response = await deletePost(id);
    if (response===false) return notFoundError(`Post id '${id}':  not found`);
    return new Response("Post Deleted", {
      headers: { 
        ...corsHeaders,
        'content-type': 'text/plain'}
    })
  } catch (error) {
    return genericInternalError(error.message);
  }
})


// ------------------------------ EVENT LISTENER ------------------------
addEventListener('fetch', event => {
  console.log(event.request)
  event.respondWith(router.handle(event.request))
})