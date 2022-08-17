# **Mobile App: Running the Server**

### **Clone the source code**
 - Clone or down the source code from GitHub

### **Creating a MySQL database:**
 - Create an empty database (remember the name)
   - Ex. 'CREATE DATABASE COMP4990' - COMP4990 is the name of the database in this example

### **Setup step:**
 1. Open the project with IntelliJ (Make sure you open the Server folder and not the entire project)
 	- It should automatically download all the required maven dependency
 2. Open the following file “./server/src/main/resources/application.properties”
 3. Update the following information (make sure you remove the "[]" when adding your database information
	-	[MySQL_Server_URL] - URL where the MySQL server is being hosted (localhost:3306 if you're hosting it on your computer)
	-	[DATABASE_NAME] - Name of the database that you created
	-	[DATABASE_USERNAME] - Username to access the MySQL server
	-	[DATABASE_PASSWORD] - Password to access the MySQL server
 4.	Run the server application
 	-	The database table will be created automatically
 6.	Execute the following SQL command into the database console
	-	‘INSERT INTO roles (id, name) VALUES (1, ‘ROLE_USER’)
	-	‘INSERT INTO roles (id, name) VALUES (2, ‘ROLE_ADMIN’)
 7. Restart the server application
	
### **TODO:**
 -	Automate the server setup using Docker container
