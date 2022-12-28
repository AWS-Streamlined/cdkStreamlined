import * as cdk from "aws-cdk-lib";
import { Tags } from "aws-cdk-lib";
import { Construct } from "constructs";
import { DeploymentDefinition } from "../utilities/deploymentDefinition";
import { ResourceNameGenerator } from "../utilities/resourceNameGenerator";
import { config } from "./config";
import { Functions } from "./functions";

export class TodoRenameStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    const deploymentDefinition = new DeploymentDefinition(config);
    // It is best to keep the stack name short (10 characters or less), as resource names have a limited number of characters
    const nameGen = new ResourceNameGenerator("TodoRename", deploymentDefinition.getStage(), deploymentDefinition.getRegion());
    
    super(scope, id, {
      ...props,
      env: {
        account: deploymentDefinition.getAccountNumber(),
        region: deploymentDefinition.getRegion(),
      },
      stackName: nameGen.generateNameFor("stack"),
    });

    new Functions(this, nameGen.generateNameFor("functions"), {
      region: deploymentDefinition.getRegion()
    })

    Tags.of(this).add("Stage", deploymentDefinition.getStage());
  }
}
