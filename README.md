## Local API of card information available by BIN

This is an api box that is deployed on your server and acts as a bin-based map information lookup.

- api is running on ```node 23.11.0```
- There is a docker configured

Available http methods:
- ```GET /v1/:bin```

The BIN must be between 6 and 8 characters, otherwise the response will be a ```bin size incorrect error```
BIN example - ```437773```

Response data
```
interface DataType {
  BIN: string;
  Brand: string;
  Type: string;
  Category: string;
  Issuer: string;
  IssuerPhone: string;
  IssuerUrl: string;
  isoCode2: string;
  isoCode3: string;
  CountryName: string;
}
```