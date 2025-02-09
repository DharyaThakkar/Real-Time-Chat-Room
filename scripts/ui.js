//this is responsible for all the ui's

//functionalities :-
//1. render the chat templates to the DOM
//2. clear the list of chats (when the room changes)

class ChatUI {
    constructor(list) {
        this.list = list;
    }
    clear() {
        this.list.innerHTML = '';
    }
    render(data) {//it's going to be called for each new chat we get.
        const when = dateFns.distanceInWordsToNow(//it gives us some relative time format in words between when the message was created and now.
            data.created_at.toDate(),
            { addSuffix: true}
        )
        const html = `
            <li class="list-group-item">
                <span class="username">${data.username}</span>
                <span class="message">${data.message}</span>
                <div class="time">${when}</div>
            </li>
        `;
        this.list.innerHTML += html;
    }
}
