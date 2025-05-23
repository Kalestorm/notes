import * as uuid from "uuid";
import { Resource } from "sst";
import { Util } from "@notes/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  let data = {
    color: "",
    meaning: "",
    description: "",
  };

  if (event.body != null) {
    data = JSON.parse(event.body);
  }

  const params = {
    TableName: Resource.LightsaberOptions.name,
    Item: {
      // The attributes of the item to be created
      LightsaberOptionId: uuid.v1(), // A unique uuid
      itemType: "lightsaber", // Common value for GSI (changed from 'type' to 'itemType')
      color: data.color, // Parsed from request body
      meaning: data.meaning, // Parsed from request body
      description: data.description, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  const result = await dynamoDb.send(new PutCommand(params));

  // Return the matching list of items in response body
  return JSON.stringify(params.Item);
});
