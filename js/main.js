// declaration variables
var webName=document.getElementById("webName");
var webUrl=document.getElementById("webUrl");
var mybody=document.getElementById("mybody");

var bookMarkList;



var siteName = document.getElementById("webName");
var siteURL = document.getElementById("webUrl");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("mybody");
var deleteBtns;
var visitBtns;
var bookmarks = [];


// &&&&&&&&&&&&& get data from local store

if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  for (var i = 0; i < bookmarks.length; i++) {
    displayBookmark(i);
  }
}

//^add bookmark
function displayBookmark(index) {
  var userURL = bookmarks[index].siteURL;
  var protocolRegex = /^https?:\/\//g;
  if (protocolRegex.test(userURL)) {
    validURL = userURL;
    fixedURL = validURL
      .split("")
      .splice(validURL.match(protocolRegex)[0].length)
      .join("");
  } else {
    var fixedURL = userURL;
    validURL = `https://${userURL}`;
  }
  var newBookmark = `
              <tr>
                <td>${index + 1}</td>
                <td>${bookmarks[index].siteName}</td>              
                <td>
                  <button class="btn btn-visit" data-index="${index}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-delete pe-2" data-index="${index}">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `;
  tableContent.innerHTML += newBookmark;

  deleteBtns = document.querySelectorAll(".btn-delete");
  if (deleteBtns) {
    for (var j = 0; j < deleteBtns.length; j++) {
      deleteBtns[j].addEventListener("click", function (e) {
        deleteBookmark(e);
      });
    }
  }

  visitBtns = document.querySelectorAll(".btn-visit");
  if (visitBtns) {
    for (var l = 0; l < visitBtns.length; l++) {
      visitBtns[l].addEventListener("click", function (e) {
        visitWeb(e);
      });
    }
  }
}
// &&&&&clear 
function clearInput() {
  siteName.value = "";
  siteURL.value = "";
}

// function DeleteBookMark(index)
// {
//   bookMarkList.splice(index,1);
// AddLocalStorage();
// displayBookMark(bookMarkList);

// }
// =====> Delete Function

function deleteBookmark(e) {
  tableContent.innerHTML = "";
  var deletedIndex = e.target.dataset.index;
  bookmarks.splice(deletedIndex, 1);
  for (var k = 0; k < bookmarks.length; k++) {
    displayBookmark(k);
  }
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}

//*****************save in loacalstrorage */
function AddLocalStorage()
{
  localStorage.setItem("bookMarkList",JSON.stringify(bookMarkList))
}
//$$$$$$$$$$$submite new bookmark$$$$$$$$$$$$$4
submitBtn.addEventListener("click", function () {
  if (
    siteName.classList.contains("is-valid") &&
    siteURL.classList.contains("is-valid")
  ) {
    var bookmark = {
      siteName:siteName.value,
      siteURL: siteURL.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayBookmark(bookmarks.length - 1);
    clearInput();
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
  } 
});
//&&&&&&&&&visit &&&&&&&&&&&
function visitWeb(e) {
  var webIndex = e.target.dataset.index;
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(bookmarks[webIndex].siteURL)) {
    open(bookmarks[webIndex].siteURL);
  } else {
    open(`https://${bookmarks[webIndex].siteURL}`);
  }
}

// !!!!!!!!validation!!!!!!!!!!!
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteName.addEventListener("input", function () {
  validate(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
  validate(siteURL, urlRegex);
});

function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}