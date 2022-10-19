import { validateEnvVariables } from "../utilities/envVariables";
import { Event, Response } from "./schema";
import { customError } from "functions/utilities/errors";
import { middyfy } from "functions/utilities/middleware";

type Dependencies = {
  region: string;
};

export const builder = (deps: Dependencies) => {
  const handler = async (event: Event): Promise<Response> => {
    console.log(event);

    if (!event.body.name) {
      throw customError("InvalidInputError", "No name was provided. Aborting...");
    }

    return {
      statusCode: 200,
      body: {
        message: `Hello ${event.body.name}! You are running in ${deps.region}!`,
      },
    };
  };

  return handler;
};

export const main = middyfy(
  builder({
    region: validateEnvVariables("AWS_REGION"),
  }),
  {
    responseSerializer: true,
    errorHandler: true,
  },
);
