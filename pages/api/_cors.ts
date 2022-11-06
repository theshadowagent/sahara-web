import { VercelRequest, VercelResponse, VercelApiHandler } from '@vercel/node';

export const allowCors = (handler: VercelApiHandler, { useOrigin = false } = {}) => async (request: VercelRequest, response: VercelResponse) => {
  response.setHeader('Access-Control-Allow-Credentials', "true")
  // response.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  response.setHeader('Access-Control-Allow-Origin', useOrigin ? request.headers.origin ?? "*" : "*");
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-Supabase-Auth, Set-Cookie, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  response.setHeader('Access-Control-Expose-Headers', 'set-cookie')
  if (request.method === 'OPTIONS') {
    response.status(200).end()
    return
  }
  return await handler(request, response)
}