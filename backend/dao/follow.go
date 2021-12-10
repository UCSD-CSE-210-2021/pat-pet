package dao

import (
	"database/sql"
	"fmt"
)

func followTableName() string {
	return dbManager.getTableName("FOLLOW_TABLE_NAME")
}

func QueryFollowPets(userid string) []map[string]interface{} {

	petFields := "id, name, category, description, image_url, owner_id"
	joinStmt := " ON " + followTableName() + ".pet_id=" + petsTableName() + ".id"

	var rows *sql.Rows

	rows, _ = dbManager.db.Query(
		"SELECT "+petFields+
			" FROM "+followTableName()+" INNER JOIN "+petsTableName()+
			joinStmt+
			" WHERE follower_id = $1",
		userid)
	defer rows.Close()
	var results = dbManager.rowsToObjects(rows)
	return results
}

func UnfollowPets(userid string, petid string) bool {
	fmt.Println(userid, petid)
	_, err := dbManager.db.Exec(
		"DELETE FROM "+followTableName()+" WHERE follower_id = $1 AND pet_id = $2",
		userid,
		petid)
	if err != nil {
		return false
	}
	return true
}

func FollowPets(userid string, petid string) bool {
	sqlStatement := `INSERT INTO ` + followTableName() +
		` (seq, follower_id, pet_id) VALUES (NEXTVAL('follow_sampleid_seq'), $1, $2)`
	_, err := dbManager.db.Exec(sqlStatement, userid, petid)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}
