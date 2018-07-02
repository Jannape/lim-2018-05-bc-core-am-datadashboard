


const selectCohorts = document.getElementById('selectCohorts');
// const idCohort = selectCohorts.value;
  const tableCohorts = document.getElementById('tableCohorts');
//  const tableUserStats = document.getElementById('tableCohorts');
//  const sortNombre = document.getElementById('sortNombre');
//  let orderBy=sortNombre.value

idCohort = 'lim-2018-03-pre-core-pw';

//***********************************RETORNA USERS DEL COHORT *****************************************************************/
const getUsers = (idCohort) => {

    let users = [];
    fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
        .then(res => res.json())
        .then(usersJson => {
            usersJson.map(elementUsersJson => {
                if (elementUsersJson.signupCohort === idCohort && elementUsersJson.role === 'student') {
                    users.push(elementUsersJson);
                }
            })
        })
    return users;
}
//***********************************RETORNA COURSES INDEX*****************************************************************/
const getCoursesIndex = (idCohort) => {
    console.log('soy la fx getCoursesIndex');
    let courses = [];
    fetch('../data/cohorts.json')
        .then(res => res.json())
        .then(cohortJson => {
            cohortJson.map((elementCohorts) => {
                if (elementCohorts.id === idCohort) {
                    courses.push(Object.keys(elementCohorts.coursesIndex));

                }
            });
        })
    return courses
}

//***********************************MUESTRA EL LISTADO DE STUDENT con STATS************************************************************/

const listTableStudentStats = (userStats) => {
    console.log('soyla fx listTableStudenStats');
    userStats.map(elementUsers => {
        tableCohorts.innerHTML += `
                     <tr>
                <td>${ elementUsers.name.toUpperCase()}</td>
                <td>${ elementUsers.stats.exercices.percent + '%'}</td>
               <td>${ elementUsers.stats.quizzes.percent + '%'}</td>
               <td>${ elementUsers.stats.reads.percent + '%'}</td>
               <td>${ elementUsers.stats.quizzes.scoreAvg + '%'}</td>
                   </tr>
   `
    });

}

//***********************************RETORNA UN OBJETO CON USERS Y PROGRESS *****************************************************************/
const getProgress = (idCohort) => {
    console.log('soy la fx getProgress');
    let courses = getCoursesIndex(idCohort);
    let users = getUsers(idCohort);

    fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
        .then(res => res.json())
        .then(progress => {
            const options = {
                cohort: idCohort,
                cohortData: {
                    users: users,
                    progress: progress,
                    courses: courses
                },
                orderBy: 'sortNombre',
                orderDirection: 'DESC',
                search: 'Janna'
            }
           return  processCohortData(options);
            console.log(options);

        });

}




//***********************************MUESTRA EL LISTADO DE COHORTS*****************************************************************/
const viewListCohorts = () => {
    console.log('soy viewListCoohort');
    selectCohorts.innerHTML = "";
    let cohortsJsonVariable = [];
    //const traerJson = () => {
    fetch('../data/cohorts.json')
        .then(res => res.json())
        .then(cohortsJson => {
            cohortsJson.map((elementCohorts) => {
                let idCohort = elementCohorts.id;
                selectCohorts.innerHTML += "<option value='" + idCohort + "'>" + idCohort + "</option>";
                cohortsJsonVariable.push(elementCohorts);

            });
        });
}


//*********************************** MUESTRA LA LISTA DE ESTUDIANTE EN LA TABLA AL SELECCIONAR EL COHORT ***************************************/
// const eventCohort = (userStats) => {

//     const selectCohorts = document.getElementById('selectCohorts');
//      const idCohort = selectCohorts.value;
//     console.log('soy eventCohort');
//     if (idCohort === 'lim-2018-03-pre-core-pw') {
       
//         listTableStudentStats(usersStats);
//     } else {
//         alert('seleccionaste otro cohort');

//     }
// }
//************** */

//*********************************************INVOCANDO A LAS FUNCIONES ***********************************************************************/



getProgress(idCohort);
viewListCohorts();
//***********************************EVENTOS DOM******************************************* */
//   selectCohorts.addEventListener('change', eventCohort(userStats));
