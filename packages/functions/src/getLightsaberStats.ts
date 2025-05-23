import { Resource } from "sst";
import { Util } from "@notes/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ScanCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async () => {
  const params = {
    TableName: Resource.LightsaberSelections.name,
    ProjectionExpression: "color"
  };

  const result = await dynamoDb.send(new ScanCommand(params));
  const items = result.Items || [];

  // Count occurrences of each color
  const colorStats = items.reduce((acc: { [key: string]: number }, item: any) => {
    const color = item.color;
    acc[color] = (acc[color] || 0) + 1;
    return acc;
  }, {});

  // Convert to array format for Recharts
  const chartData = Object.entries(colorStats).map(([color, count]) => ({
    color,
    count
  }));

  return JSON.stringify(chartData);
}); 