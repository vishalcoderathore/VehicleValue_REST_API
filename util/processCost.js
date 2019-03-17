module.exports = {
  /*
   * AGE:
   * Given the number of months of how old the car is, reduce its value one-half (0.5) percent.
   * After 10 years, it's value cannot be reduced further by age. This is not cumulative.
   */
  processAgeCost: function(age, carValue) {
    const ageCost = 0.5;
    return age >= 120
      ? (carValue * 120 * ageCost) / 100
      : (carValue * age * ageCost) / 100;
  },

  /*
   * OWNERS:
   * If the car has had more than 2 previous owners, reduce its value by twenty-five (25) percent.
   * If the car has had no previous owners, add ten (10) percent to the FINAL car value at the end.
   */
  processOwnershipCost: function(owners, baseValue, finalValue) {
    return owners > 2 ? (-1 * (baseValue * 25)) / 100 : (finalValue * 10) / 100;
  },

  /*
   * MILEAGE:
   * Given the vehicle’s mileage, reduce its value by one-fifth of a percent (0.2) for every 1,000 miles.
   * After 150,000 miles, it's value cannot be reduced further by miles. Do not consider any remaining miles.
   */
  processMilleageCost: function(mileage, carValue) {
    const reductionCapacity = 0.2;
    let appliedDeduction =
      mileage >= 150000
        ? (150000 / 1000) * reductionCapacity
        : (mileage / 1000) * reductionCapacity;
    return (carValue * appliedDeduction) / 100;
  },

  /*
   * COLLISIONS:
   * For every reported collision the car has been in, remove two (2) percent of its value, up to five (5) collisions.
   */
  processCollisionCost: function(collisions, carValue) {
    return collisions >= 5
      ? (5 * 2 * carValue) / 100
      : (collisions * 2 * carValue) / 100;
  }
};
