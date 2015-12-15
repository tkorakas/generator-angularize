# Angular-generator ![build](https://travis-ci.org/tkorakas/generator-angularize.svg?branch=master)

> Angular yeoman generator simple for my needs.

Install generator-anguarize from npm
[npm](https://www.npmjs.com/package/generator-angularize)

# Usage
* [Create project](#project)
* [Controller](#controller)
* [Service](#service)
* [Directive](#directive)
* [Filter](#filter)
* [Options](#options)
* [Gulp](#gulp)

## Project
 `yo angularize`

## Controller
`yo angularize:controller "name"`

## Service
`yo angularize:service "name"`

## Directive
`yo angularize:directive "name"`

## Filter
`yo angularize:filter "name"`

# Options
## Coffeescript --coffee    
`yo angularize --coffee || yo angularize:controller "name" --coffee`

## Sass --sass
> .scss extention  

`yo angularize --sass`

## Less --less
`yo angularize --less`

## Gulp
I have create some gulp tasks to build and run your angular project.   
`gulp`     
Will compile less,sass or coffee if are installed and will create a http server  
to work. Livereload works also when you change any file.    
Coffee, less and sass will compiled and webserver will reload automatically.

Have fun :)

[My page](http://tkorakas.github.io)
