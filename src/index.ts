import express from "express"
import {connectDatabase} from "./helpers/connectdb.ts"
import {ENV} from "./helpers/ENV.ts"
import morgan from "morgan"
import cors from "cors"
import {type Request, type Response, type NextFunction} from "express"
import {type ApiErrType} from "./types/ApiError.types.ts"




const app = express()
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())






app.use((req:Request, res:Response, next:NextFunction) => {
    return res.status(404).json({message: "Route not found"})
})
app.use((err:ApiErrType, req:Request, res:Response, next:NextFunction) => {
    return res.status(err.statusCode || 500).json({message: err.message})
})
export const db = connectDatabase().catch((error)=>{
    console.log(`Error connecting to database: ${error}`)
    process.exit(1)
})


app.listen(ENV.PORT, () => {
    console.log("Server running on port 3000")
})



