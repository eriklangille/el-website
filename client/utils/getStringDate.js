const getStringDate = (currDate) => {
  if(currDate === undefined) {
    return '';
  }
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date(currDate);

  return today.toLocaleDateString("en-US", options);
};

export default getStringDate