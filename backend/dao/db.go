package dao

import (
	"database/sql"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"log"
)

type DatabaseManager struct {
	db *sql.DB
	connString string
	driver string
	tableNamesMapping map[string]string
}

var dbManager *DatabaseManager

func InitializeDB() {
	envs, _ := godotenv.Read(".env")
	var connString string
	mode := envs["MODE"]
	if mode == "prod" {
		connString = envs["DB_HOST_PROD"]
	} else {
		connString = envs["DB_HOST_DEV"]
	}
	dbManager = &DatabaseManager{connString: connString, driver: "postgres"}
	dbConnected, err := sql.Open(dbManager.driver, dbManager.connString)
	err = dbConnected.Ping()
	if err != nil {
		panic(err)
	}
	dbManager.db = dbConnected

	tableNames, _ := godotenv.Read(".tablenames")
	dbManager.tableNamesMapping = make(map[string]string)
	for key, val := range tableNames {
		dbManager.tableNamesMapping[key] = val
	}
}

func (dbManager *DatabaseManager) getTableName(envTableKey string) string {
	val, ok := dbManager.tableNamesMapping[envTableKey]
	if !ok {
		log.Fatal("dao.db.getTableName: Table key does not exist!")
	}
	return val
}
func (dbManager *DatabaseManager) rowsToObjects(rows *sql.Rows) []map[string]interface{} {
	colNames, _ := rows.Columns()
	var retVals = make([]map[string]interface{}, 0)
	for rows.Next() {
		var object = make(map[string]interface{})
		cols := make([]interface{}, len(colNames))
		colPtrs := make([]interface{}, len(colNames))
		for i := 0; i < len(colNames); i++ {
			colPtrs[i] = &cols[i]
		}
		// scan all cols of the current row
		err := rows.Scan(colPtrs...)
		if err != nil {
			log.Fatal(err)
		}
		for i, col := range cols {
			object[colNames[i]] = col
		}
		retVals = append(retVals, object)
	}
	return retVals
}

func (dbManager *DatabaseManager) scanTable(tableName string) []map[string]interface{} {
	rows, _ := dbManager.db.Query("SELECT * FROM " + tableName)
	defer rows.Close()
	var results = dbManager.rowsToObjects(rows)
	return results
}

func (dbManager *DatabaseManager) queryField(
	tableName string,
	fieldName string,
	expected string) []map[string]interface{} {
	rows, _ := dbManager.db.Query("SELECT * FROM " + tableName + " WHERE " + fieldName + " = $1", expected)
	defer rows.Close()
	return dbManager.rowsToObjects(rows)
}


