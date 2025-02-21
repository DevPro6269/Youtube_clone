function timeAgo(timestamp) {
    const now = new Date();
    const pastDate = new Date(timestamp);
    const differenceInSeconds = Math.floor((now - pastDate) / 1000);
  
    const minutes = 60;
    const hours = 60 * minutes;
    const days = 24 * hours;
    const months = 30 * days; // Approximation
    const years = 12 * months;
  
    if (differenceInSeconds < minutes) {
      return `${differenceInSeconds} seconds ago`;
    } else if (differenceInSeconds < hours) {
      const minutesAgo = Math.floor(differenceInSeconds / minutes);
      return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    } else if (differenceInSeconds < days) {
      const hoursAgo = Math.floor(differenceInSeconds / hours);
      return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    } else if (differenceInSeconds < months) {
      const daysAgo = Math.floor(differenceInSeconds / days);
      return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    } else if (differenceInSeconds < years) {
      const monthsAgo = Math.floor(differenceInSeconds / months);
      return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
    } else {
      const yearsAgo = Math.floor(differenceInSeconds / years);
      return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
    }
  }
  export default timeAgo;
  