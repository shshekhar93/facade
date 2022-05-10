function getDateTime() {
  const today = new Date;
  return today.toISOString();
}

module.exports = {
  getDateTime
};
