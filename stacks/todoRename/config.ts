import { DeploymentDefinitionConfig } from "../utilities/deploymentDefinition";

export const config: DeploymentDefinitionConfig = {
  // Stage names can be anything, but they need to map to what you will supply in CDK_DEPLOY_STAGE
  dev: {
    accountNumber: "545801598759", // TODO modify to your dev account number
    regions: ["us-east-1"], // TODO modify to your desired regions
    // TODO add any other configuration values to any of your stages
  },
  /* Include any other stage that you will use
  staging: {
    accountNumber: "1234567890",
    regions: ["us-east-1"],
  },
  */
  prod: {
    accountNumber: "545801598759", // TODO modify to your prod account number
    regions: ["us-east-2"], // TODO modify to your desired regions
    requiresValidation: true,
  },
};

export const getConfigValue = (stage: string, key: string) => {
  return config[stage][key];
};
