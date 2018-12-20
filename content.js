var regXcommaplus;
var regXjunk;
var regXendDot;
var skillscontainer;
var skillsElements;
var skillArr;
var sudoSkillArr;
var urlhref;
var urlPath;
var fullname;
var cleanFullName;
var firstName;
var lastName;
var workItemsContainer;
var jobTitle;
var jobCompany;
var jobTime;
var startDate;
var endDate;
var webappUrl;
var output;

document.body.style.backgroundColor = "red";

// @TODO add autoscroll to load all elements.
// @TODO add function that grabs any emails listed on the page.  i.e., for the rare person who actually puts
// their email in their bio box.

function group(e, n){
	if(e != null){
		return e[n].toString();
	}else{
		return ""; //an empty string
	}
}

function elmHasData(elm, n){
	if(elm.length > 0){
		return elm[n].innerText;
	}else{
		return "";
	}

}

function getName(type, fullname){
  function cleanName(fullname){
    regXcommaplus = new RegExp(",.+");
    regXjunk  = new RegExp('\\(|\\)|"|\\s*\\b[jJ][rR]\\b.*|\\s*\\b[sS][rR]\\b.*|\\s*\\bIi\\b.*|\\s*\\bI[Ii][Ii]\\b.*|\\s*\\bI[Vv]\\b.*|\\s+$', "g");
    regXendDot = new RegExp("\\.$");
    return fullname.replace(regXcommaplus, "").replace(regXjunk, "").replace(regXendDot, "");
  }
  function fixCase(fullname){
    return fullname.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  function getFirstName(fullname){
  	return /^\w+\.\s+\w+(?=\s)|^\S+(?=\s)/.exec(cleanName(fullname)).toString();
  }
  function getLastName(fullname){
  	return /\w*'\w*$|\w*-\w*$|\w+$/.exec(cleanName(fullname)).toString();
  }
  if(type == "first"){
    return getFirstName(cleanName(fixCase(fullname)));
  }
  if(type == "last"){
    return getLastName(cleanName(fixCase(fullname)));
  }
}

function skillSudoArr(){
skillscontainer = document.getElementsByClassName("pv-profile-section pv-skill-categories-section")[0].getElementsByTagName("ol");

skillsElements = skillscontainer[0].getElementsByClassName("pv-skill-category-entity__name pv-skill-category-entity__name--has-action");

skillArr = [];

for(let s=0; s<skillsElements.length; s++){ //s++ is the same as s = s+1
	let skillItem= skillsElements[s].innerText; //the [s] is a number. it changes by +1 for eachiteration .
	skillArr.push(skillItem);

}

sudoSkillArr = '["'+skillArr.toString().replace(/\b,\b/g, '","')+'"]';

return "&sklz="+sudoSkillArr;
}

try {
window.scrollTo(0, document.body.scrollHeight);
setTimeout(function(){widnow.scrollTo(0, document.body.scrollHeight)}, 100);

urlhref = window.location.href;
urlPath = "&path="+group(/\/in\/(.+?)\/$/.exec(urlhref), 1);
fullname = document.getElementsByClassName("pv-top-card-section__name")[0].innerText;
cleanFullName = fullname.replace(/\W*\b[A-Z]{2,5}\b.+?$|,.+$/g, "").trim();
firstName = "fn=" + getName("first", fullname);
lastName = "&ln=" + getName("last", fullname);
workItemsContainer = document.getElementsByClassName("pv-profile-section__section-info section-info pv-profile-section__section-info--has-more")[0].getElementsByTagName("li");
// @TODO if these elements don"t exist - add blank strings.

// Make this not break
function getJobAndCompany(){

    if (workItemsContainer[0].getElementsByTagName("h3")[0]) {
		jobTitle = "&title=" + workItemsContainer[0].getElementsByTagName("h3")[0].innerText;
	} else {
		jobTitle = "&title=''";
    }
	if (workItemsContainer[0].getElementsByTagName("h4")[0]) {
		jobCompany = "&co=" + workItemsContainer[0].getElementsByTagName("h4")[0].getElementsByTagName("span")[1].innerText;
	} else {
		jobCompany = "&co=''";
	}
}


getJobAndCompany();
jobTime = workItemsContainer[0].getElementsByClassName("pv-entity__date-range")[0].getElementsByTagName("span")[1].innerText;

startDate = "&stime=" + group(/^(.+?\d+)/.exec(jobTime), 1);
endDate = "&etime=" + group(/–\s*(.+?)$/.exec(jobTime), 1);
webappUrl = "https://script.google.com/macros/s/AKfycbz1NGbcab4A7ir7QcwQLJNl-KQyQlIg-mYZHmqXfh0EH0ST2VGO/exec";

output = webappUrl+"?"+firstName+lastName+jobTitle+jobCompany+startDate+endDate+skillSudoArr()+urlPath;
// send the URL to the background script
chrome.runtime.sendMessage({ message: output });
} catch(err) {
    console.log(err);
}

setTimeout(function(){window.scrollTo(0, 0)}, 500);
setTimeout(function(){document.body.style.backgroundColor = "white";}, 500);

// @TODO better organize this code
