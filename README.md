# cdkStreamlined

Repository that acts as a template for AWS CDK applications

## AWS CDK

[Developer Guide](https://docs.aws.amazon.com/cdk/v2/guide/reference.html)

[API Reference](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-construct-library.html)

## Bootstrap This Repository

1. Install all dependencies: `npm install`
2. Bootstrap the AWS CDK in all AWS accounts and region where you plan to deploy stacks: `npx cdk bootstrap aws://ACCOUNT-NUMBER/REGION`
3. Rename all `TodoRename` symbols to your application's name
4. Try out a deployment: `CDK_DEPLOY_ACCOUNT=<aws_account_number> CDK_DEPLOY_REGION=<aws_region> npx cdk deploy`
5. Make sure the dummy lambda function is working: `curl -X POST -H 'Content-Type: application/json' -d '{"name": "Your Name"}' <lambda_url_on_terminal>`
6. Start hacking!
