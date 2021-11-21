PGPASSWORD=$POSTGRES_PASSWORD psql -h $POSTGRES_HOST -U $POSTGRES_USER -p $POSTGRES_PORT -c "create database patpet;"
PGPASSWORD=$POSTGRES_PASSWORD psql -h $POSTGRES_HOST -U $POSTGRES_USER -p $POSTGRES_PORT -d patpet -f ../../backend/testdata/test.sql
