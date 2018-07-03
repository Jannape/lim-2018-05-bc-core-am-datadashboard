describe('data', () => {

  it('debería exponer función computeUsersStats en objeto global', () => {
    assert.isFunction(computeUsersStats);
  });

  it('debería exponer función sortUsers en objeto global', () => {
    assert.isFunction(sortUsers);
  });

  it('debería exponer función filterUsers en objeto global', () => {
    assert.isFunction(filterUsers);
  });

  it('debería exponer función processCohortData en objeto global', () => {
    assert.isFunction(processCohortData);
  });

  describe('computeUsersStats(users, progress, courses)', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats', () => {
      const processed = computeUsersStats(users, progress, courses);

      assert.equal(users.length, processed.length);

      processed.forEach(user => {
        assert.ok(user.hasOwnProperty('stats'));
        assert.isNumber(user.stats.percent);
        assert.isObject(user.stats.exercices);
        assert.isObject(user.stats.quizzes);
        assert.isObject(user.stats.reads);
      });
    });

    describe('user.stats para el primer usuario en data de prueba - ver carpeta data/', () => {

      const processed = computeUsersStats(users, progress, courses);

      it(
        'debería tener propiedad percent con valor 53',
        () => assert.equal(processed[0].stats.percent, 53)
      );

      it('debería tener propiedad exercises con valor {total: 2, completed: 0, percent: 0}', () => {
        assert.deepEqual(processed[0].stats.exercices, {
          total: 2,
          completed: 0,
          percent: 0,
        });
      });

      it('debería tener propiedad quizzes con valor {total: 3, completed: 2, percent: 67, scoreSum: 57, scoreAvg: 29}', () => {
        assert.deepEqual(processed[0].stats.quizzes, {
          total: 3,
          completed: 2,
          percent: 67,
          scoreAvg: 29,
          scoreSum: 57,
        });
      });

      it('debería tener propiedad reads con valor {total: 11, completed: 6, percent: 55}', () => {
        assert.deepEqual(processed[0].stats.reads, {
          total: 11,
          completed: 6,
          percent: 55,
        });
      });

    });

  });

  describe('sortUsers(userStats, orderBy, orderDirection)', () => {
    const studentA = {
      id: "gXXS7Rcic5QmbDA4k2w3RH41BdX2",
      locale: "es-PE",
      name: "Aide Reyna Huanacuni Pacho",
      role: "student",
      signupCohort: "lim-2018-03-pre-core-pw",
      stats: {
        exercices: {
          completed :2,
          percent:100,
          total:2
        },
        percent:100,
        quizzes: {
          completed:3,
          percent:100,
          scoreAvg: 89,
          scoreSum:268,
          total : 3
        },
        reads: {
          completed:11,
          percent: 100,
          total : 11,
        },
        timezone:"America/Lima"
      }
    }
    const studentB = {
      id: "MinIWOm1sHOeMguGiQoe1wjqmiC3",
      locale: "es-PE",
      name: "adriana vizcarra paitán",
      role: "student",
      signupCohort: "lim-2018-03-pre-core-pw",
      stats: {
        exercices: {
          completed :2,
          percent:100,
          total:2
        },
        percent:100,
        quizzes: {
          completed:3,
          percent:100,
          scoreAvg: 79,
          scoreSum:237,
          total : 3
        },
        reads: {
          completed:11,
          percent: 100,
          total : 11,
        },
        timezone:"America/Lima"
      }
    }
 
 
    let students = [studentA, studentB];
   
    it('debería retornar arreglo de usuarios ordenado por nombre ASC', () => {
      assert.deepEqual(window.sortUsers(students, "DESC", "sortNombre"), [studentA, studentB])
    });

    it('debería retornar arreglo de usuarios ordenado por nombre DESC', () => {
      assert.deepEqual(window.sortUsers(students, "DESC", "sortNombre"), [studentA, studentB])
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general ASC', () => {
      assert.deepEqual(window.sortUsers(students, "DESC", "sortPercentTotal"), [studentA, studentB])
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general DESC', () => {
      assert.deepEqual(window.sortUsers(students, "DESC", "sortPercentTotal"), [studentA, studentB])
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados ASC', () => {
      assert.deepEqual(window.sortUsers(students, "DESC", "sortPercentExercices"), [studentA, studentB])
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados DESC', () => {
      assert.deepEqual(window.sortUsers(students, "DESC", "sortPercentExercices"), [studentA, studentB])
    });

    it('debería retornar arreglo de usuarios ordenado por quizzes completados ASC', () => {
      assert.deepEqual(window.sortUsers(students, "DESC", "sortPercentQuizzes"), [studentA, studentB])
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados DESC', () => {
      assert.deepEqual(window.sortUsers(students, "DESC", "sortPercentQuizzes"), [studentA, studentB])
    });
    
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC', () => {
      assert.deepEqual(window.sortUsers(students, "DESC", "sortPercentQuizzesScoreAvg"), [studentA, studentB])
    });

    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC', () => {
      assert.deepEqual(window.sortUsers(students, "DESC", "sortPercentQuizzesScoreAvg"), [studentA, studentB])
    });

    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC', () => {
      assert.deepEqual(window.sortUsers(students, "DESC", "sortPercentReads"), [studentA, studentB])
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC', () => {
      assert.deepEqual(window.sortUsers(students, "DESC", "sortPercentReads"), [studentA, studentB])
    });



  });

  describe('filterUsers(usersSortStats,search)', () => {

    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)');

  });

  describe('processCohortData(options)', () => {

    it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter');

  });

});
