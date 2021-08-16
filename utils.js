const countDays = (
  localDay,
  localMonth,
  localYear,
  chosenDay,
  chosenMonth,
  chosenYear
) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(localYear, localMonth, localDay);
  const secondDate = new Date(chosenYear, chosenMonth, chosenDay);

  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  console.log("diff:" + diffDays);
  return diffDays;
};

export default countDays;
