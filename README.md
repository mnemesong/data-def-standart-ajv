# data-def-standart-ajv
Data defenition standart ajv schemes


## Description
Define ajv schema checks on schema and values definition.
```typescript
type schemaVersion = {
    schema: {type: string | array} & object,
    validValues: any[],
    invalidValues: any[]
}

type valueVersion = {
    schema: {type: string | array} & object,
    value: any
}
```


## API
```javascript
//index.js
module.exports = {
    schemaVersion: ..., //ajv schema
    valueVersion: ..., //ajv schema
}
```


## License
MIT


## Author
Anatoly Starodubtsev