import pino from "pino";
import prettyPrint from "pino-pretty";

export default pino(
  prettyPrint({
    colorize: true,
    ignore: "pid,hostname",
    translateTime: "SYS:standard",
    levelFirst: true,
    messageFormat: false,
    timestampKey: "time",
    levelKey: "level",
    messageKey: "msg",
  }),
);
