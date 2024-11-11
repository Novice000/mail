document.addEventListener('DOMContentLoaded', function() {
  // Toggle views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click',()=>{ compose_email(false)});

  // Load inbox by default
  load_mailbox('inbox');

  // Submit handler for compose form
  const composeForm = document.querySelector("#compose-form");
  composeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let recipients = document.querySelector("#compose-recipients").value;
    let subject = document.querySelector("#compose-subject").value;
    let body = document.querySelector("#compose-body").value;

    if (!recipients || !subject || !body) {
      alert("All fields must be filled out!");
      return;
    }

    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({ recipients, subject, body })
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      load_mailbox("sent");
    })
    .catch(error => console.log(error));
  });
});

function compose_email(reply, data = null) {
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  if(!reply){
    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';
  }
  else{
    document.querySelector('#compose-recipients').value = data.sender;
    if (!data.subject.slice(0,4) === "Re: "){
      document.querySelector('#compose-subject').value = `Re: ${data.subject}`;
    }
    else{
      document.querySelector('#compose-subject').value = data.subject;
    }
    document.querySelector('#compose-body').value = `"On ${data.timestamp} ${data.sender} wrote: ${data.body}"\n`;
  }

}

function load_mailbox(mailbox) {
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  
  const emailsView = document.querySelector("#emails-view");
  emailsView.innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(data => data.forEach(element => make_emailview(mailbox, element)));
}

function load_email(mailbox, data) {
  if (!data.read) {
    fetch(`/emails/${data.id}`, {
      method: "PUT",
      body: JSON.stringify({ read: true })
    });
  }

  const emailsView = document.querySelector("#emails-view");
  emailsView.innerHTML = '';  // Clear view for email display

  // Create email header
  const header = document.createElement("div");
  header.id = "header"
  const from = document.createElement("p");
  const to = document.createElement("p");
  const subject = document.createElement("p");
  const timestamp = document.createElement("p");
  const buttons = document.createElement("div");
  const replyButton = document.createElement("button");

  from.innerHTML = `<b>From</b>: ${data.sender}`;
  to.innerHTML = `<b>To</b>: ${data.recipients.join(", ")}`;
  subject.innerHTML = `<b>Subject</b>: ${data.subject}`;
  timestamp.innerHTML = `<b>Timestamp</b>: ${data.timestamp}`;
  replyButton.innerText = "Reply";
  replyButton.addEventListener("click",(event)=>{
    event.stopPropagation()
    compose_email(true, data)
  })
  buttons.appendChild(replyButton);

  if (mailbox === "inbox" || mailbox === "archive") {
    const archiveButton = document.createElement("button");
    archiveButton.innerText = data.archived ? "Unarchive" : "Archive";
    archiveButton.addEventListener("click", () => archiving(data.id, !data.archived, mailbox));
    buttons.appendChild(archiveButton);
  }

  header.append(from, to, subject, timestamp, buttons);
  emailsView.appendChild(header);

  // Email body
  const body = document.createElement("div");
  body.innerHTML = data.body;
  emailsView.append(document.createElement("hr"), body);
}

function make_emailview(mailbox, element) {
  const mainDiv = document.createElement("div");
  mainDiv.id = element.id;
  mainDiv.classList.add("email-item");
  mainDiv.style.backgroundColor = element.read ? "red" : "white";

  const email = document.createElement("div");
  if(mailbox === "inbox" || mailbox === "archived"){
    email.innerText = element.sender
  }else{
    email.innerText = element.recipients.join(", ");
  }
  const subject = document.createElement("div");
  subject.innerText = element.subject;
  const timestamp = document.createElement("div");
  timestamp.innerText = element.timestamp;

  mainDiv.append(email, subject, timestamp);

  if (mailbox === "inbox" || mailbox === "archive") {
    const archiveButton = document.createElement("button");
    archiveButton.innerHTML = element.archived ? "Unarchive" : "Archive";
    archiveButton.addEventListener("click", (event) => {
      event.stopPropagation();
      archiving(element.id, !element.archived, mailbox);
    });
    mainDiv.appendChild(archiveButton);
  }

  mainDiv.addEventListener("click", () => {
    document.querySelector("#emails-view").innerHTML = "";
    fetch(`/emails/${element.id}`)
      .then(response => response.json())
      .then(data => load_email(mailbox, data));
  });

  document.querySelector("#emails-view").appendChild(mainDiv);
}

function archiving(id, archiveStatus, mailbox) {
  fetch(`/emails/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ archived: archiveStatus })
  })
  .then(() => load_mailbox(mailbox));
}