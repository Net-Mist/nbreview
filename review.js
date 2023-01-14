// 3 types of cells:
// - changed : css jp-Diff-twoway
// - add  : jp-Diff-added
// - removed : jp-diff-deleted
const TYPES = ["twoway", "added", "deleted"]
const MODAL_ID = "messageModal"
const TEXTAREA_ID = "textarea"

let current_message_id = "";

let messages = [];

jp_diff = document.querySelector(".jp-Notebook-diff");

// add edit button
for (let type of TYPES) {
  jp_diff.querySelectorAll(".jp-Diff-"+type+" .CodeMirror-code .CodeMirror-linenumber").forEach((e, i) => {
    newNode = document.createElement("button");
    newNode.setAttribute("id", type + "-" + i);
    newNode.addEventListener("click", () => {
      show_modal(type + "-" + i);
    });
    newNode.appendChild(document.createTextNode("✎"));
    e.parentNode.insertBefore(newNode, e);
  });
}

function show_modal(id) {
  console.log(id);
  current_message_id = id;
  modal = document.getElementById(MODAL_ID);
  document.getElementById(TEXTAREA_ID).value = ""
  
  modal.style.display = "block";
}

function update_button() {
  button = document.getElementById(current_message_id);
  button.textContent = "✅";
}

function create_modal() {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.setAttribute("id", MODAL_ID)
    modal.style = `
        display: none; /* Masquer par défaut */
        position: fixed; /* Fixer en position absolue */
        z-index: 1; /* Placer au-dessus de tous les autres éléments */
        padding-top: 100px;
        padding-left: 40%;
        left: 0;
        top: 0;
        width: 100%; /* Prendre toute la largeur */
        height: 100%; /* Prendre toute la hauteur */
        overflow: auto; /* Activer la barre de défilement si le contenu dépasse */
        background-color: rgba(0,0,0,0.6); /* Fond sombre avec transparence */
    `

    const content = document.createElement("div");
    content.style = `
      width: 200px;
      `;
      
      const textarea = document.createElement("textarea");
      textarea.setAttribute("id", TEXTAREA_ID);
      textarea.style = `
      width: 500px;
      height: 300px;
    `;

    const cancelBtn = document.createElement("button");
    cancelBtn.innerText = "Cancel";
    cancelBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    const submitBtn = document.createElement("button");
    submitBtn.innerText = "Submit";
    submitBtn.addEventListener("click", function() {
        const text = textarea.value;
        console.log(text);
        update_button();
        messages.push(
          {
            "id": current_message_id,
            "text": text
          }
        )
        modal.style.display = "none";
    });

    content.appendChild(textarea);
    content.appendChild(cancelBtn);
    content.appendChild(submitBtn);
    modal.appendChild(content)
    document.body.appendChild(modal);
}
create_modal()
