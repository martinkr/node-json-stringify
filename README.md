# JSON Stringify
An isomorphic service with one purpose: stringify a JSON-Object. Simple but convenient.

## Whait what?!
Just paste an arbitrary JSON-Object into the ```textarea``` and hit the ```button```.
You will eithter get an ```error message``` or the Object as valid JSON-String ready to go.

**Bonus**: The output is already copied to your clipboard!

You can also type directly into the ```textarea``` and get instant feedback. Just try it.

# Online
[https://json-stringify.now.sh](https://json-stringify.now.sh)

# Local
Clone the repository: ``` $ git clone https://github.com/martinkr/node-json-stringify.git```

## Docker
- Build the image: ```$ docker build -t jsonstringify:latest . ```
- Start the container: ```$ docker run -p 3001:3000 jsonstringify:latest```
- Go to: [http://localhost:3000](http://localhost:3000)

Uses ``` alpine:3.6``` and ```node:8.4.0```.


## Direct
- Install dependencies ```$ npm install``` or ```$ yarn ```
- Build the files and start server ```$ npm start``` or ```$ yarn start ```
- Go to: [http://localhost:3000](http://localhost:3000)

Requires ```nodejs```. Recomended: ```v8.4.0```, but it might work with older versions too.

# Tech Stack
- Isomorphic ecmaScript 2015  with ```babeljs v6.23.0```, ```babelify v7.3.0```, ```browserify v14.4.0``` and ```uglify-js v3.0.28 ```
- Rendering ```Mustache v2.3.0``` templates
- CSS 3 piped through ```postcss-cli v4.1.1``` with ```cssnano v3.10.0``` and ```cssnano-preset-advanced v4.0.0-rc.2```,
- Running on ```express`v4.14.1```
- With ```forever v0.15.3```


# License

Licensed under the [MIT licenses](http://www.opensource.org/licenses/mit-license.php).

Copyright (c) 2016, 2017 Martin Krause <github@mkrause.info> [http://martinkr.github.io](http://martinkr.github.io)