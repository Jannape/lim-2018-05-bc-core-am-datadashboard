

let urlUser = "../data/cohorts/lim-2018-03-pre-core-pw/users.json";
let urlProgress = "../data/cohorts/lim-2018-03-pre-core-pw/progress.json";


function conexion(urlUser) {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            let arrayDateJson = JSON.parse(this.responseText);
          
          
        }
    };
    xmlhttp.open("GET", urlUser, true);
    xmlhttp.send();
  

 
    for (let valor of arrayDateJson) {
        console.log(arrayDateJson);
    }

}