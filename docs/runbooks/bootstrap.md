Steps to bootstrap your CDK application from this repository!

1. Install all dependencies: `npm install`
2. Bootstrap the AWS CDK in each AWS account and region where you plan to deploy stacks: `npx cdk bootstrap aws://ACCOUNT-NUMBER/REGION`
3. Rename all `TodoRename` symbols to your application's name
4. Go through all the remaining TODOs.
5. Try out a deployment: `CDK_DEPLOY_STAGE=<stage> CDK_DEPLOY_REGION=<aws_region> npx cdk deploy`
6. Make sure the dummy lambda function is working: `curl -X POST -H 'Content-Type: application/json' -d '{"name": "Your Name"}' <lambda_url_on_terminal>`
7. Start hacking!
