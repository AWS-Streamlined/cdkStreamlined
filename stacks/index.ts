#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { TodoRenameStack } from "./todoRename";
import { DeploymentDefinition } from "./deploymentDefinition";
import { ResourceNameGenerator } from "./resourceNameGenerator";
import { Tags } from "aws-cdk-lib";

const app = new cdk.App();

const deploymentDefinition = new DeploymentDefinition();

// It is best to keep the stack name short (10 characters or less), as resource names have a limited number of characters
ResourceNameGenerator.init("TodoRename", deploymentDefinition.getStage(), deploymentDefinition.getRegion());

const stack = new TodoRenameStack(app, "TodoRenameStack", {
  env: { account: deploymentDefinition.getAccountNumber(), region: deploymentDefinition.getRegion(), stage: deploymentDefinition.getStage() },
  stackName: ResourceNameGenerator.singleton().generateNameFor("stack"),
});

Tags.of(stack).add("Stage", deploymentDefinition.getStage());
