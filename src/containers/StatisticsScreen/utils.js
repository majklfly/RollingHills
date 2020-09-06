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

export const displayAverageSpeed = (data) => {
  const datesLocal = [];
  const speedsLocal = [];
  if (data) {
    data.map((item) => {
      datesLocal.push(
        item.date.stringValue.split(" ")[2] +
          " " +
          item.date.stringValue.split(" ")[1]
      );
      let total = [];
      item.locations.arrayValue.values.map((item) => {
        if (item.mapValue.fields.coords.mapValue.fields.speed.doubleValue) {
          total.push(
            parseInt(
              item.mapValue.fields.coords.mapValue.fields.speed.doubleValue
            )
          );
        }
      });
      const average = total.reduce((a, b) => a + b) / total.length;
      const correctedAverage = parseFloat(average).toFixed(2);
      speedsLocal.push(correctedAverage);
    });
  }
  return {
    labels: datesLocal.reverse(),
    datasets: [
      {
        data: speedsLocal.reverse(),
      },
    ],
  };
};

export const displayDistanceChart = (data) => {
  const datesLocal = [];
  const distancesLocal = [];
  if (data) {
    data.map((item) => {
      datesLocal.push(
        item.date.stringValue.split(" ")[2] +
          " " +
          item.date.stringValue.split(" ")[1]
      );
      distancesLocal.push(item.distance.integerValue);
    });
  }
  return {
    labels: datesLocal.reverse(),
    datasets: [
      {
        data: distancesLocal.reverse(),
      },
    ],
  };
};

export const displayTimeChart = (data) => {
  const datesLocal = [];
  const timeLocal = [];
  if (data) {
    data.map((item) => {
      datesLocal.push(
        item.date.stringValue.split(" ")[2] +
          " " +
          item.date.stringValue.split(" ")[1]
      );
      timeLocal.push(item.time.integerValue / 60);
    });
  }
  return {
    labels: datesLocal.reverse(),
    datasets: [
      {
        data: timeLocal.reverse(),
      },
    ],
  };
};
