import {Server} from "./server"


((): void => {
  const server = new Server
  server.init()
  server.start()
})()