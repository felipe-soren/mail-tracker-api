import express from "express"
import cors from "cors"
import * as http from 'http';
import {router as routes} from './presentation/routes'

export class Server {
  private app = express();
  private server?: http.Server

  constructor(private port = 3000) {
    this.port = port
  }

  private setupExpress(): void {
    this.app.use(express.urlencoded({extended: true}))
    this.app.use(
      cors({
        origin: '*',
      })
    );

   this.app.use(routes)
  }

  public init(): void {
    this.setupExpress()
  }

  public start(): void {
    this.server = this.app.listen(this.port, ()=> {
      console.log(`server listening on ${this.port}`)
    })
  }
}