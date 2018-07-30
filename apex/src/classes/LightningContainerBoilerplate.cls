global with sharing class LightningContainerBoilerplate {

    @RemoteAction
    global static String createNewContact(String name) {
        Contact c = new Contact(LastName=name);
        insert c;
        return 'Contact inserted successfully. Contact id:- ' + c.Id;
    }
}