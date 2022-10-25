export class ResourceNameGenerator {
  private static resourceNameGenerator: ResourceNameGenerator;

  public static init(stackName: string, stage: string, region: string) {
    if (this.resourceNameGenerator === undefined) {
      this.resourceNameGenerator = new ResourceNameGenerator(stackName, stage, region);
    }
  }

  public static singleton() {
    if (this.resourceNameGenerator === undefined) {
      throw Error("Trying to access the resource name generator before it has been initialized");
    }

    return this.resourceNameGenerator;
  }

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
