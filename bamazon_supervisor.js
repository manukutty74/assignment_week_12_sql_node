// This is the third part of the assignment.
// connect to the department table and display all item
// Allow the supervision to add a dept.
// perform the revenue check for each of the depart.

const mysql = require("mysql");
const inquirer = require("inquirer"); 


// connect to the required database 
const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
    user: "root",
	password: "Jagajilly5430",
	database: "bamazon"
});

supervisor_function();

function supervisor_function() {
	
	inquirer.prompt([
		{
            message: "What is the action to be performed ?",
            type: "checkbox",
            name: "topics",
            choices: ["Add a New Department","View Revenue by Department"]
            
		}
		
	]).then(function(input) {

        if(input.topics=="Add a New Department") 
        {
            console.log("Adding a New Department");
            add_new_dept();
        }
        else
        {
            console.log("View Revenue report");
            view_revenue_report();

        }

	})
}


function add_new_dept()
{

    inquirer.prompt([
		{
            
            message: "What is the New Department Name?",
            type: "input",
            name: "dept_name"
            
        }, 
        {
            
            message: "What is the New Department overhead?",
            type: "input",
            name: "dept_cost"
            
        }, 
 		
	]).then(function(input) {

      // connect to database & // Make the db query

      queryStr = 'SELECT dept_name FROM department';

        connection.query(queryStr, function(err, data) {
        if (err) throw err;
       // console.log(data);
        var depts = '' ; var a = '';
        for (i=0;i<data.length;i++)
         {
          dept = data[i].dept_name;
          
         } 
           a = dept.indexOf(input.dept_name);
           
          if(a === -1)  

          {
           
            // Create the insertion query string
		    var queryStr = 'INSERT INTO bamazon.department SET ?';

		    // Add new department to the db
		    connection.query(queryStr, input, function (error, results) {
			if (error) throw error;

			console.log('New department has been added under dept ID ' + results.insertId + '.');
			console.log("\n---------------------------------------------------------------------\n");

			connection.end();
			
            });

          }
          else
          {
            console.log("Department already exists, No duplication allowed");
            connection.end()

          }
        
        });
      
	});

}

function view_revenue_report()
{


       // connect to database. 
       // 
       // check if the dept name exists,
      // if no , then add , else display error msg.
      // close connection. 
 
       var queryStr = 'SELECT department.dept_id,department.dept_name, department.dept_cost,products.product_sales ,';
           queryStr += ' (products.product_sales - department.dept_cost) as Revenue';
           queryStr += ' FROM bamazon.products inner join department on products.department_name=department.dept_name group by department_name;';
       
            connection.query(queryStr, function(err, data) {
            if (err) throw err;

             if (data != '')
              {
//                  console.log(data);


                  console.log('---------------------------------------------\n');
                  console.log('  *** Revenue Report By Department *** ');
                  console.log('---------------------------------------------\n');
          
                  var strOut = '';
                  for (var i = 0; i < data.length; i++) {
                      strOut = '';
                      strOut += 'Dept ID: ' + data[i].dept_id + '  //  ';
                      strOut += 'Dept Name: ' + data[i].dept_name + '  //  ';
                      strOut += 'Dept Cost: ' + data[i].dept_cost + '  //  ';
                      strOut += 'Dept Sale: ' + data[i].product_sales + '  //  ';
                      strOut += 'Dept Profit: ' + data[i].Revenue +'\n';

                      console.log(strOut);
                  }


              } 
              else
              {
                  console.log("Please contact sys adm for system issue");
                 
              }

              connection.end(); 

           });


}



