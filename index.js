var fs = require('fs');
var request = require('request');

function Fontastic(config) {
  if (config === null) config = {};
  var plugins = config.plugins;
  if (plugins === null) plugins = {};
  this.options = plugins.fontastic;
}

Fontastic.prototype.brunchPlugin = true;
Fontastic.prototype.compile = function(params) {
  var self = this;

  request('http://file.myfontastic.com/' + self.options.key + '/icons.css', function (error, response, body) {
    var content = response.body;
    var results = content.match(/([0-9]+).eot/);
    var hash = results[1];

    font_name = hash;
    if (self.options.font_name) {
      font_name = self.options.font_name;
    }

    var url = 'file.myfontastic.com/'+ self.options.key + '/fonts/' + hash;

    request('http://' + url + '.eot').pipe(fs.createWriteStream(self.options.font_path + font_name + '.eot'));
    request('http://' + url + '.woff').pipe(fs.createWriteStream(self.options.font_path + font_name + '.woff'));
    request('http://' + url + '.ttf').pipe(fs.createWriteStream(self.options.font_path + font_name + '.ttf'));
    request('http://' + url + '.svg').pipe(fs.createWriteStream(self.options.font_path + font_name + '.svg'));

    var re = new RegExp('https://' + url, 'g');

    content = content.replace(re, self.options.font_public_path + font_name);

    var extension = "css";
    if (self.options.scss === true) {
      extension = "scss";
    }

    var style_name = "font";
    if (self.options.style_name) {
      style_name = self.options.style_name;
    }

    fs.writeFile(self.options.style_path + style_name + '.' + extension, content);

  });
};

module.exports = Fontastic;