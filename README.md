# Book Picker

![book-picker in action]()

- [Demo](#demo)
- [Install](#install)
- [Setup](#setup)
- [Development](#development)

## Demo

Try out our [demo on Stackblitz](https://stackblitz.com/edit/book-picker)!

## Install

You can get it on NPM installing `book-picker` module as a project dependency.

```shell
npm install book-picker --save
```

## Setup

You'll need to add `BookPickerModule` to your application module. So that, the `<book-picker>` components will be accessible in your application.

```typescript
@NgModule({
  declarations: [
    YourAppComponent
  ],
  imports: [
    BookPickerModule,
    ...
  ],
  providers: [],
  bootstrap: [YourAppComponent]
})

export class YourAppComponent {}

```

After that, you can use the `featureToggle` components in your templates, passing the configuration data into the component itself.

- `book-picker`: Handle the skeleton animation and the skeleton styles of your app;

```html
<book-picker></book-picker>
```

## Development

### Run demo locally

1. This project uses [Angular CLI](https://cli.angular.io/) as base. That means you just need to run `npm start` and access the link `http://localhost:4200` in your browser

### Run tests

1. Run `npm test` for run tests. In case you want to test using watch, please use `npm run tdd`

### Publish

this project is using `np` package to publish, which makes things straightforward. EX: `np <patch|minor|major> --contents=dist/book-picker`

> For more details, [please check np package on npmjs.com](https://www.npmjs.com/package/np)



