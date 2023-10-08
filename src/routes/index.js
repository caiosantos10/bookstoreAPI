import express from "express";
import bookRoutes from "./bookRoutes.js";
import authorRoutes from "./authorRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Curso de node"));
  app.use(express.json(), bookRoutes, authorRoutes);
};

export default routes;