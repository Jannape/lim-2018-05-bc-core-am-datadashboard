

  // realiza la conexión con archivos json
var xmlhttp = new XMLHttpRequest();
var url = "../data/cohorts/lim-2018-03-pre-core-pw/users.json";
xmlhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        outputConexion(myArr);
    }
 };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

function  outputConexion(myArr) {
    myTable.innerHTML = '';
for (let valor of myArr){
    //*************** */
   myTable.innerHTML += `
                
    <tr>
        <th >${ valor.name }</th>
   
        <td>${ valor.timezone }</td>
    </tr>
    
    `
}

        //*************** */


}


//realizar busqueda por nombre .
function myFunction() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

  

