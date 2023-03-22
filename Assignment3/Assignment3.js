var tablelength = 11;
var numofcolumns = 8;
var assignmentnum = 5;
var loop = 1;
var unsubmittedassignments = 0;
var loop2 = 1;
var currentdisplaymethod = "percent";
var isgpa = false;
calculateFinalGrade();
cellrefresher();
var refresh =setInterval(calculateFinalGrade, 1000);
var refresh2 =setInterval(cellrefresher, 1500);
var refresh3 = setInterval(unfinishedAssignments, 600);
/* these next two statements simply use for loops and the document and 
insert functions to allow for the amount of rows(students) and columns(assignments) to be increased*/
    function myCreateFunction() {
        let table = document.getElementById("myTable");
        let row = table.insertRow(tablelength);
        tablelength++;
      for(let i = 0; i < numofcolumns; i++){
        let cell = row.insertCell(i);
        if((i>1)&&(i<numofcolumns-1)){
          cell.setAttribute("contenteditable",true);
          cell.setAttribute("class","rowstyle2");
        }
        if ((i==1||i<numofcolumns-1)||(i==0&&i<numofcolumns-1)){
          cell.setAttribute("contenteditable",true);
        }
        if(i==numofcolumns-1){
      cell.setAttribute("id",(tablelength-1));
      cell.setAttribute("onclick","changeFormat(this)");
      }
    cell.innerHTML = "-"; 
}
}
function addColumn() {
        let table = document.getElementById("myTable");
        let rowCount = table.rows.length;
        numofcolumns++
        for (let i = 0; i < rowCount; i++) {
          let cell = table.rows[i].insertCell(numofcolumns-2);
          if(i == 0){
            assignmentnum++;
            cell.innerHTML = "Assignment" + assignmentnum;
          }
          else{
            cell.innerHTML = "<p class = rowstyle2>-</p>";
            cell.style.backgroundColor = "palegoldenrod";
          }
          if(i>0){
            cell.setAttribute("contenteditable",true);
          }
        }
      }
      /*this function calculates the final grade by simply finding the average of all the assignment values in a row 
      and then it moves onto the next row, this one is also assigned an interval just like the cell refresher, 
      this is to ensure the final grade is always up to date */
function calculateFinalGrade(){
  loop = 1;
  let table = document.getElementById("myTable");
  while(loop < table.rows.length){
  let row = table.rows[loop];
  let total = 0;
  let cell;
  let grade;
  for(let i = 2; i < numofcolumns-1; i++){
    cell = row.cells[i];
    grade = cell.innerHTML;
    if(isNaN(grade)){	
      grade = 0;
    }
    total = total+parseInt(grade);
  }
  cell = row.cells[numofcolumns-1];
  if((cell.innerHTML!=="A")&&(cell.innerHTML!=="B")&&(cell.innerHTML!=="C")&&(cell.innerHTML!=="D")&&(cell.innerHTML!=="F")&&(cell.innerHTML!=="A-")&&(cell.innerHTML!=="B-")&&(cell.innerHTML!=="C-")&&(cell.innerHTML!=="D-")&&(cell.innerHTML!=="B+")&&(cell.innerHTML!=="C+")&&(cell.innerHTML!=="D+")){
    if((cell.innerHTML!=="4.0")&&(cell.innerHTML!=="3.7")&&(cell.innerHTML!=="3.3")&&(cell.innerHTML!=="3.0")&&(cell.innerHTML!=="2.7")&&(cell.innerHTML!=="2.4")&&(cell.innerHTML!=="2.0")&&(cell.innerHTML!=="1.7")&&(cell.innerHTML!=="1.4")&&(cell.innerHTML!=="1.0")&&(cell.innerHTML!=="0.0")){
  cell.innerHTML = Math.floor(total/(assignmentnum));
    }
}
  if((Math.floor(total/(assignmentnum))<60)||(cell.innerHTML=="F")){
    cell.style.backgroundColor = "red";
    cell.style.color = "white";
    cell.setAttribute("class","rowstyle3");
  }
  if((Math.floor(total/(assignmentnum))>=60)||(cell.innerHTML=="A")||(cell.innerHTML=="B")||(cell.innerHTML=="C")||(cell.innerHTML=="D")||(cell.innerHTML=="E")){
    cell.style.backgroundColor = "white";
    cell.style.color = "black";
    cell.setAttribute("class","rowstyle3");
  }  
  loop++
}
}
/* this function refreshes the cells to make sure that they are the correct colour  and that the cell is not allowed contain any value that is not a number between 0 and 100
it does this by running if statements and different checker variables in a while loop so that it covers the whole assignments section of the chart
when the page boots this function is put on an interval*/
function cellrefresher(){
  loop2 = 1;
  let table2 = document.getElementById("myTable");
  while(loop2 < table2.rows.length){
  let row2 = table2.rows[loop2];
  let cell2;
  let grade2;
  for(let i = 2; i < numofcolumns-1; i++){
    cell2 = row2.cells[i];
    grade2 = cell2.innerHTML;
    if((cell2.innerHTML<0)||(cell2.innerHTML>100)){
      cell2.innerHTML = "-";
      cell2.style.backgroundColor = "palegoldenrod";
      cell2.setAttribute("class","rowstyle2");
    }
    if((cell2.innerHTML>=0)&&(cell2.innerHTML<=100)){
      cell2.style.backgroundColor = "white";
      cell2.setAttribute("class","rowstyle3");
    }
    if((cell2.innerHTML=="-")){
      cell2.style.backgroundColor = "palegoldenrod";
      cell2.setAttribute("class","rowstyle2");
    }
    if(isNaN(cell2.innerHTML)){
      cell2.style.backgroundColor = "palegoldenrod";
      cell2.innerHTML = "-";
      cell2.setAttribute("class","rowstyle2");
    }
  }
  loop2++
}
}
/* this trainwreck implements the changing of the format of the final grade by using everyones favourite, if statements
(i am so sorry) but i had issues with switch statements not working*/ 
function changeFormat(primalcell){
  let gradeLetter;
  let grade;
  let table = document.getElementById("myTable");
  let total = 0;
  cellID = primalcell.id;
  let row = table.rows[primalcell.id];
  
    for(let i = 2; i < numofcolumns-1; i++){
    cell = row.cells[i];
    grade = cell.innerHTML;
    if(isNaN(grade)){	grade = 0;}
    total = total+parseInt(grade);
  } 
  cell = row.cells[numofcolumns-1];
 grade = Math.floor(total/(assignmentnum));
 if(grade >= 93 && grade <= 100 && cell.innerHTML=="A")
    {gradeLetter = "4.0"; cell.innerHTML = gradeLetter; isgpa = true}
    else if(grade >=90  && grade <= 92 && cell.innerHTML=="A-")
    {gradeLetter = "3.7"; cell.innerHTML = gradeLetter; isgpa = true}
    else if(grade >= 87 && grade <= 89 && cell.innerHTML=="B+")
      {gradeLetter = "3.3"; cell.innerHTML = gradeLetter; isgpa = true}     
    else if(grade >= 83 && grade <= 86 && cell.innerHTML=="B")
      {gradeLetter = "3.0"; cell.innerHTML = gradeLetter; isgpa = true}    
    else if(grade >= 80 && grade <= 82 && cell.innerHTML=="B-")
      {gradeLetter = "2.7"; cell.innerHTML = gradeLetter; isgpa = true}
    else if(grade >=77 && grade<=79 && cell.innerHTML=="C+")
     { gradeLetter = "2.3"; cell.innerHTML = gradeLetter; isgpa = true}
    else if(grade >= 73 && grade <= 76 && cell.innerHTML=="C")
    {gradeLetter = "2.0"; cell.innerHTML = gradeLetter; isgpa = true}
     else if(grade >= 70 && grade <= 72 && cell.innerHTML=="C-")
    {gradeLetter = "1.7"; cell.innerHTML = gradeLetter; isgpa = true}
    else if(grade >= 67 && grade <= 69 && cell.innerHTML=="D+")
      {gradeLetter = "1.3"; cell.innerHTML = gradeLetter; isgpa = true}     
    else if(grade >= 63 && grade <= 66 && cell.innerHTML=="D")
      {gradeLetter = "1.0"; cell.innerHTML = gradeLetter; isgpa = true}    
    else if(grade >= 60 && grade <= 62 && cell.innerHTML=="D-")
      {gradeLetter = "0.7"; cell.innerHTML = gradeLetter; isgpa = true}
    else if(grade<60 && cell.innerHTML=="F")
     { gradeLetter = "0.0"; cell.innerHTML = gradeLetter; isgpa = true}

    else if(grade >= 93 && grade <= 100)
    {gradeLetter = "A"; cell.innerHTML = gradeLetter;}
    else if(grade >=90  && grade <= 92)
    {gradeLetter = "A-"; cell.innerHTML = gradeLetter;}
    else if(grade >= 87 && grade <= 89)
      {gradeLetter = "B+"; cell.innerHTML = gradeLetter;}     
    else if(grade >= 83 && grade <= 86)
      {gradeLetter = "B"; cell.innerHTML = gradeLetter;}    
    else if(grade >= 80 && grade <= 82)
      {gradeLetter = "B-"; cell.innerHTML = gradeLetter;}
    else if(grade >=77 && grade<=79)
     { gradeLetter = "C+"; cell.innerHTML = gradeLetter;}
    else if(grade >= 73 && grade <= 76)
    {gradeLetter = "C"; cell.innerHTML = gradeLetter;}
     else if(grade >= 70 && grade <= 72)
    {gradeLetter = "C-"; cell.innerHTML = gradeLetter;}
    else if(grade >= 67 && grade <= 69)
      {gradeLetter = "D+"; cell.innerHTML = gradeLetter;}     
    else if(grade >= 63 && grade <= 66)
      {gradeLetter = "D"; cell.innerHTML = gradeLetter;}    
    else if(grade >= 60 && grade <= 62)
      {gradeLetter = "D-"; cell.innerHTML = gradeLetter;}
    else if(grade<60)
     { gradeLetter = "F"; cell.innerHTML = gradeLetter;}
     else if(grade >= 93 && grade <= 100 && cell.innerHTML=="4.0")
     {cell.innerHTMl=grade; isgpa = false;}
     else if(grade >=90  && grade <= 92 && cell.innerHTML=="3.7")
     {cell.innerHTMl=grade; isgpa = false;}
     else if(grade >= 87 && grade <= 89 && cell.innerHTML=="3.3")
       {cell.innerHTMl=grade; isgpa = false;}     
     else if(grade >= 83 && grade <= 86 && cell.innerHTML=="3.0")
       {cell.innerHTMl=grade; isgpa = false;}    
     else if(grade >= 80 && grade <= 82 && cell.innerHTML=="2.7")
       {cell.innerHTMl=grade; isgpa = false;}
     else if(grade >=77 && grade<=79 && cell.innerHTML=="2.3")
      {cell.innerHTMl=grade; isgpa = false;}
     else if(grade >= 73 && grade <= 76 && cell.innerHTML=="2.0")
     {cell.innerHTMl=grade; isgpa = false;}
      else if(grade >= 70 && grade <= 72 && cell.innerHTML=="1.7")
     {cell.innerHTMl=grade; isgpa = false;}
     else if(grade >= 67 && grade <= 69 && cell.innerHTML=="1.3")
       {cell.innerHTMl=grade; isgpa = false;}     
     else if(grade >= 63 && grade <= 66 && cell.innerHTML==" 1.0")
       {cell.innerHTMl=grade; isgpa = false;}    
     else if(grade >= 60 && grade <= 62 && cell.innerHTML=="0.7")
       {cell.innerHTMl=grade; isgpa = false;}
     else if(grade<60 && cell.innerHTML=="0.0")
      {cell.innerHTMl=grade; isgpa = false;} 

}
/*function to calculate the the amount of unfinished assignments and then display it at the bottom of the table.
its done by scanning every cell for the default character - which signifies that the assignment is ungraded and then adds 1 to the final total 
whenever there is a - in the cell 
this is also ran on an interval to make sure the incomplete assignemts is up to date*/
function unfinishedAssignments(){
  let loop3 = 0;
  let unfinished = 0;
   let table3 = document.getElementById("myTable");
  while(loop3 < table3.rows.length){
  let row3 = table3.rows[loop3];
  let cell3;
  for(let i = 2; i < numofcolumns-1; i++){
    cell3 = row3.cells[i];
    grade3 = cell3.innerHTML;
    if((cell3.innerHTML=="-")){
      unfinished++
    }
  }
  loop3++;
  }
  document.getElementById("ass").innerHTML =("Unfinished Assignments:"+unfinished);

}