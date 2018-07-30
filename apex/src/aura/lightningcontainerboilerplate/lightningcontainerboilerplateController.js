({
	handleMessage : function(component, message, helper) {
        var payload = message.getParams().payload;
        var name = payload.name;
        if(name==="MyMessage") {
            component.set("v.myMessage", payload.value);
        }
	},
    
    handleError: function(component, error, helper) {
        var description = error.getParams().description;
        console.log(description);
    },
    sendMessage: function(component, event, helper) {
        var inputMessage = component.find('inputMessage').get('v.value');
        component.find('jsContainer').message(inputMessage);            
    }
})