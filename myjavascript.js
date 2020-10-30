'use strict'
// localStorage.clear();
let comments = [];


loadComments();

document.getElementById('comment-add').onclick = function(){
    let commentName = document.getElementById('comment-name');
    let commentBody = document.getElementById('comment-body');
    let commentValidName = commentName.value.match(/^([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}|[А-ЯA-Z][\x27а-яa-z]{1,}\-([А-ЯA-Z][\x27а-яa-z]{1,}|(оглы)|(кызы)))\040[А-ЯA-Z][\x27а-яa-z]{1,}(\040[А-ЯA-Z][\x27а-яa-z]{1,})?$/g);
    let commentValidBody = commentBody.value
    .replace(/[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi, `<a href="$&">$&</a>`)
    .replace(/<([^>]+)>/gi, "")
    let comment = {
        name : commentValidName,
        body : commentValidBody,
        time : Math.floor(Date.now() / 1000)
    }


    commentName.value = '';
    commentBody.value = '';
    if (comment.name === null || comment.body === null){
       location.reload();    
    }
    else {comments.push(comment);}
    
    saveComments();
    showComments();
    
}

function saveComments(){
    localStorage.setItem('comments', JSON.stringify(comments));
    
}

function loadComments(){
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}

function showComments (){
    let commentField = document.getElementById('comment-field');
    let out = '';
    comments.forEach(function(item){
        out += `<p class="text-right small"><em>${timeConverter(item.time)}</em></p>`;
        out += `<p class="alert alert-primary" role="alert">${item.name}</p>` ;
        out += `<p class="alert alert-success" role="alert">${item.body}</p>` + `<button id="deleteComment"class="btn btn-primary">Delete</button>` + `<button class="btn btn-warning pull-right edit-event">
        <i class="material-icons" title="Редактировать">edit</i>
      </button>`;
    });
    commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }