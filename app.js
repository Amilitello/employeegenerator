const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const team = []
const render = require("./lib/htmlRenderer");


function generateManager(){
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "what is your manager's name?"
        },
        {
            type: "input",
            name: "managerId",
            message: "what is your manager's Id?"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "what is your manager's email?"
        },
        {
            type: "input",
            name: "managerOfficenumber",
            message: "what is your manager's office number?"
        },
    ]).then(response=>{
        const manager= new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOfficenumber)
        team.push(manager)
        create()
    } )
}


function create(){
    inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "what type of employee do you want to add",
            choices: ["Engineer", "Intern", "None"]
        }
    ]).then(response=>{
        switch(response.employee){
            case "Engineer":
                generateEngineer()
                break;
            case "Intern":
                generateIntern()
                break;
            default:
                buildTeam()
        }
    })
}

function generateIntern(){
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "what is your intern's name?"
        },
        {
            type: "input",
            name: "internId",
            message: "what is your intern's Id?"
        },
        {
            type: "input",
            name: "internEmail",
            message: "what is your intern's email?"
        },
        {
            type: "input",
            name: "internSchool",
            message: "what is your intern's school?"
        },
    ]).then(response=>{
        const intern= new Intern(response.internName, response.internId, response.internEmail, response.internSchool)
        team.push(intern)
        create()
    } )
}

function generateEngineer(){
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "what is your engineer's name?"
        },
        {
            type: "input",
            name: "engineerId",
            message: "what is your engineer's Id?"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "what is your engineer email?"
        },
        {
            type: "input",
            name: "engineerOfficenumber",
            message: "what is your engineer's office number?"
        },
    ]).then(response=>{
        const engineer= new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerOfficenumber)
        team.push(engineer)
        create()
    } )
}

function buildTeam(){
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(team), "UTF-8")
}
generateManager()



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
