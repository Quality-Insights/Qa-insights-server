import router from "express";

const mainRouter = router();

mainRouter.get("/", (req, res) => {
  res.send("Hello World");
});

export default mainRouter;
