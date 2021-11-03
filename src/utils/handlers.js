import {allKeys} from './kv'
import apiDoc from './info.js'

 function getHomepage() {
    const html = apiDoc;
    return html;
  }
  
  // Grab all posts
  const getPosts = async () => {
    let ObjArr = [];
  
    // fill array with key value objects
    let kv = await MY_KV.list();
    for (let key of kv['keys']) {
      let data = await MY_KV.get(key['name']);
      ObjArr.push(JSON.parse(data))
    }
  
    // return formatted api response IAW https://apply.cloudflareworkers.com/general#:~:text=API%20Endpoint%201%3A%20GET%20/posts
    let apiResponse = JSON.stringify(ObjArr)
    return apiResponse
  }
  
  const postData = async (content) => {
  
    // verify correct request body
    const errorHandlerConent = postErrorHandler(content)
    if (errorHandlerConent !== content) {
      throw new Error(errorHandlerConent)
    }
  
    // generate new key && create id field (same as current key)
    const keyArr = await allKeys();
    let newKey = (keyArr.reduce((a, b) => Math.max(a, b), 0) + 1).toString(); 
    content['id'] = newKey
  
    // Insert key value pair into KV storre
    await MY_KV.put(newKey, JSON.stringify(content));
    return JSON.stringify(content)
  }
  
  // tie to correct http response
  // check for input errors 
  // should you have to provide all args?
  const postErrorHandler = (reqBody) => {
    if (!reqBody['title']){
      return "Missing title field" 
    } else if (!reqBody['username']) {
      return "Missing username"
    } else if (!reqBody['content']) {
      return "Missing content"
    } else if (Object.keys(reqBody).length > 3) {
      return "Too many fields";
    }
    return reqBody;
  }
  
  // check if post is present
  const deletePost = async (id) => {
    const currKeys = await allKeys();
    if (currKeys.includes(id.toString())){
      const res = await MY_KV.delete(id.toString());
      return true
    }
    return false;
  }



  export { getHomepage, getPosts, postData, deletePost };