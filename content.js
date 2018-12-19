document.body.style.backgroundColor = "red";
// Insert script to Scroll down to load the entire profile.?
// window.scrollBy(0, 1000);



function group(e, n){
	if(e != null){
		return e[n].toString();
	}else{
		return ''; //an empty string
	}
}

function elmHasData(elm, n){
	if(elm.length > 0){
		return elm[n].innerText;
	}else{
		return '';
	}

}

function getName(type, fullname){
  function cleanName(fullname){
    var regXcommaplus = new RegExp(",.+");
    var regXjunk  = new RegExp('\\(|\\)|"|\\s*\\b[jJ][rR]\\b.*|\\s*\\b[sS][rR]\\b.*|\\s*\\bIi\\b.*|\\s*\\bI[Ii][Ii]\\b.*|\\s*\\bI[Vv]\\b.*|\\s+$', 'g');
    var regXendDot = new RegExp("\\.$");
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
var skillscontainer = document.getElementsByClassName("pv-profile-section pv-skill-categories-section")[0].getElementsByTagName("ol");

var skillsElements = skillscontainer[0].getElementsByClassName("pv-skill-category-entity__name pv-skill-category-entity__name--has-action");

var skillArr = [];

for(s=0; s<skillsElements.length; s++){ //s++ is the same as s = s+1
	var skillItem= skillsElements[s].innerText; //the [s] is a number. it changes by +1 for eachiteration .	
	skillArr.push(skillItem);

}

var sudoSkillArr = '["'+skillArr.toString().replace(/\b,\b/g, '","')+'"]';

return '&sklz='+sudoSkillArr;
}

try {
var urlhref = window.location.href;
var urlPath = '&path='+group(/\/in\/(.+?)\/$/.exec(urlhref), 1);

var fullname = document.getElementsByClassName("pv-top-card-section__name")[0].innerText;

var cleanFullName = fullname.replace(/\W*\b[A-Z]{2,5}\b.+?$|,.+$/g, '').trim(); 
    
var firstName = 'fn=' + getName('first', fullname);
var lastName = '&ln=' + getName('last', fullname);

try {
var workItemsContainer = document.getElementsByClassName("pv-profile-section__section-info section-info pv-profile-section__section-info--has-more")[0].getElementsByTagName("li");
}
catch {
var workItemsContainer = "";
}

var jobTitle = '&title=' + workItemsContainer[0].getElementsByTagName("h3")[0].innerText;
var jobCompany = '&co=' + workItemsContainer[0].getElementsByTagName("h4")[0].getElementsByTagName("span")[1].innerText;
var jobTime = workItemsContainer[0].getElementsByClassName("pv-entity__date-range")[0].getElementsByTagName("span")[1].innerText;

var startDate = '&stime=' + group(/^(.+?\d+)/.exec(jobTime), 1);
var endDate = '&etime=' + group(/–\s*(.+?)$/.exec(jobTime), 1);


var webappUrl = 'https://script.google.com/macros/s/AKfycbz1NGbcab4A7ir7QcwQLJNl-KQyQlIg-mYZHmqXfh0EH0ST2VGO/exec';

var output = webappUrl+'?'+firstName+lastName+jobTitle+jobCompany+startDate+endDate+skillSudoArr()+urlPath;
}
catch (err) {
alert(err);
}
// send the URL to the background script
chrome.runtime.sendMessage({ message: output });

setTimeout(function(){document.body.style.backgroundColor = "white";}, 500);

