export type DeploymentDefinitionConfig = Record<
  string,
  { accountNumber: string; regions: string[]; requiresValidation?: boolean } & Record<string, any>
>;

export class DeploymentDefinition {
  private accountNumber: string;
  private specifiedRegion: string;
  private specifiedStage: string;
  private config: DeploymentDefinitionConfig;

  constructor(config: DeploymentDefinitionConfig) {
    this.config = config;

    this.validateDeployment();
  }

  private validateDeployment() {
    if (!process.env.CDK_DEPLOY_REGION) {
      throw Error("You need to specify an AWS region to deploy to, using the CDK_DEPLOY_REGION environment variable");
    }

    if (!process.env.CDK_DEPLOY_STAGE) {
      throw Error("You need to specify a stage to deploy to, using the CDK_DEPLOY_STAGE environment variable");
    }

    this.specifiedRegion = process.env.CDK_DEPLOY_REGION;
    this.specifiedStage = process.env.CDK_DEPLOY_STAGE;

    const stage = this.config[this.specifiedStage];

    if (!stage) {
      throw Error(
        `No stage ${this.specifiedStage} is defined. Either add it to your deployment definition, or supply a stage that is currently defined`,
      );
    }

    this.accountNumber = stage.accountNumber;

    if (!stage.regions.includes(this.specifiedRegion)) {
      throw Error(
        `${this.specifiedRegion} is not included in the stage ${this.specifiedStage}. Either add it to your deployment definition, or supply a region that is currently defined`,
      );
    }

    if (stage.requiresValidation && process.env.CDK_DEPLOY_VALIDATION === undefined) {
      throw Error(
        `Deployments to ${this.specifiedStage} are protected by an additional validation. You need to provide an environment variable named CDK_DEPLOY_VALIDATION with any value.`,
      );
    }
  }

  getAccountNumber() {
    return this.accountNumber;
  }

  getRegion() {
    return this.specifiedRegion;
  }

  getStage() {
    return this.specifiedStage;
  }
}
