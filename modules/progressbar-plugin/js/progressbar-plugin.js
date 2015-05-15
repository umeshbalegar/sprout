$.widget("custom.progressbar",{

	options:{
		value:0
	},

    //Private methods starts with '_'
	_create:function(){
		this.options.value = this._constrain(this.options.value);
		this.element.addClass("progressbar");
		this.refresh();
	},

	_setOption: function(key, value){
		if(key === "value"){
			value = this._constrain(value);
			this._super(key, value);
		}
	},

	_setOptions:function(options){
		this._super(options);
		this.refresh();
	},

	
	_constrain:function(value){

		if(value > 100){
			value = 100;
		}else if (value < 0){
			value = 0;
		}

		return value;
	},

	//public methods
	value: function(value){
		if(value === undefined ){
			return this.options.value;
		}
		this.options.value = this._constrain(value);
		var progress = this.options.value+"%";
		this.element.text(progress);
	},

	refresh:function(){
		var progress = this.options.value +"%";
		this.element.text(progress);
		if(this.options.value === 100){
			this._trigger("complete",null,{value: 100});
		}
	}
	
});