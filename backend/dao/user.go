package dao

func userTableName() string {
	return dbManager.getTableName("USER_TABLE_NAME")
}
func QueryUsersWithZipcode(zipcode string) []map[string]interface{} {
	var users = dbManager.queryField(userTableName(), "zipcode", zipcode)
	return users
}

func ScanUsers() []map[string]interface{} {
	var users = dbManager.scanTable(userTableName())
	return users
}

func UpdateUser(id string, contact string, zipcode string) bool {
	_, err := dbManager.db.Exec(
		"UPDATE " + userTableName() + " SET contact = $1, zipcode = $2 WHERE id = $3",
		contact, zipcode, id)
	if err != nil {
		return false
	}
	return true
}