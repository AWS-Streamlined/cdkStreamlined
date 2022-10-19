import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import httpErrorHandler from "@middy/http-error-handler";
import cors from "@middy/http-cors";
import validator from "@middy/validator";
import httpSecurityHeaders from "@middy/http-security-headers";
import httpResponseSerializer from "@middy/http-response-serializer";

export const middyfy = (
  handler: any,
  props: {
    inputSchema?: Record<string, unknown>;
    outputSchema?: Record<string, unknown>;
    origins?: string[];
    responseSerializer?: boolean;
    errorHandler?: boolean;
  } = {
    inputSchema: undefined,
    outputSchema: undefined,
    origins: ["*"],
    responseSerializer: false,
    errorHandler: false,
  },
) => {
  const internalProps = {
    inputSchema: props.inputSchema ? props.inputSchema : undefined,
    outputSchema: props.outputSchema ? props.outputSchema : undefined,
    origins: props.origins ? props.origins : ["*"],
    responseSerializer: props.responseSerializer ? props.responseSerializer : false,
    errorHandler: props.errorHandler ? props.errorHandler : false,
  };

  const middyfiedHandler = middy(handler)
    .use(httpHeaderNormalizer())
    .use(httpJsonBodyParser())
    .use(httpSecurityHeaders())
    .use(
      cors({
        origins: internalProps.origins,
      }),
    );

  if (internalProps.responseSerializer) {
    middyfiedHandler.use(
      httpResponseSerializer({
        serializers: [
          {
            regex: /^application\/json$/,
            serializer: ({ body }) => JSON.stringify(body),
          },
        ],
        default: "application/json",
      }),
    );
  }

  if (internalProps.errorHandler) {
    middyfiedHandler.use(
      // httpErrorHandler has to be the last error handler, i.e. the last middle to implement the onError
      httpErrorHandler({
        logger: (err) => {
          console.error(err);
        },
        fallbackMessage: "Something unexpected happened!",
      }),
    );
  }

  if (internalProps.inputSchema || internalProps.outputSchema) {
    middyfiedHandler.use(
      validator({
        inputSchema: internalProps.inputSchema,
        outputSchema: internalProps.outputSchema,
      }),
    );
  }

  return middyfiedHandler;
};
