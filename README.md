# Download your fonts from the awesome Fontastic webapp

## This is my Gulp plugin portability : https://github.com/Metrakit/gulp-fontastic

This Brunch plugin will download your fonts from Fontastic webapp (https://app.fontastic.me) and copy in folder the fonts with a hash and the style in .css file or .scss file.

I have make this plugin because for my personnal developments I'm using the Fontastic CDN when I'm developing then I'm using the fonts in local for the production. So this plugin can get automatically the fonts thanks to your brunch workflow.

## Usage :

```
fontastic:
      key: 'your-api-key'
      font_path: '../fonts/'
      font_public_path: 'fonts/'
      style_path: 'app/scss/'
      style_name: '_font'
      scss: true
      font_name: "my_font"
```

## TODO

- Create fonts and style folders if they doesnt exist
- Clean the fonts folder before to generate the new fonts
