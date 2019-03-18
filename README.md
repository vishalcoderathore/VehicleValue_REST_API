## Vehicle Value REST API

#### REST API to get value of a used car

---

## Description

This is a REST API with the endpoint as /value. This endpoint takes in data about a vehicle, then returns the value of a used car.

Given the following data:

#### MAKE & MODEL:

Verify that the make and model are known to the U.S. DEPARTMENT OF TRANSPORTATION.
If the vehicle make is not listed, return an HTTP error.

To verify the make, make value is compared against this free API:
https://vpic.nhtsa.dot.gov/api/

#### AGE:

Given the number of months of how old the car is, reduce its value one-half (0.5) percent.
After 10 years, it's value cannot be reduced further by age. This is not cumulative.

#### MILEAGE:

Given the vehicle’s mileage, reduce its value by one-fifth of a percent (0.2) for every 1,000 miles.
After 150,000 miles, it's value cannot be reduced further by miles. Do not consider any remaining miles.

#### OWNERS:

If the car has had more than 2 previous owners, reduce its value by twenty-five (25) percent.
If the car has had no previous owners, add ten (10) percent to the FINAL car value at the end.

#### COLLISIONS:

For every reported collision the car has been in, remove two (2) percent of its value, up to five (5) collisions.

#### Caveats:

- MAKE, MODEL, AGE, and OWNERS are mandatory fields – all other fields are optional. The service should calculate a value based on present data; omitted data should not affect the calculation.
- As stated above, the order of value adjustments should be applied differently if the OWNERS had a positive effect.
- Each value affecting factor should apply to the total cumulative value.
- No authentication or authorization is required.
- No data persistence is required.
- Demonstration of best practices for REST, service development, code organization, testing, and formatting.

#### API is built using the following tech stack :

- Axios
- Chai
- Express
- Mocha
- Node.JS
- Swagger
