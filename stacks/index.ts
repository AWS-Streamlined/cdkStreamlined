#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { TodoRenameStack } from "./todoRename";

const app = new cdk.App();
new TodoRenameStack(app, "TodoRenameStack", {
  env: { account: process.env.CDK_DEPLOY_ACCOUNT, region: process.env.CDK_DEPLOY_REGION },
});
