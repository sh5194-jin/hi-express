import "dotenv/config";
import express, { Request, Response } from "express";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 3000;

    app.get("/", (req: Request, res: Response) => {
      res.send("Hello World");
    });

    app.listen(port, () => {
      console.log(`start server http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
