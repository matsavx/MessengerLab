document.querySelector('#send').onclick = send;
document.querySelector('#delete').onclick = clear;
document.getElementsByName('radio')[0].onchange = show;
document.getElementsByName('radio')[1].onchange = show;
document.getElementsByName('radio')[2].onchange = show;

let history1 = "";
let history2 = "";
let history3 = "";

document.getElementsByName('message-text')[0].addEventListener('keyup', function(data) {
    if (data.key === 'Enter') {
        send();
    }
})

function send() {
    let message = document.querySelector('#content');
    let link = document.createElement('div');
    link.innerHTML = document.querySelector('#message-text').value;
    document.getElementById('message-text').focus();
    let flag = false;
    for (let i = 0; i < link.innerHTML.length; i++) {
        if (link.innerHTML[i] !== ' ') flag = true;
    }

    if (link.innerHTML !== '' && flag) {
        if (document.getElementsByName('radio')[0].checked) {
            history1 += document.querySelector('#message-text').value + " -";
            localStorage.setItem('Tanya', history1);
        }
        else if (document.getElementsByName('radio')[1].checked) {
            history2 += document.querySelector('#message-text').value + " -";
            localStorage.setItem('Slava', history2);
        }
        else if(document.getElementsByName('radio')[2].checked) {
            history3 += document.querySelector('#message-text').value + " -";
            localStorage.setItem('Misha', history3);
        }
        message.appendChild(link);
        message.scrollTop = message.scrollHeight;
        document.querySelector('#message-text').value = "";
    }
}

function sendMessage(sm) {
    let message = document.querySelector('#content');
    let link = document.createElement('div');
    link.innerHTML = sm;
    message.appendChild(link);
    document.querySelector('#message-text').value = "";
}

function messageCount(historyCount) {
    let count = 0;
    for (let i = 0; i < historyCount.length; i++) {
        if (historyCount[i] === '-') count++;
    }
    return count;
}

function clear() {
    while (document.querySelector('#content').hasChildNodes()) {
        let content = document.querySelector('#content').lastChild;
        content.parentNode.removeChild(content);
    }
    if (document.getElementsByName('radio')[0].checked) {
        history1 = "";
        localStorage.removeItem('Tanya');
    }
    else if (document.getElementsByName('radio')[1].checked) {
        history1 = "";
        localStorage.removeItem('Slava');
    }
    else if (document.getElementsByName('radio')[2].checked) {
        history1 = "";
        localStorage.removeItem('Misha');
    }
}

function clearMess() {
    while (document.querySelector('#content').hasChildNodes()) {
        let content = document.querySelector('#content').lastChild;
        content.parentNode.removeChild(content);
    }
}

function show() {
    clearMess();
    document.getElementById('message-text').focus();
    if (document.getElementsByName('radio')[0].checked && localStorage.getItem('Tanya') !== null) {
        let ptr = localStorage.getItem('Tanya');
        let omg = messageCount(ptr);
        for (let i = 0; i < omg; i++) {
            sendMessage(ptr.slice(0, ptr.indexOf('-')));
            ptr = ptr.slice(ptr.indexOf('-') + 1, ptr.length);
        }
    }
    else if (document.getElementsByName('radio')[1].checked && localStorage.getItem('Slava') !== null) {
        let ptr = localStorage.getItem('Slava');
        let omg = messageCount(ptr);
        for (let i = 0; i < omg; i++) {
            sendMessage(ptr.slice(0, ptr.indexOf('-')));
            ptr = ptr.slice(ptr.indexOf('-') + 1, ptr.length);
        }
    }
    else if (document.getElementsByName('radio')[2].checked && localStorage.getItem('Misha') !== null) {
        let ptr = localStorage.getItem('Misha');
        let omg = messageCount(ptr);
        for (let i = 0; i < omg; i++) {
            sendMessage(ptr.slice(0, ptr.indexOf('-')));
            ptr = ptr.slice(ptr.indexOf('-') + 1, ptr.length);
        }
    }
    let message = document.querySelector('#content');
    message.scrollTop = message.scrollHeight;
}