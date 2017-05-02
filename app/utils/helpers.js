module.exports = function(handlebars) {
  // if conditional evaluation
  handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
    switch (operator) {
      case '==':
        return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!=':
        return (v1 != v2) ? options.fn(this) : options.inverse(this);
      case '!==':
        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&':
        return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||':
        return (v1 || v2) ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  });

  // pass stage number as param to retrieve panel
  handlebars.registerHelper('stagePanel', function(stageNum, options) {
    // let partial = handlebars.partials[name];
    let path = `code/panel-${stageNum}`;
    let partial = handlebars.handlebars.partials[path];
    if (typeof partial !== 'function') {
      return handlebars.compile(partial); // we want HTML to build so "{{{" + "}}}"
    } else {
      return partial(options);
    }
  });

};
