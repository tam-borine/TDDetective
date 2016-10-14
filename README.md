# TDDetective :tophat:

The atom package that sneakily watches you spiking functions and reminds you to keep it TDD!
This package is currently available for Ruby.

## Installation
```
apm install TDDetective
```

## Usage

Once the package is installed, you will be able to activate it through the toggle option, which can be found by right clicking on the atom window.

![Imgur](http://i.imgur.com/tNFrgYR.png)

The package assumes that your tests will be located in a '/spec' directory and works through matching the class name and method name with the relevant \_spec file, to ensure you're TDDing!

## Customisation

If you wish to customise any of the visual features, you can edit the tddetective.less file, which is located in the styles directory.

![Imgur](http://i.imgur.com/gomhEah.png)


## Contributing

Please do contact us and let us know about your contributions!

1. Fork it! :fork_and_knife:
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :smile:

## User Stories

```
As a user,
So that I can ensure my class has a spec file,
I would like the name to be highlighted in red, until a spec has file been created

As a user,
So that I can ensure my method has a test,
I would like it to be highlighted red until a test has been written.

As a user,
So that I can customise the amount of linting,
I would like to choose how it appears in atom.
```

## The TDDetective Team

[Ewan Sheldon](https://github.com/ewansheldon)

[James Hamann](https://github.com/jameshamann)

[Matt Vickers](https://github.com/Matty79)

[Peter Miklos](https://github.com/peter-miklos)

[Tam Borine](https://github.com/tam-borine)


## License

Please view our [License](https://github.com/tam-borine/TDDetective/blob/master/LICENSE.md) for more information.
