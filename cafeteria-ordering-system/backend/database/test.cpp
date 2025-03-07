#include </usr/include/mysql-cppconn/jdbc/mysql_driver.h>
#include </usr/include/mysql-cppconn/jdbc/mysql_connection.h>
#include </usr/include/mysql-cppconn/jdbc/cppconn/prepared_statement.h>
#include </usr/include/mysql-cppconn/jdbc/cppconn/resultset.h>
#include <iostream>

void fetchFromDatabase() {
	sql::mysql::MySQL_Driver *driver;
	sql::Connection *con;

	driver = sql::mysql::get_mysql_driver_instance();
	con = driver->connect("tcp://127.0.0.1:3306", "root", "");
	sql::Statement *stmt = con->createStatement();

	stmt->executeQuery("CREATE DATABASE IF NOT EXISTS test_db");
	stmt->executeQuery("CREATE TABLE IF NOT EXISTS entries (PrimaryKey int,Name varchar(255),Price varchar(255))");
	stmt->executeQuery("INSERT INTO entries (PrimaryKey,Name,Price) VALUES(1,'This is a test name.','This is a test price.')");

	
	con->setSchema("test_db");

	sql::ResultSet *res = stmt->executeQuery("SELECT * FROM entries;");

	while (res->next()) {
		std::cout << res;	
	}

	delete res;
	delete stmt;
	delete con;
}

int main()
{
	fetchFromDatabase();
	return 0;
}
