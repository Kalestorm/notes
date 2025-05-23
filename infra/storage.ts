// Create an S3 bucket
export const bucket = new sst.aws.Bucket("Uploads");

// Create the DynamoDB table
export const table = new sst.aws.Dynamo("Notes", {
  fields: {
    userId: "string",
    noteId: "string",
  },
  primaryIndex: { hashKey: "userId", rangeKey: "noteId" },
});


// Create an S3 bucket
export const lightsaberBucket = new sst.aws.Bucket("Lightsabers");

// Create the DynamoDB table
export const lightsaberOptionsTable = new sst.aws.Dynamo("LightsaberOptions", {
  fields: {
    LightsaberOptionId: "string",
    color: "string",
    itemType: "string"  // Changed from 'type' to 'itemType' to avoid reserved keyword
  },
  primaryIndex: { hashKey: "LightsaberOptionId" },
  globalIndexes: {
    colorIndex: {  // Name of the GSI
      hashKey: "itemType",
      rangeKey: "color",
      projection: "all"
    }
  }
});

export const lightsaberSelectionsTable = new sst.aws.Dynamo("LightsaberSelections", {
  fields: {
    userId: "string",
    LightsaberSelectionId: "string",
    createdAt: "number",
  },
  primaryIndex: { hashKey: "userId", rangeKey: "LightsaberSelectionId" },
  globalIndexes: {
    createdAtIndex: {
      hashKey: "userId",
      rangeKey: "createdAt",
      projection: "all"
    }
  }
});