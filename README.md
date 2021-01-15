# Currency Data API

## Data:

Example of a currency data JSON object:

```
{
            "currency_name": "Indian Rupee",
            "currency_code": "INR",
            "created": "2021-01-15T12:46:32.344Z",
            "updated": "2021-01-15T12:46:32.344Z",
        }
```

## Project Specifications:

The task is to implement a model for the trade object and the REST service that exposes the `/currency` endpoint, which allows for managing the collection of currency records in the following way:

**POST** request to `/currency/add`:

- creates a new currency record
- expects a JSON currency object with currency_name and currency_code
- the response code is 200, and the response body is the created currency object

**GET** request to `/currency/list`:

- returns a collection of all currencies saved in dataBase
- the response code is 200, and the response body is an array of all currency objects

## Environment

- Node Version: ^12.18.2
- Default Port: 8000

**Commands**

- run:

```
npm start
```
