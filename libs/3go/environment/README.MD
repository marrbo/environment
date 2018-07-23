# @3go/environment

## Install

```bash
$ yarn add @3go/environment
```
or
```bash
$ npm i @3go/environment --save
```

# How to

Works with angular 5 and 6.

## Demos

Angular 5:

https://stackblitz.com/edit/3go-environment-angular5

Angular 6:

- Dependencies to work: rxjs-compat .

https://stackblitz.com/edit/3go-environment-angular6

## import:

app.module.ts

```typescript
@NgModule({
  imports: [
    (...)
    GoEnvironmentModule.forRoot({
      name: "params",
      environments: {
        "localhost": "localhost",
        "prod": "api.myapp.com"
        }
      })
  ],
```

#ConfigFile: Default values

name: "config",
extension: "json",
path: "./assets/",
environments: { "localhost": "localhost" }

### app.component.ts

```typescript
export class AppComponent implements OnInit {
  constructor(private envService: GoEnvironmentService) {}

  ngOnInit(): void {
    this.envService.config().then(
      () => this.envService.replace(environment)
    );
  }
}
```

create a json file with a same name of your config.

params.json

```json
{
  "localhost": {
    "url": "some value here",
    "api": "some value here"
  },
  "prod": {
    "url": "some value here",
    "api": "some value here"
  }
}

```

# Use native environment

```html
{{ environment.url }}
{{ environment.api }}
```
