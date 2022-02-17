import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { Orders } from 'backend/models/orders'
import { Users } from 'backend/models/users'

export default withApiAuthRequired(async function handle(req, res) {
  const session = getSession(req, res)
  const users = new Users()
  if (!session) {
    res.status(401).end
    return
  }

  const { userId } = users.getUserDataFromSession(session)
  const { method, query } = req
  const orders = new Orders()

  switch (method) {
    case 'GET': {
      // const response = await listings.listListings()
      // res.status(200).json(response)
      break
    }

    case 'POST':
      const listing = await orders.createOrder({...req.body, userId})
      res.json(listing)
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})
