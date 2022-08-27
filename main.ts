import { School } from "./entities";
import { getClassYoungestStudent as getClassYoungestStudentFullName, initializeSchool, printSchool, transferStudent } from "./services";

const school: School = initializeSchool();

printSchool(school);

try {
    transferStudent(school.classes[1].students[2].fullName(), school.classes[1], school.classes[2]);
}
catch {
    console.error("Couldn't find number of classes. Please try again!");
}

//printSchool(school);

console.log(getClassYoungestStudentFullName(school.classes[0]));