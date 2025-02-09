//responsible for getting the chats and data together

//functionalites to add in this script file :->

//1. able to add new chat documents into the database.
//2. setting up a real time listener to get the new chats.
//3. updating the username.
//4. updating the room.

//This class is responsible for managing all the chat room data.
class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats'); 
        this.unsub;
    }
    async addChat(message) {
        //format a chat object
        const now = new Date();
        const chat = {
            message,//as both key and value name is same so we can use this ES6 property.
            username:this.username,
            room:this.room,
            created_at:firebase.firestore.Timestamp.fromDate(now)
        };
        //save the chat document into the database.
        const response = await this.chats.add(chat);
        return response;
    }
    //setting-up the real time listener, which is gonna return a response everytime there's a change in the database collection.
    getChats(callback) {
        this.unsub = this.chats
            .where('room', '==', this.room) //complex queries to get the data only for the specified room/channel and not for all the other room.channel.we use '==' in firebase.
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                       if(change.type === 'added') {
                             //update UI
                             callback(change.doc.data());//we are calling this callback function for each single change.
                       } 
                }); 
            });
    }
    updateName(username) {
        this.username = username;
        localStorage.setItem('username',username);//storing the name in the local storage.
    }

    updateRoom(room) {
        this.room = room;
        console.log('room updated');
        if(this.unsub) {
            this.unsub();//unsubscribing from the previous room.
        }   
    }
}





//when we get the data from the firestore it dosen't automatically order that data in any kind of way.
//it does not order it alphabatically , it dosen't order it by created_at date etc.
//what we want to do is when we are displaying data, we want to order them in time or date order basically.