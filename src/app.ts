import { ServerRoutes } from "./presentation/router/router"
import { ServerApp } from "./presentation/serverApp"

const main = () => {
    const serverApp = new ServerApp({
        port: 3000,
        routes: ServerRoutes.router()
    })
    serverApp.start()
}


(() => {
    main()
})()