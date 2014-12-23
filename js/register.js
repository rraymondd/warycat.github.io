
var thisYear = moment().year();

for(var i=18;i<=70;i++){
    var year = thisYear - i;
    $('#yyyy > select').append($('<option value='+ year +'>'+ year +'</option>'));
}

function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

$('#yyyy > select').change(function(){
    $('#mm > select option:not(:first)').remove();
    $('#dd > select option:not(:first)').remove();
    for(var j=1;j<=12;j++){
        var month = pad(j,2);
        $('#mm > select').append($('<option value='+ month +'>'+ month +'</option>'));
    }
});

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

$('#mm > select').change(function(){
    $('#dd > select option:not(:first)').remove();
    var year = $('#yyyy > select').val();
    var month = $('#mm > select').val();
    var days = daysInMonth(month,year);
    for(var i=1;i<=days;i++){
        var day = pad(i,2);
        $('#dd > select').append($('<option value='+ day +'>'+ day +'</option>'));
    }
});

$.get('/data/states.json',function(states){
    _.each(states,function(state){
        $('#state > select').append($('<option value='+ state.abbreviation +'>'+ state.name +'</option>'));
    });
});

function validateSubmerchant(dict){
    var results = {};
    _.each(dict,function(value,key){
        results[key] = {};
        results[key].isRequired = !validator.isNull(value);
    })
    results.email.isEmail = validator.isNull(dict.email) || validator.isEmail(dict.email);
    results.phone.isNumeric = validator.isNull(dict.phone) || validator.isNumeric(dict.phone);
    results.phone.isLength_10 = validator.isNull(dict.phone) || validator.isLength(dict.phone,10);
    results.phone.is_10_digits = results.phone.isNumeric && results.phone.isLength_10;
    results.ssn.isNumeric = validator.isNull(dict.ssn) || validator.isNumeric(dict.ssn);
    results.ssn.isLength_9 = validator.isNull(dict.ssn) || validator.isLength(dict.ssn,9);
    results.ssn.is_9_digits = results.ssn.isNumeric && results.ssn.isLength_9;
    results.zip.isNumeric = validator.isNull(dict.zip) || validator.isNumeric(dict.zip);
    results.zip.isLength_5 = validator.isNull(dict.zip) || validator.isLength(dict.zip,5);
    results.zip.is_5_digits = results.zip.isNumeric || results.zip.isLength_5;
    return results;
}

function displayResults(results){
    var complete = true;
    $.each(results,function(result,error){
        $.each(error,function(key,value){
            var id = '#' + result + ' > div[name|='+key+']';
            $(id).css('display',(value?'none':'block'));
            complete &= value;
        });
    });
    if(complete){
        window.alert('ok');
    }else{
        window.alert('error');
    }
}

$('#submit').click(function(){
    var firstname = $('#firstname > input').val();
    var lastname = $('#lastname > input').val();
    var yyyy = $('#yyyy > select').val();
    var mm = $('#mm > select').val();
    var dd = $('#dd > select').val();
    var email = $('#email > input').val();
    var phone = $('#phone > input').val();
    var ssn = $('#ssn > input').val();
    var street = $('#street > input').val();
    var city = $('#city > input').val();
    var state = $('#state > select').val();
    var zip = $('#zip > input').val();

    var submerchant = {
        firstname:firstname,
        lastname:lastname,
        yyyy:yyyy,
        mm:mm,
        dd:dd,
        email:email,
        phone:phone,
        ssn:ssn,
        street:street,
        city:city,
        state:state,
        zip:zip,
    };
    console.log(JSON.stringify(submerchant,null,' '));
    var results = validateSubmerchant(submerchant);
    console.log(JSON.stringify(results,null,' '));
    displayResults(results);
})