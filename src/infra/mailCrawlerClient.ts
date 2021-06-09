import puppeteer, { Browser, Page } from 'puppeteer'
import ParseMailEvent from '../util/parse-mail-event'

export class MailClient {
  private browser?:Browser
  private page?:Page
  private mailHelper:ParseMailEvent

  constructor() {
    this.mailHelper = new ParseMailEvent()
  }

  public async init() {
    this.browser = await puppeteer.launch()
    this.page = await this.browser.newPage()
  }

  public async getObjectEvents(objectId:string) {
    await this.page?.goto("https://www2.correios.com.br/sistemas/rastreamento/resultado.cfm")
    await this.page?.screenshot({path: 'screenshot.png'});
    await this.page?.focus("#objetos")
    await this.page?.keyboard.type(objectId)
    await this.page?.click('#btnPesq')
    await this.page?.waitForSelector("table.listEvent", {visible: true })

    const eventsContent = await this.page?.$$eval("td.sroLbEvent",
    elements => elements.map(item => item.textContent))

    const eventsDate = await this.page?.$$eval("td.sroDtEvent",
    elements => elements.map(item => item.textContent))

    return this.mailHelper.parseMailEvent(eventsDate, eventsContent)
  }
}
