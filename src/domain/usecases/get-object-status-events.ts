import {MailClient} from '../../infra/mailCrawlerClient'

export const getObjectEvents = async (code:string):Promise<void> => {
  const client:MailClient = new MailClient();

  await client.init()
  const events = await client.getObjectEvents(code)

  return events
}