export const doAnalytics = (req, res, next) => {
  console.log('doing analytics');
  next();
};
