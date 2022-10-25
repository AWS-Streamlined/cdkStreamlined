export class ResourceNameGenerator {
  private stackName: string;
  private stage: string;
  private region: string;

  constructor(stackName: string, stage: string, region: string) {
    this.stackName = stackName;
    this.stage = stage;
    this.region = region;
  }

  generateNameFor(resourceName: string) {
    return `${this.stackName}-${this.stage}-${this.region}-${resourceName}`;
  }
}
