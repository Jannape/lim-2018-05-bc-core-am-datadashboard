const avgQuizzesProm = (a, b) => {
    if (a !== 0 && b !== 0) {
        // console.log('debe retorna un valor');
        return a / b;
    } else {
        return 0;

    }
}

window.computeUsersStats = (users, progress, courses) => {

    const arrIdsProgress = Object.keys(progress);
    let totalN1 = 0;
    let totalN2 = 0;
    let totalN3 = 0;
    for (const iteratorUsers of users) {
        for (const iteratorIds of arrIdsProgress) { //itero los ids de progress
            for (const iteratorCourses of courses) {
                if (iteratorUsers.id === iteratorIds) { //comparpo que el ID USER SEA IGUAL AL ID DE PROGRESS
                    let quizzTotal = 0; //cuantos quizzes existen en el curso 
                    let quizzCompleted = 0; //cuantos de los quizzes hizo el estudiante
                    let quizzScoreSum = 0; //suma de las puntuaciones de los quizzes resueltos.
                    let countReadsTotal = 0;
                    let countReadsCompleted = 0;

                    //ENTRIES//convierte el objeto en un array //lo usamos para comprobar  el largo si el objeto es un objeto vacion
                    if (Object.entries(progress[iteratorIds]).length !== 0) {
                        let unitsIntro = progress[iteratorIds].intro.units;
                        // console.log(unitsIntro);
                        for (iteratorUnits in unitsIntro) {

                            // console.log(unitsIntro);
                            const partsUnit = unitsIntro[iteratorUnits].parts;
                            for (iteratorParts in partsUnit) {
                                //  console.log(partsUnit);
                                //  console.log(iteratorParts);
                                const type = partsUnit[iteratorParts].type;
                                const completed = partsUnit[iteratorParts].completed;
                                if (type === 'quiz') {
                                    quizzTotal++;
                                    if (completed === 1) { quizzCompleted++ }
                                   
                                    if ((partsUnit[iteratorParts]).hasOwnProperty('score')) {
                                      
                                        quizzScoreSum += partsUnit[iteratorParts].score
                                    }
                                }
                                if (type === 'read') {
                                    countReadsTotal++
                                    if (completed === 1) {
                                        countReadsCompleted++
                                    }
                                }
                            }

                        }
                   
                        iteratorUsers['stats'] = {
                            reads: {
                                total: countReadsTotal,
                                completed: countReadsCompleted,
                                percent: Math.round((countReadsCompleted / countReadsTotal) * 100)
                            },
                            quizzes: {
                                total: quizzTotal,
                                completed: quizzCompleted,
                                percent: Math.round((quizzCompleted / quizzTotal) * 100),
                                scoreSum: quizzScoreSum,
                                scoreAvg: Math.round(avgQuizzesProm(quizzScoreSum, quizzCompleted))
                            },
                            percent: progress[iteratorIds][iteratorCourses].percent,
                            exercices: {

                                total: ((Object.keys(unitsIntro['02-variables-and-data-types']['parts']['06-exercises']['exercises'])).length),
                                completed: unitsIntro['02-variables-and-data-types']['parts']['06-exercises']['exercises']['01-coin-convert']['completed'] +
                                    unitsIntro['02-variables-and-data-types']['parts']['06-exercises']['exercises']['02-restaurant-bill']['completed'],
                                percent: Math.round(((unitsIntro['02-variables-and-data-types']['parts']['06-exercises']['completed']) * 100))
                            }
                        }
                    } else if (Object.entries(progress[iteratorIds]).length === 0) {
                        iteratorUsers['stats'] = {
                            reads: {
                                total: 0,
                                completed: 0,
                                percent: 0
                            },
                            quizzes: {
                                total: 0,
                                completed: 0,
                                percent: 0,
                                scoreSum: 0,
                                scoreAvg: 0
                            },
                            percent: 0,
                            exercices: {
                                total: 0,
                                completed: 0,
                                percent: 0,
                            }

                        }
                    } totalN1 += iteratorUsers.stats.exercices.percent;

                    totalN2 += iteratorUsers.stats.reads.percent;

                    totalN3 += iteratorUsers.stats.quizzes.percent;



                }

            }
        }
    }
    total1A = Math.round(totalN1 / 100);
    total2A = Math.round(totalN2 / 100);
    total3A = Math.round(totalN3 / 100);

    document.getElementById("total1").innerText = total1A;
    document.getElementById("total2").innerText = total2A;
    document.getElementById("total3").innerText = total3A;
    return users;


}
window.sortUsers = (userStats, orderBy, orderDirection) => {
    console.log('soy fx sortUsers');

    let listOrder = userStats
    if (orderBy === "sortNombre") {
        listOrder.sort((a, b) => {
            let elementA = a.name.toLowerCase();
            let elementB = b.name.toLowerCase();
            if (elementA < elementB)
                return -1
            if (elementA > elementB)
                return 1
        });
    }
    if (orderBy === "sortPercentTotal") {
        listOrder.sort((a, b) => {
            let elementA = a.stats.percent;
            let elementB = b.stats.percent;
            if (elementA < elementB)
                return -1
            if (elementA > elementB)
                return 1
        });
    }
    if (orderBy === "sortPercentExercices") {
        listOrder.sort((a, b) => {
            let elementA = a.stats.exercices.percent;
            let elementB = b.stats.exercices.percent;
            if (elementA < elementB)
                return -1
            if (elementA > elementB)
                return 1
        });
    }

    if (orderBy === "sortPercentReads") {
        listOrder.sort((a, b) => {
            let elementA = a.stats.reads.percent;
            let elementB = b.stats.reads.percent;
            if (elementA < elementB)
                return -1
            if (elementA > elementB)
                return 1
        });
    }
    if (orderBy === "sortPercentQuizzes") {
        listOrder.sort((a, b) => {
            let elementA = a.stats.quizzes.percent;
            let elementB = b.stats.quizzes.percent;
            if (elementA < elementB)
                return -1
            if (elementA > elementB)
                return 1
        });
    }
    if (orderBy === "sortPercentQuizzesScoreAvg") {
        listOrder.sort((a, b) => {
            let elementA = a.stats.quizzes.scoreAvg;
            let elementB = b.stats.quizzes.scoreAvg;
            if (elementA < elementB)
                return -1
            if (elementA > elementB)
                return 1
        });
    }
    //*******porcentaje de completitud general del usuario**********************
    if (orderDirection === "DESC") {
        listOrder = listOrder.reverse();

    }

    return listOrder;
}


window.filterUsers = (users, search) => {
    let listFilter = users.filter(user => (user.name.toUpperCase()).indexOf(search.toUpperCase()) !== -1);
    console.log('hola filter');
    console.log(listFilter);
    return listFilter;
}

window.processCohortData = (options) => {

    const users = options.cohortData.users;
    const cohort = options.cohort;
    const progress = options.cohortData.progress;
    const courses = options.cohortData.courses;
    const orderBy = options.orderBy;
    const orderDirection = options.orderDirection;
    const search = options.search;
    let userStats = computeUsersStats(users, progress, courses);
    let usersSortStats = sortUsers(userStats, orderBy, orderDirection);
    console.log('hola soyyyyusersSortStats');
console.log(usersSortStats);
    if (search !== "") {
        studentsFilterUsers = filterUsers(usersSortStats, search);
        console.log('hola filter');
        console.log(studentsFilterUsers);
    } else studentsFilterUsers = usersSortStats;
   
    return studentsFilterUsers;
}