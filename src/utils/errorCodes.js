const corsHeaders = {
  'Access-Control-Allow-Headers': "*",
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Origin': '*',
}
const genericInternalError = (errMessage) => {
    return new Response(errMessage, {
      status: 500,
      error: errMessage,
      statusText: "Internal Server Error",
      headers: {
        ...corsHeaders,
        'content-type': 'text/plain'}
    })
  }
  
  const notFoundError = (errMessage) => {
    return new Response(errMessage, {
      status: 404,
      error: errMessage,
      statusText: "Not Found",
      headers: {
        ...corsHeaders,
        'content-type': 'text/plain'}
    })
  }
  
  const paramError = (errMessage) => {
    return new Response(errMessage, {
      status: 400,
      error: errMessage,
      statusText: "Bad Request",
      headers: {
        ...corsHeaders,
        'content-type': 'text/plain'}
    })
  }

  export {genericInternalError, notFoundError, paramError}