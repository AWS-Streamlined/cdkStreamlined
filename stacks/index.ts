#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { TodoRenameStack } from "./todoRename";

const cdkApp = process.env.CDK_DEPLOY_APP;
if (!cdkApp) {
  throw Error("You need to specify an app to deploy, using the CDK_DEPLOY_APP environment variable");
}

const app = new cdk.App();

if (cdkApp === "TodoRenameStack") {
  new TodoRenameStack(app, "TodoRenameStack", {});
}
