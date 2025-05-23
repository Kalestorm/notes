import { Resource } from "sst";
import { Util } from "@notes/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  const params = {
    TableName: Resource.LightsaberOptions.name,
    IndexName: "colorIndex",
    KeyConditionExpression: "itemType = :itemType",
    ExpressionAttributeValues: {
      ":itemType": "lightsaber"  // Common value for all items
    },
    // Use ScanIndexForward to control sort order
    ScanIndexForward: true  // true for ascending, false for descending
  };

  const result = await dynamoDb.send(new QueryCommand(params));

  // Items will be automatically sorted by color
  return JSON.stringify(result.Items);
});
