const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const doc = document;

console.log("DEBUG #1");

// Call the createCoursesCard() function (defined below)
createCoursesCard(courses);

const alllink = doc.querySelector("#all");
const cselink = doc.querySelector("#cse");
const wddlink = doc.querySelector("#wdd");

// Anonymous () function definitions
// All button - get all courses
alllink.addEventListener('click', () => {
    console.clear();
    console.log("Clicked All");
	let allcourses = courses;
    console.log(allcourses);
	createCoursesCard(allcourses);
})

console.log("DEBUG #2");

cselink.addEventListener('click', () => {
    console.clear();
    console.log("Clicked CSE");
	let csecourses = courses.filter(courses => courses.subject.includes('CSE'));
    console.log(csecourses);
    console.log();
	createCoursesCard(csecourses);
})

console.log("DEBUG #3");

wddlink.addEventListener('click', () => {
    console.clear();
    console.log("Clicked WDD");
	let wddcourses = courses.filter(courses => courses.subject.includes("WDD"));
    console.log(wddcourses);
	createCoursesCard(wddcourses);
})

console.log("DEBUG #4");

function createCoursesCard(filteredcourses) {
    console.clear();
    console.log(`DEBUG filtered courses ${JSON.stringify(filteredcourses,null,'\t')}`);
    console.log(filteredcourses);

	// clear out last selected list of courses
	doc.querySelector(".container").innerHTML="";

    // filter(filteredcourses => filteredcourses.completed.includes("true"));

	// Foreach Subject in the courses Array, do the following
	filteredcourses.forEach(course => {

        // Has the course been completed?
        let done = course.completed;
        console.log(done);

		let card       = doc.createElement("div");
		card.classList.add("card");
		// Above - add class="card" to the above <div class="card">

        let coursename = doc.createElement("p");
        console.log("DEBUG #5");
        if (done==true) {
            coursename.classList.add("done");
        }
        else {
            coursename.classList.add("notdone");
        }

        console.log("DEBUG #6");
		// coursename.innerHTML   = `<span class="label">Course: </span> ${course.subject}${course.number}`;
        let courseNameStr = `${course.subject}${course.number} is ${done}`
        console.log(courseNameStr);
		coursename.innerHTML   = courseNameStr;

        console.log("DEBUG #7");
        card.appendChild(coursename);
        console.log(coursename);

        console.log(card);
        console.log("DEBUG #8");
        doc.querySelector(".container").appendChild(coursename);

        console.log("DEBUG #9");
	})
}

//----------------------------------------------------------------------------
// function mobileAdjust() {
//     // Get width and height of the window excluding scrollbars
//     let w = Number(doc.documentElement.clientWidth);
//     // console.log(`w = ${w}`);

//     if (w > 700) {
//         doc.getElementById("image-src").innerHTML = `<img src="./images/photo_cliff_374_480.png" 
//                                              alt="Cliff Cummings photograph" height="480" align="left">`;
//         // console.log("Large size!");
//     } else {
//         doc.getElementById("image-src").innerHTML = `<img src="./images/photo_cliff_374_480.png" 
//         alt="Cliff Cummings photograph" height="240" align="left">`;
//         // doc.getElementById("image-src").innerHTML = `<img src="./images/photo_cliff_187_240.png" 
//         //                                      alt="Cliff Cummings photograph" height="240" align="left">`;
//         // console.log("Small size!");
//     };
// }

// // Attaching the event listener function to window's resize event
// window.addEventListener("resize", mobileAdjust);

// // Calling the function for the first time
// mobileAdjust();
//----------------------------------------------------------------------------