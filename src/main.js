const selectCohorts = document.getElementById('selectCohorts');
const total1=document.getElementById('total1');
// const idCohort = selectCohorts.value;
const tableCohorts = document.getElementById('tableCohorts');

//  const tableUserStats = document.getElementById('tableCohorts');
const sortNombre = document.getElementById('sortNombre');
const percentExercices = document.getElementById('percentExercices');
const percentQuizzes = document.getElementById('percentQuizzes');
const percentReads = document.getElementById('percentReads');
const percentQuizzesScoreAvg = document.getElementById('percentQuizzesScoreAvg');
//  let orderBy=sortNombre.value
const btnSearchStudent = document.getElementById('btnSearchStudent');
const txtObtenerValor = document.getElementById('obtenerValor');
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
const getProgress = (idCohort, orderBy, orderDirection, paramSearch) => {

    let courses = getCoursesIndex(idCohort);
    let users = getUsers(idCohort);
    tableCohorts.innerHTML = "";
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
                orderBy: orderBy,
                orderDirection: orderDirection,
                search: paramSearch
            }
            listTableStudentStats(processCohortData(options));
            console.log(options);
        });

}




//***********************************MUESTRA EL LISTADO DE COHORTS*****************************************************************/
const viewListCohorts = () => {

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

//***********************************EVENTOS DOM******************************************* */
//   selectCohorts.addEventListener('change', eventCohort(userStats));
const initEvents = () => {
    selectCohorts.addEventListener('change', (evt) => {
        console.log(evt.target.value);
        getProgress(evt.target.value, 'sortNombre', 'DESC', '');
        
    })

    btnSearchStudent.addEventListener('click', () => {
        let value = txtObtenerValor.value;
        let sortBy = sortNombre.name;
        let sortDireccion = sortNombre.value;
        let paramSearch = txtObtenerValor.value;
        console.log(sortBy + ' -' + sortDireccion + ' - ' + paramSearch);
        getProgress(idCohort, sortBy, sortDireccion, paramSearch);
    }, false);
    txtObtenerValor.addEventListener('keyup', () => {
        let value = txtObtenerValor.value;
        let sortBy = sortNombre.name;
        let sortDireccion = sortNombre.value;
        let paramSearch = txtObtenerValor.value;
        console.log(sortBy + ' -' + sortDireccion + ' - ' + paramSearch);
        getProgress(idCohort, sortBy, sortDireccion, paramSearch);
    }, false);
    sortNombre.addEventListener('click', (e) => {
        let sortBy = sortNombre.name;
        let sortDireccion = sortNombre.value;
        let paramSearch = txtObtenerValor.value;
        console.log(sortBy + ' -' + sortDireccion + ' - ' + paramSearch);
        getProgress(idCohort, sortBy, sortDireccion, paramSearch);
        if (sortDireccion == "DESC") {
            sortNombre.value = "ASC";
        } else sortNombre.value = "DESC";
    }, false);
    percentExercices.addEventListener('click', (e) => {
        let sortBy = percentExercices.name;
        let sortDireccion = percentExercices.value;
        let paramSearch = txtObtenerValor.value;
        console.log(sortBy + ' -' + sortDireccion + ' - ' + paramSearch);
        getProgress(idCohort, sortBy, sortDireccion, paramSearch);
        if (sortDireccion == "DESC") {
            percentExercices.value = "ASC";
        } else percentExercices.value = "DESC";
    }, false);
    percentQuizzes.addEventListener('click', (e) => {
        let sortBy = percentQuizzes.name;
        let sortDireccion = percentQuizzes.value;
        let paramSearch = txtObtenerValor.value;
        console.log(sortBy + ' -' + sortDireccion + ' - ' + paramSearch);
        getProgress(idCohort, sortBy, sortDireccion, paramSearch);
        if (sortDireccion == "DESC") {
            percentQuizzes.value = "ASC";
        } else percentQuizzes.value = "DESC";
    }, false);
    percentReads.addEventListener('click', (e) => {
        let sortBy = percentReads.name;
        let sortDireccion = percentReads.value;
        let paramSearch = txtObtenerValor.value;
        console.log(sortBy + ' -' + sortDireccion + ' - ' + paramSearch);
        getProgress(idCohort, sortBy, sortDireccion, paramSearch);
        if (sortDireccion == "DESC") {
            percentReads.value = "ASC";
        } else percentReads.value = "DESC";
    }, false);
    percentQuizzesScoreAvg.addEventListener('click', (e) => {
        let sortBy = percentQuizzesScoreAvg.name;
        let sortDireccion = percentQuizzesScoreAvg.value;
        let paramSearch = txtObtenerValor.value;
        console.log(sortBy + ' -' + sortDireccion + ' - ' + paramSearch);
        getProgress(idCohort, sortBy, sortDireccion, paramSearch);
        if (sortDireccion == "DESC") {getProgress
            percentQuizzesScoreAvg.value = "ASC";
        } else percentQuizzesScoreAvg.value = "DESC";
    }, false);
}

//*********************************************INVOCANDO A LAS FUNCIONES ***********************************************************************/
initEvents();
//getProgress(idCohort, 'sortNombre', 'DESC', '');
viewListCohorts()

//¨¨¨¨¨¨enviar como parametro viewcohorts a la que pinta la tabla,condicionandolo que si el valor que se option
//CUANDO SELECCIONA EL COHORT ES LIM ENTONCES QUE CARGUE LA TABLA.