# **Mobile App: Running the Server**

### **Clone the source code**
 - Clone or down the source code from GitHub

### **Creating a MySQL database:**
 -	Create an empty database (remember the name)

### **Setup step:**
 1. Go to the following file, “./server/src/main/resources/application.properties”
 2. Update the following information
	-	[MySQL_Server_URL] - URL where the MySQL server is being hosted (localhost:3306 if you're hosting it on your computer)
	-	[DATABASE_NAME] - Name of the database that you created
	-	[DATABASE_USERNAME] - Username to access the MySQL server
	-	[DATABASE_PASSWORD] - Password to access the MySQL server
 3. Open with IntelliJ and run the application
	-	It should automatically download all the required maven dependency
 4.	The database tables will be automatically created
 5.	Execute the following SQL command into the database console
	-	‘INSERT INTO roles (id, name) VALUES (1, ‘ROLE_USER’)
	-	‘INSERT INTO roles (id, name) VALUES (2, ‘ROLE_ADMIN’)
	
### **TODO:**
 -	Automate the server setup using Docker container
