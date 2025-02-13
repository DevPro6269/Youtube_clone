function WrapAsync(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res)) // Wrapping the async function in a promise
        .catch(next); // Pass any errors to the next middleware
    };
  }
  
  export default WrapAsync;
  