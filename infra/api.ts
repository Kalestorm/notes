import { table, lightsaberOptionsTable, lightsaberSelectionsTable } from "./storage";

// Create the API
export const api = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [table, lightsaberOptionsTable, lightsaberSelectionsTable]
      },
       args: {
         auth: { iam: true }
       },
    }
  }
});

//Notes API routes
api.route("POST /notes", "packages/functions/src/create.main");
api.route("GET /notes/{id}", "packages/functions/src/get.main");
api.route("GET /notes", "packages/functions/src/list.main");
api.route("PUT /notes/{id}", "packages/functions/src/update.main");
api.route("DELETE /notes/{id}", "packages/functions/src/delete.main");

//Lightsaber Options API routes
api.route("GET /lightsaberOptions", "packages/functions/src/listLightsaberOptions.main");
api.route("POST /lightsaberOptions", "packages/functions/src/createLightsaberOption.main");

//Lightsaber Selections API routes
api.route("POST /lightsaberSelections", "packages/functions/src/createLightsaberSelection.main");
api.route("GET /lightsaberSelections", "packages/functions/src/listLightsaberSelections.main");
api.route("GET /lightsaberSelections/{id}", "packages/functions/src/getLightsaberSelections.main");
api.route("DELETE /lightsaberSelections/{id}", "packages/functions/src/deleteLightsaberSelection.main");

//Lightsaber Stats API routes
api.route("GET /lightsaberStats", "packages/functions/src/getLightsaberStats.main");