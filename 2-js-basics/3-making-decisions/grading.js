let allStudents = [
    'A',
    'B-',
    1,
    4,
    5,
    2
  ]
  
let studentsWhoPass = [];

function checkGrade(allStudents){
    let passingNum = 3;
    let passingLetters = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'];
    for (let i = 0; i < allStudents.length; i++){
        let student = [`[ID:${i}`, ` Grade:${allStudents[i]}]`]
        if (allStudents[i] >= passingNum){
            studentsWhoPass.push(student);
        }
        else if (passingLetters.includes(allStudents[i])){
            studentsWhoPass.push(student);
        }
    }
    console.log('Students who passed: ' + studentsWhoPass);
} 

checkGrade(allStudents);