import {Request, Response, Router} from "express"
import {MailClient} from '../infra/mailCrawlerClient'
import {getObjectEvents} from '../domain/usecases/get-object-status-events'

const router:Router = Router()
const client:MailClient = new MailClient()

router.get('/', async (req: Request, res: Response):Promise<void> => {
  const {code} = req.query
  
  const result = await getObjectEvents(code as string)

  res.json(result)
})

export {router}