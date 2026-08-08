import app from "../../shared/config/server";
app.fastifyApp.listen({ host: "0.0.0.0", port: 4000 }, () => console.log(2))
export default app;