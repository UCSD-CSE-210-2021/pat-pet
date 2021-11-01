package dao

func userTableName() string {
	return dbManager.getTableName("USER_TABLE_NAME")
}
func QueryUsersWithZipcode(zipcode string) []map[string]interface{} {
	var users = dbManager.queryField(userTableName(), "zipcode", zipcode)
	return users
}