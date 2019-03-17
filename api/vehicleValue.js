const express = require('express');
const router = express.Router();
const axios = require('axios');

const requireQueryParams = require('../middleware/requireQueryParams');
const processAgeCost = require('../util/processCost').processAgeCost;
const processOwnershipCost = require('../util/processCost')
  .processOwnershipCost;
const processMilleageCost = require('../util/processCost').processMilleageCost;
const processCollisionCost = require('../util/processCost')
  .processCollisionCost;
const sendError = require('../util/processErrorCode');

/*
 * "/value" Endpoint that accepts a number of input data as Query Parameters
 */
router.get('/value', requireQueryParams, function(req, res) {
  const makeName = req.query.make.toLowerCase();
  const modelName = req.query.model.toLowerCase();
  const vehicleAge = parseInt(req.query.age);
  const vehicleMileage =
    typeof req.query.mileage === 'undefined'
      ? req.query.mileage
      : parseInt(req.query.mileage);
  const vehicleCollisions =
    typeof req.query.collisions === 'undefined'
      ? req.query.collisions
      : parseInt(req.query.collisions);
  const vehicleOwners = parseInt(req.query.owners);
  const modelMakeURL = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${makeName}?format=json`;

  // Assumption of a base value of a vehicle
  let baseValue = 30000;
  let makeFound = false;
  let modelFound = false;

  // Axios request to verify that the make and model are known to the U.S. DEPARTMENT OF TRANSPORTATION
  axios
    .get(modelMakeURL)
    .then(response => {
      let data = response.data;
      let results = data.Results;

      // Vehicle is not registered
      if (data.Count === 0) {
        sendError(404, 'Make', makeName, res);
        makeFound = false;
        modelFound = false;
      }

      results.forEach(element => {
        makeFound = true;
        if (element.Model_Name.toLowerCase() === modelName) {
          modelFound = true;

          // Process Age Cost
          let finalValue = baseValue - processAgeCost(vehicleAge, baseValue);

          // Process Mileage Cost if mileage is provided
          if (typeof vehicleMileage !== 'undefined') {
            finalValue -= processMilleageCost(vehicleMileage, baseValue);
          }

          // Process Collisions cost is number of collisions is provided
          if (typeof vehicleCollisions !== 'undefined') {
            finalValue -= processCollisionCost(vehicleCollisions, baseValue);
          }

          // Process Ownership cost.
          finalValue += processOwnershipCost(
            vehicleOwners,
            baseValue,
            finalValue
          );

          res.status(200).send({
            Make: element.Make_Name,
            Model: element.Model_Name,
            Base_Value: baseValue,
            New_Value: finalValue
          });
        }
      });

      if (makeFound && !modelFound) {
        sendError(404, 'Model', modelName, res);
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
