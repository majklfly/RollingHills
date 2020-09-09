export const calculate1HourBadge = (time) => {
  const seconds = time / 60;
  const percentage = (seconds / 3600) * 100;
  return percentage;
};

export const calculate3HourBadge = (time) => {
  const seconds = time / 60;
  const percentage = (seconds / 10800) * 100;
  return percentage;
};

export const calculate5kmBadge = (distance) => {
  const percentage = (distance / 5000) * 100;
  return percentage;
};

export const calculate10kmBadge = (distance) => {
  const percentage = (distance / 10000) * 100;
  return percentage;
};

export const evaluateRun = (data) => {
  const datesLocal = [];
  const totalThisWeek = [];
  data.map((item) => {
    datesLocal.push(item.date.stringValue);
  });
  const dayOfTheWeek = Date().split(" ")[0];
  const month = Date().split(" ")[1];
  const day = parseInt(Date().split(" ")[2]);
  const year = Date().split(" ")[3];

  const compareMonday = (item) => {
    const date = parseInt(item.split(" ")[2]);
    if ((date = day)) {
      totalThisWeek.push(item);
    }
  };

  const compareTuesday = (item) => {
    const date = parseInt(item.split(" ")[2]);
    if (date <= day && date >= day - 1) {
      totalThisWeek.push(item);
    }
  };

  const compareWednesday = (item) => {
    const date = parseInt(item.split(" ")[2]);
    if (date <= day && date >= day - 2) {
      totalThisWeek.push(item);
    }
  };

  const compareThursday = (item) => {
    const date = parseInt(item.split(" ")[2]);
    if (date <= day && date >= day - 3) {
      totalThisWeek.push(item);
    }
  };

  const compareFriday = (item) => {
    const date = parseInt(item.split(" ")[2]);
    if (date <= day && date >= day - 4) {
      totalThisWeek.push(item);
    }
  };

  const compareSaturday = (item) => {
    const date = parseInt(item.split(" ")[2]);
    if (date <= day && date >= day - 5) {
      totalThisWeek.push(item);
    }
  };

  const compareSunday = (item) => {
    const date = parseInt(item.split(" ")[2]);
    if (date <= day && date >= day - 6) {
      totalThisWeek.push(item);
    }
  };

  datesLocal.map((item) => {
    if (item.split(" ")[3] === year) {
      if (item.split(" ")[1] === month) {
        dayOfTheWeek === "Mon" && compareMonday(item);
        dayOfTheWeek === "Tue" && compareTuesday(item);
        dayOfTheWeek === "Wed" && compareWednesday(item);
        dayOfTheWeek === "Thu" && compareThursday(item);
        dayOfTheWeek === "Fri" && compareFriday(item);
        dayOfTheWeek === "Sat" && compareSaturday(item);
        dayOfTheWeek === "Sun" && compareSunday(item);
      }
    }
  });

  return totalThisWeek.length;
};

export const evaluateRunWeekOnce = (data) => {
  const value = evaluateRun(data);
  if (value > 0) {
    return 100;
  }
  return 0;
};

export const evaluateRunWeekTwice = (data) => {
  const value = evaluateRun(data);
  if (value === 2) {
    return 100;
  } else if (value === 1) {
    return 50;
  }
  return 0;
};

export const evaluateRunEveryDay = (data) => {
  const value = evaluateRun(data);
  if (value === 7) {
    return 100;
  } else if (value === 1) {
    return 15;
  } else if (value === 2) {
    return 30;
  } else if (value === 3) {
    return 45;
  } else if (value === 4) {
    return 60;
  } else if (value === 5) {
    return 75;
  } else if (value === 6) {
    return 88;
  }
  return 0;
};
