# backend210
Pat Pet Backend using gin and golang

## Run backend tests locally
- create a test database named `patpettest` in a local PostgreSQL instance using `psql -c "create database patpettest;"`
- import `testdata/test.sql` into `patpettest` database by running `psql -d patpettest -f testdata/test.sql`
- set mode to be `test` in `.env` file
- set `DB_HOST_TEST` variable value in `.env` file according to the running machine
- run `go test`
