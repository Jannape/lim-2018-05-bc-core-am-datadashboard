//FUNCION VINCULA USER.JSON CON PROGRESS.JSON
//open: ABRE CONEXION
//GET: obtener información
//TRUE :SINCRONO
//SOLICITAR CUALQUIER TIPO DE ARCHIVO
//4:Requerimiento finalizado,respuesta lista
//200:conexion correcta /OK
//RESPUESTA FINALIZADA Y CORRECTA
//responseText: retorna respuesta como texto
//da  un array del archivo users.json

//***************CONEXION PARA OBTENER EL USER.JSON**********************************************/

let xmlhttp = new XMLHttpRequest();
let url = "../data/cohorts/lim-2018-03-pre-core-pw/users.json";
xmlhttp.open("GET", url, true);
xmlhttp.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
        let arrUsers = JSON.parse(this.responseText);

        //***************CONEXION PARA OBTENER EL PROGRESS.JSON**********************************************/

        let xmlhttp2 = new XMLHttpRequest();
        var url2 = "../data/cohorts/lim-2018-03-pre-core-pw/progress.json";
        xmlhttp2.open("GET", url2, true);
        xmlhttp2.onload = function (event) {
            let ObjectProgress = JSON.parse(this.responseText);


            //***************CONEXION PARA OBTENER LOS COHORTS.JSON**********************************************/

            let xmlhttp3 = new XMLHttpRequest();
            var url3 = "../data/cohorts.json";
            xmlhttp3.open("GET", url3, true);
            xmlhttp3.onload = function (event) {
                let arrCohorts = JSON.parse(this.responseText);

                for (const iteratorCohorts of arrCohorts) {
                    // let string = '';
                    let body = document.getElementById('tbody');
                    // body.innerHTML = '';
                    //console.log(iteratorCohorts.start);
                    for (const iteratorUsers of arrUsers) {
                        if (iteratorCohorts.id === 'lim-2018-03-pre-core-pw') {
                            // console.log(iteratorCohorts.usersCount);
                            // let count = 0;
                            if (iteratorUsers.role === 'student') {
                                console.log(iteratorCohorts.id + ' ' + iteratorUsers.role + ' ' + iteratorUsers.name + ' ' + iteratorCohorts.start);
                                body.innerHTML += `
                              <tr>
                                <td>${ iteratorUsers.name}</td>
                                <td>${ iteratorUsers.signupCohort}</td>
                                <td>${ iteratorUsers.role}</td>
                                <td>${ iteratorUsers.timezone}</td>
                                <td>${ iteratorUsers.locale}</td>
                            </tr>
                                   `



                            }


                        }
                    }
                 
                }
           



            };
            xmlhttp3.send();
        };
        //********************ENVIA REQUEST AL SERVIDOR PROGRESS*******************************
        xmlhttp2.send();
    }
};
//********************ENVIA REQUEST AL SERVIDOR USERS*******************************
xmlhttp.send();



