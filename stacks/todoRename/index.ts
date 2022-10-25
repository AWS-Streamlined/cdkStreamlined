import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CfnOutput, Tags } from "aws-cdk-lib";
import { FunctionUrlAuthType, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { ResourceNameGenerator } from "../utilities/resourceNameGenerator";
import { DeploymentDefinition } from "../utilities/deploymentDefinition";
import { config } from "./config";

const deploymentDefinition = new DeploymentDefinition(config);

// It is best to keep the stack name short (10 characters or less), as resource names have a limited number of characters
const nameGen = new ResourceNameGenerator("TodoRename", deploymentDefinition.getStage(), deploymentDefinition.getRegion());

export class TodoRenameStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, {
      ...props,
      stackName: nameGen.generateNameFor("stack"),
    });

    const dummyLambda = new NodejsFunction(this, nameGen.generateNameFor("dummyLambda"), {
      functionName: nameGen.generateNameFor("dummyLambda"),
      entry: "./services/functions/dummyLambda/handler.ts",
      handler: "main",
      environment: {
        REGION: deploymentDefinition.getRegion(),
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

    Tags.of(this).add("Stage", deploymentDefinition.getStage());
  }
}
