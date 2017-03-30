// utility object

var Util = function() {};

/* STATIC METHODS */

Util.SQL = function(parts, ...values) {
  return {
    text: parts.reduce(function(prev, curr, i) {
      return prev+"$"+i+curr;
    }),
    values
  };
};

module.exports = Util; // export class
