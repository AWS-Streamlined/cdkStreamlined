import { CfnOutput } from "aws-cdk-lib";
import { FunctionUrlAuthType, IFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

type Props = {
  region: string;
}

export class Functions extends Construct {
  dummyLambda: IFunction;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const dummyLambda = new NodejsFunction(this, `${id}-dummyLambda`, {
      functionName: `${id}-dummyLambda`,
      entry: "./services/functions/dummyLambda/handler.ts",
      handler: "main",
      environment: {
        REGION: props.region,
      },
      runtime: Runtime.NODEJS_16_X,
    });

    const fnUrl = dummyLambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    });

    new CfnOutput(this, "TheUrl", {
      // The .url attributes will return the unique Function URL
      value: fnUrl.url,
    });

    this.dummyLambda = dummyLambda;
  }
}
