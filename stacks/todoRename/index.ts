import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Aws, CfnOutput } from "aws-cdk-lib";
import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { FunctionUrlAuthType, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class TodoRenameStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    if (!props?.env?.region) {
      throw Error("Region not specified. Aborting...");
    }

    const dummyLambda = new NodejsFunction(this, "dummyLambda", {
      functionName: "dummyLambda",
      entry: "./services/functions/dummyLambda/handler.ts",
      handler: "main",
      environment: {
        REGION: props?.env?.region,
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
  }
}
