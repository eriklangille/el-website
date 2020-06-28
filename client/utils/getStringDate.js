const getStringDate = (currDate) => {
  if(currDate === undefined) {
    return '';
  }
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date(currDate);

  return today.toLocaleDateString("en-US", options);
};

export const getDateRange = (firstDate, secondDate) => {
  if(firstDate === undefined || secondDate === undefined) {
    return '';
  }
  var date1 = new Date(firstDate);
  var date2 = new Date(secondDate);
  var options2 = {month: 'long', year: 'numeric'}
  var options1 = {month: 'long', year: 'numeric'}
  if (date1.getFullYear() === date2.getFullYear()) {
    var options1 = {month: 'long'}
  }
  return `${date1.toLocaleDateString("en-US", options1)} to ${date2.toLocaleDateString("en-US", options2)}`
};

export default getStringDate