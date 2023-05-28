export const calculateExperience = (start) => {
  const now = new Date();
  const startDate = new Date(start);
  const totalMonths =
    (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
  const text = `${Math.floor(totalMonths / 12)} years and ${totalMonths % 12} months`;
  return { text, value: totalMonths };
};

// calculate time difference between two dates in years and months
export const calculatePastExperience = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
  const text = `${Math.floor(totalMonths / 12)} years and ${totalMonths % 12} months`;
  return { text, value: totalMonths };
};
