

let urlUser = "../data/cohorts/lim-2018-03-pre-core-pw/users.json";
let urlProgress = "../data/cohorts/lim-2018-03-pre-core-pw/progress.json";


function conexion(url) {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            let arrayConexion = JSON.parse(this.responseText);
            return arrayConexion;
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();


}