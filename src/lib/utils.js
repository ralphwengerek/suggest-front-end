export default {
  nl2br: function(text) {
    return text.replace(/(\r\n|\n|\r)/g, "<br />");
  }
};
