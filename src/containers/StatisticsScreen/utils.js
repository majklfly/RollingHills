export const calculateTotalDistance = (data) => {
  let total = 0;
  data.map((item) => (total = total + parseInt(item.distance.integerValue)));
  return total;
};

export const calculateAverageSpeed = (data) => {
  let total = [];
  data.map((item) =>
    item.locations.arrayValue.values.map((item) => {
      if (item.mapValue.fields.coords.mapValue.fields.speed.doubleValue) {
        total.push(
          parseInt(
            item.mapValue.fields.coords.mapValue.fields.speed.doubleValue
          )
        );
      }
    })
  );
  const average = total.reduce((a, b) => a + b) / total.length;
  return parseFloat(average).toFixed(2);
};

export const calculateTotalTime = (data) => {
  let total = 0;
  data.map((item) => (total = total + parseInt(item.time.integerValue)));
  return total;
};
