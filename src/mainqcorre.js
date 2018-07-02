function traer(url) { } {

    fetch(url)
        .then(res => res.json())
        .then(usersJson => {

            function traer(url1) { } {
                fetch(url1)
                    .then(res => res.json())
                    .then(progressJson => {

                        function traer(url2) { } {
                            fetch(url2)
                                .then(res => res.json())
                                .then(cohortsJson => {


                                    const listCohortSelec = (cohortsJson) => {
                                        selectCohorts.innerHTML = "";
                                        cohortsJson.map((elementCohorts) => {
                                            let idCohort = elementCohorts.id;
                                            selectCohorts.innerHTML += "<option value='" + idCohort + "'>" + idCohort + "</option>";

                                        });
                                    }

                                    const listCourses = (idCohort, elementCohorts) => {
                                        let courses = [];
                                        if ('lim-2018-03-pre-core-pw' === idCohort) {
                                            courses.push(elementCohorts.coursesIndex);
                                            return courses;
                                        }
                                    }
                                    const listCoursesName = (courses) => {
                                        let arrNameCourses = Object.keys(courses);
                                        arrNameCourses.map((elementCourse) => {
                                            if (courses[elementCourse] !== undefined && Object.values(courses[elementCourse]).length > 0) {
                                                let titleCourse = Object.keys(courses[elementCourse]);
                                                titleCourse.map((title) => {
                                                    console.log(title);
                                                });
                                            }
                                        });
                                    }
                                    const listUserStudent = () => { }
                                    const listUserProgress = (idCohort, course) => { }


                                    // **************************************listar cohorts//courses*************************************************************
                                    selectCohorts.innerHTML = "";
                                    let courses = [];
                                    cohortsJson.map((elementCohorts) => {
                                        let idCohort = elementCohorts.id;
                                        selectCohorts.innerHTML += "<option value='" + idCohort + "'>" + idCohort + "</option>";

                                    
                                        //************************************da el nombre de los courses ************************************ */

                                        let arrNameCourses = Object.keys(courses);

                                        arrNameCourses.map((elementCourse) => {
                                            if (courses[elementCourse] !== undefined && Object.values(courses[elementCourse]).length > 0) {
                                                let titleCourse = Object.keys(courses[elementCourse]);
                                                titleCourse.map((title) => {
                                                    console.log(title);
                                                });
                                            }
                                        });
                                    });
                                    // **************************************listar estudiantes*************************************************************
                                    tableCohorts.innerHTML = "";
                                    let users = [];
                                    usersJson.map(elementUsers => {
                                        if (elementUsers.signupCohort === 'lim-2018-03-pre-core-pw' && elementUsers.role === 'student') {
                                            users.push(elementUsers);
                                            tableCohorts.innerHTML += `
                                                     <tr>
                                                <td>${ elementUsers.name}</td>
                                                <td>${ elementUsers.signupCohort}</td>
                                               <td>${ elementUsers.role}</td>
                                               <td>${ elementUsers.timezone}</td>
                                               <td>${ elementUsers.locale}</td>
                                                   </tr>

                                   `
                                            //******************************************FX COMPUTERWITHSTATS*************************** */
                                        }

                                    }
                                    );
                                }
                                )
                        }
                    })
            }
        })
}