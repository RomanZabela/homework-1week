// Ideas:
// Build dynamically created classmates: collection of first names, collection of lastnames, randomly pick birth date

import { firstNames, Geography, lastNames, Mathematics, Chemistry, Physics, History, Subject } from "./constants";
import { Classroom, School, Student, Teacher } from "./entities";
import { getRandomBirthDate, getRandomValueFromArray, getFullName } from "./helpers";


//manual function

// export function initializeSchool(): School {
//     const student1: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
//     const student2: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
//     const student3: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
//     const student4: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());

//     const teacher1: Teacher = createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), [Mathematics]);

//     const student5: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
//     const student6: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
//     const student7: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
//     const student8: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    
//     const teacher2: Teacher = createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), [Geography]);

//     //zabela roman: added for testing


//     const student9: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
//     const student10: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
//     const student11: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
//     const student12: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());

//     const teacher3: Teacher = createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), [Chemistry, Physics, History]);

//     const mathClass: Classroom = createClassroom("Math", teacher1, [student1, student2, student3, student4]);
//     const geographyClass: Classroom = createClassroom("Geography", teacher2, [student5, student6, student7, student8]); //zabela roman changed teacher1
    
//     //zabela roman: added for testing

//     const TestClass: Classroom = createClassroom("Test", teacher3, [student9, student10, student11, student12]);

//     return {
//         name: "Big school",
//         address: "Moscow",
//         phone: "+7 (916) 000 12 21",
//         classes: [
//             mathClass,
//             geographyClass,
//             TestClass
//         ]
//     }
// }

// zabela roman: create classes randomly

export function initializeSchool(): School {
    let numberClasses: number = Math.ceil(Math.random() * 10);
    let numberStudents: number;
    
    let newClasses: Classroom[] = [];
    let newTeacher: Teacher;
    let newSubject: string;
    let newStudent: Student[] = [];

    for (let i: number = 0; i < numberClasses; i++) {

        newSubject = Subject[Math.floor(Math.random() * 6)];
        newTeacher = createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getProfessions());
        numberStudents = Math.ceil(Math.random() * 29);

        for (let j: number = 0; j < numberStudents; j++) {
            newStudent[j] = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
        }

        newClasses[i] = createClassroom(newSubject, newTeacher, newStudent);
        newStudent = [];
    }
    
    return {
        name: "Big school",
        address: "Moscow",
        phone: "+7 (916) 000 12 21",
        classes: newClasses,
    }
}

export function getClassYoungestStudent(classroom: Classroom): string {

    //zabela roman: added couple of strings to find youngest person 

    let indexYoungest: number = 0;
    for (let i: number = 1; i < classroom.students.length; i++ ) {
        if (classroom.students[i].birthDate > classroom.students[indexYoungest].birthDate) {
            indexYoungest = i;            
        }
    };
    return classroom.students[indexYoungest].firstName;
}

export function printSchool(school: School): void {
    console.log("School data:");
    console.log("============");
    console.log(school.name);
    console.log(school.address);
    console.log(school.phone);

    //zabela roman added for printing classes info

    console.log("");
    console.log("Classes:");
    console.log("============");

    sortClasessByName(school.classes);

    let index: number = 1;
    school.classes.forEach((classToPrint: Classroom) => {
        printClassInforamtion(classToPrint, index);
        console.log("");
        index++;
    });
}

//zabela roman: adding the function for transfering stundents

export function transferStudent(fullName: string, fromClass: Classroom, toClass: Classroom): void {
    let movingStudent: number = -1;
    
    fromClass.students.forEach((student: Student) => {
        if (student.fullName() === fullName) {
            movingStudent = fromClass.students.indexOf(student);
        }
    });

    if (movingStudent > -1) {
        toClass.students[toClass.students.length] = fromClass.students[movingStudent];
        fromClass.students.splice(movingStudent, 1);
    } else {
        console.error(`Couldn't find Student: ${fullName} in ${fromClass.name} Class`);
    }
}

function createTeacher(firstName: string, lastName: string, professions: string[]): Teacher {
    return {
        firstName: firstName,
        lastName: lastName,
        professions: professions,
        fullName: function(): string { 
            return getFullName(firstName, lastName)}
    };
}

function createStudent(firstName: string, lastName: string, birthDate: Date): Student {
    return {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,

        //zabela roman: added function for callculation age and fullname

        age: function(): number {
            const AGE_DIFFERENCE_MILLISECONDS: number = Date.now() - this.birthDate.getTime();
            const AGE_DATE: Date = new Date(AGE_DIFFERENCE_MILLISECONDS);
            return Math.abs(AGE_DATE.getUTCFullYear() - 1970);
        },
        fullName: function(): string { 
            return getFullName(firstName, lastName)}
    };
}

function createClassroom(name: string, teacher: Teacher, students: Student[]): Classroom {
    return {
        name: name,
        teacher: teacher, 
        students: students
    };
}

//zabela roman: added for printing classes info

function printClassInforamtion(classToPrint: Classroom, indexClasses: number): void {
    console.log(`Class ${indexClasses}. ${classToPrint.name}`);

    console.log(`Teacher: ${classToPrint.teacher.fullName()}: ${classToPrint.teacher.professions.join(', ')}`)
    
    console.log("Students:");

    sortStudentsByName(classToPrint.students);

    let index: number = 1;
    classToPrint.students.forEach((pupil: Student) =>{
        printStudentInformation(pupil, index);
        index++;
    })
}

//zabela roman: added for printing classes info

function printStudentInformation(studentToPrint: Student, indexStudent:number): void {
    console.log(`${indexStudent}. ${studentToPrint.fullName()}: ${studentToPrint.age()}`)
}

//zabela roman: function for sorting classes by name

function sortClasessByName(schoolClasses: Classroom[]): Classroom[] {
    return (schoolClasses.sort((currentClass, nextClass) => {
        if (currentClass.name.toLowerCase() > nextClass.name.toLowerCase()) {
            return 1;
        }
        else if (currentClass.name.toLowerCase() < nextClass.name.toLowerCase()) {
            return -1;
        }
        else {
            return 0;
        }

    }))
}

//zabela roman: added for sorting students by last name and firstname

function sortStudentsByName(classGroup: Student[]) : Student[] {
    return (classGroup.sort ((currentStudent, nextStudent) => {
        if (currentStudent.lastName.toLowerCase() > nextStudent.lastName.toLowerCase()) {
            return 1;
        } else if (currentStudent.lastName.toLowerCase() < nextStudent.lastName.toLowerCase()) {
            return -1;
        } else {
            if (currentStudent.firstName.toLowerCase() > nextStudent.firstName.toLowerCase()) {
                return 1;
            } else if (currentStudent.firstName.toLowerCase() < nextStudent.firstName.toLowerCase()) {
                return -1;
            } else {
            return 0;
            }
        }
    }))
}

//zabela roman: create a list professions for teacher

function getProfessions(): string[] {
    let numberProfessions: number = Math.floor(Math.random() * 5);
    let profession: number;
    let list: string[] = [];
    for (let i: number = 0; i <= numberProfessions; i++) {
        profession = Math.floor(Math.random() * 5);

        if (list.indexOf(Subject[profession]) == -1) {
            list.push(Subject[profession]);
        }
    }

    return list;    
}