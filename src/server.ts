import "dotenv/config";
import * as bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import cors from "cors";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 3000;
    app.use(
      cors({
        origin: "*",
      })
    );
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : res.sendStatus(400)
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    app.get("/", (req: Request, res: Response) => {
      res.send("Hello World");
    });

    app.listen(port, () => {
      console.log(`start server http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
