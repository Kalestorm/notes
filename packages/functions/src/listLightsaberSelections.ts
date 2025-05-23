import { Resource } from "sst";
import { Util } from "@notes/core/util";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  const params = {
    TableName: Resource.LightsaberSelections.name,
    //KeyConditionExpression: "userId = :userId",
    // ExpressionAttributeValues: {
    //   ":userId": event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
    // },
  };

  const result = await dynamoDb.send(new ScanCommand(params));

  // Items will be automatically sorted by color
  return JSON.stringify(result.Items);
});
