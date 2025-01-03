import express, { Router } from 'express'
import cors from 'cors'


interface ServerProps {
    port: number,
    routes: Router
}

export class ServerApp {
    private readonly port: number;
    private readonly routes: Router;

    constructor(serverProps: ServerProps) {
        const { port, routes } = serverProps
        this.port = port
        this.routes = routes
    }

    public start() {
        const app = express()

        //middleware
        app.use(express.json())
        app.use(cors())

        //endpoint
        app.use('/api', this.routes)


        app.listen(this.port, () => {
            console.log(`Server listening on port: ${this.port}`)
        })
    }
}