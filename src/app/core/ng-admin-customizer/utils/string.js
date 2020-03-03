String.prototype.toCamelCase = function(text) {
  text = text || this;

  if (!text) {
    return text;
  }

  let f = text.charAt(0).toUpperCase();
  text = f + text.substr(1);

  return text.replace(/[-_.\s](.)/g, function (match, group1) {
    return ' ' + group1.toUpperCase();
  });
};
