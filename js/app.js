var dateOptions = (function(){
	var yyyys = [];
	var i;
	for(i=1950;i<=2000;i++){
		yyyys.push({value:i,text:i});
	}

	var mms = [];
	for(i=1;i<=12;i++){
		mms.push({value:i,text:i});
	}

	var dds = [];
	for(i=1;i<31;i++){
		dds.push({value:i,text:i});
	}

	return {
		yyyys:yyyys,
		mms:mms,
		dds:dds
	};

})();


