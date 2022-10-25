#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { TodoRenameStack } from "./todoRename";
import { DeploymentDefinition } from "./deploymentDefinition";

const app = new cdk.App();

const deploymentDefinition = new DeploymentDefinition();

new TodoRenameStack(app, "TodoRenameStack", {
  env: { account: deploymentDefinition.getAccountNumber(), region: deploymentDefinition.getRegion(), stage: deploymentDefinition.getStage() },
});
