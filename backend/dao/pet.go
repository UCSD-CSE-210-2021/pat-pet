package dao

func petsTableName() string {
	return dbManager.getTableName("PETS_TABLE_NAME")
}

func QueryPetsWithKeyWords(keyword string) []map[string]interface{} {
	rows, err := dbManager.db.Query(
		"SELECT * FROM " +
			petsTableName() +
			" WHERE LOWER(description) ILIKE $1 OR LOWER(category) ILIKE $1",
		"%"+keyword+"%")
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	var results = dbManager.rowsToObjects(rows)
	return results
}