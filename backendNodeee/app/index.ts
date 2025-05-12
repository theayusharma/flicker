import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";

import projectRoutes from "./routes/projectRoutes"
import tasksRoutes from "./routes/tasksRoutes"
dotenv.config();
const port = process.env.PORT|| 3000;
const app = express();
//configgg
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());

//routesss
app.get('/', (req,res) => {
	res.send("root here")	

})


app.use("/projects", projectRoutes)

app.use("/tasks", tasksRoutes )
app.listen(port, () => {

	console.log(`app is listening at ${port}`)
})
