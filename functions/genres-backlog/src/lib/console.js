module.exports = function () {
    originalLog = console.log;
    // Overwriting
    console.log = function () {
      var args = [].slice.call(arguments);
      originalLog.apply(console.log,[getCurrentDateString()].concat(args));
    };
    // Returns current timestamp
    function getCurrentDateString() {
      return (new Date()).toISOString() + ' ::';
    };
  }