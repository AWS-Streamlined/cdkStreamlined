import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CfnOutput, Environment } from "aws-cdk-lib";
import { FunctionUrlAuthType, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { ResourceNameGenerator } from "../resourceNameGenerator";

interface StackProps extends cdk.StackProps {
  env: Required<Environment> & {
    stage: string;
  };
}

export class TodoRenameStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const dummyLambda = new NodejsFunction(this, ResourceNameGenerator.singleton().generateNameFor("dummyLambda"), {
      functionName: ResourceNameGenerator.singleton().generateNameFor("dummyLambda"),
      entry: "./services/functions/dummyLambda/handler.ts",
      handler: "main",
      environment: {
        REGION: props.env.region,
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
