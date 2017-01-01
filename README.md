## Build Standalone React and ReactDOM with `react-tap-event-plugin`

If you are using both React as Webpack externals and [react-tap-event-plugin](https://github.com/zilverline/react-tap-event-plugin), i.e.

```
externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    // ...
},
```

You must be facing the same problem: `InjectTapEventPlugin()` becomes invalid and no `onTouchTap` event is fired. 

The cause of the problem is discribed [here](https://github.com/zilverline/react-tap-event-plugin/issues/22):

> when u set react as a external lib, webpack won't build react into the bundle. but as InjectTapEventPlugin require some react sub files, webpack don't know these files are external，as a result it build these files into the bundle. so when InjectTapEventPlugin run and register tap event to react, it register into a standalone react env and tap event can't fire

### Solution

This repo rebuilds `react` and `react-dom` with Webpack, then export them to global variables (Currently only `window`), since Webpack's `externals` configuration tried to read them from global.

`injectTapEventPlugin()` is also called, thus you need not to call it any more.

### Usage

#### Via `<script>`

Directly include the output file before your project's bundle:

```
<script src="react-with-tap-event.min.js"></script>
<script src="bundle.js"></script>
```

#### Via Webpack

You can use it via npm either:

```
npm i build-react-with-tap-event --save
```

in your webpack config:


```
entry: {
    bundle: './scr/index.js',
    'react-with-tap-event': 'build-react-with-tap-event',
}
externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    // ...
},
```
