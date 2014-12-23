
var thisYear = moment().year();

for(var i=18;i<=70;i++){
    var year = thisYear - i;
    $('#yyyy').append($('<option value='+ year +'>'+ year +'</option>'));
}

function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}


for(var j=1;j<=12;j++){
    var month = pad(j,2);
    console.log(month);
    $('#mm').append($('<option value='+ month +'>'+ month +'</option>'));
}
