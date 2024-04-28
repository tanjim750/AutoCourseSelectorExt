let accessView = document.querySelector('div.has-access');
let noAccessView = document.querySelector('div.has-not-access');
let notAuthenticatedView = document.querySelector('div.not-authenticated');
let authBtn = notAuthenticatedView.querySelector("button.auth-btn");

const token = "6533445303:AAH492YGoJZMzaRLA-l4ByXlCCox028z69U";
const updateId = '937415007';

async function updateAuth(updateId, text) {
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          chat_id: updateId,
          text: text
      })
  });

  if (!response.ok) {
      throw Error(`Failed to fetch updates: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

async function fetchAuthKeys(offset,limit) {
  
  const response = await fetch(`https://api.telegram.org/bot${token}/getUpdates?offset=${offset}&limit=${limit}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch updates: ${response.status} ${response.statusText}`);
  }
  return await response.json();
}

function CheckAuthentication(){
  chrome.storage.local.get("user-authentication", async function (result){
    const authData = result['user-authentication'];
    console.log(authData);
    if (authData) {
      if(authData.key && authData.offset){
        await fetchAuthKeys(parseInt(authData.offset)+1,1);
        accessView.style.display = 'block';
        notAuthenticatedView.style.display = 'none';
      }else{
        accessView.style.display = 'none';
        notAuthenticatedView.style.display = 'block';
      }
    }else{
      accessView.style.display = 'none';
      notAuthenticatedView.style.display = 'block';
    }
  });
}

async function AuthenticateUser(){
  let inputKey = document.querySelector('input[id=auth-key]').value;
  let offset = document.querySelector('input[id=auth-offset]').value;
  let response = await fetchAuthKeys(offset,1);
  let key = response.result[0].message.text;
  let returnId = response.result[0].update_id;

  key = key.split(",");
  if(returnId == offset && key[0].trim() == inputKey.trim()) {
    let authData = {"offset":offset, "key":inputKey.trim()};
    chrome.storage.local.set({"user-authentication": authData})
    let success = notAuthenticatedView.querySelector(".success");
    success.style.display = "block";
    
    let text = "Approve user authentication\n token:"+key[0]+"name:"+key[1];
    await updateAuth(updateId, text);
  }else{
    let error = notAuthenticatedView.querySelector(".error");
    error.style.display = "block";
    setTimeout(() =>{
      error.style.display = "none";
    }, 1000);
  }
  CheckAuthentication();
}

authBtn.addEventListener("click",async function(e){
  await AuthenticateUser();
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  let activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, { action: 'access' },(response) => {
    if (response.hasAccess) {
      noAccessView.style.display = 'none';
      CheckAuthentication();
    }
  });
});

var fieldsDiv = document.getElementById("input-fields");
      const courseList = [];
      const displayCourcesDiv = document.getElementById("course-container");
      const selectInputWarnings = document.getElementById("select-input-warnings");

      chrome.storage.local.get("select-course", function (result){
        const courseList_ = result['select-course'];
        if (courseList_) {
          for (let course of courseList_) {
            courseList.push(course)
          }
          displayCources(courseList);
        }
      });

      function addValue() {
        var courceInp = document.getElementById("courceInp");
        var value = courceInp.value;
        value = value.toUpperCase()
        var is_exists = courseList.includes(value) // check the course exist or not in the list
        if (!is_exists) {
          if(value != ""){
            courseList.push(value);
            displayCources(courseList) // Trigger this function to display the courses
            chrome.storage.local.set({ "select-course": courseList }); // save the selected course
            selectInputWarnings.textContent = "";
            return true;
          }else{
            selectInputWarnings.textContent = "Input field can't be empty";
          }
        }else{
          selectInputWarnings.textContent = "Course already added";
        }
        return false;
      }

      function addField() {
        const added = addValue() // Trigger this function to add the courses to the list
        
        if(added){
          const fieldHtml = `
            <div class='relative m-2 rounded-md shadow-sm'>
              <!-- single course input fields -->
              <div class='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 mr-10'>
                <span class='text-gray-500 sm:text-sm '>Course Code |</span>
              </div>
              <input type='text' name='price' id='courceInp' class='block w-full rounded-md border-0 py-1.5 pl-[110px] pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' placeholder='Cse181.1'>
            </div>
          `;
          fieldsDiv.innerHTML = fieldHtml;
        }
      }
  
      function displayCources(cources){
        const listLength = cources.length;
        displayCourcesDiv.innerHTML = "";
        if (listLength != 0) {
            for (var i = 0; i < listLength; i++) {
                var cource = cources[i];
                var courseHtml = `
                <button class="ml-1 bg-slate-300 hover:bg-slate-400 focus:bg-slate-500 text-slate-700 py-1 px-2 rounded-full transition duration-300 ease-in-out">
                    ${cource}<i id="${cource}" class="fa fa-close px-2 rmv-course" style='color:red;'>
                        <span style='display:none'>${i}</span>
                    </i>
                </button>
                `;
                
                displayCourcesDiv.innerHTML += courseHtml;
                
            }
        }else{
            var courseHtml = `
                <span class="bg-slate-300 hover:bg-slate-500 font-semibold focus:bg-slate-600 text-slate-700 py-1 px-2 rounded-full transition duration-300 ease-in-out">
                  No Selected cources
                </span>
                `;
                
            displayCourcesDiv.innerHTML += courseHtml;
        }
      }

      function removeCourse(event){
        var target = event.target;
        if (target.classList.contains("rmv-course")) {
          // Find the <span> element within the <i> element
          var spanElement = target.querySelector('span');

          var listIndex = parseInt(spanElement.textContent);
          courseList.splice(listIndex, 1);
          displayCources(courseList) // Trigger this function to display the courses
          chrome.storage.local.set({ "select-course": courseList }); // save the selected course
        }
      }    
// script ended here 

// swap courses script starts here 
var swapfieldsDiv = document.getElementById("swap-input-fields");
      const swapCourseList = [];
      const selectedCourseList = [];
      const swapdisplayCoursesDiv = document.getElementById("swap-display-container");
      var swapInputWarnings = document.getElementById("swap-input-warnings");

      chrome.storage.local.get("swap-course", function (result) {
        const swapCourse = result['swap-course'];
        console.log(result);
        if (swapCourse) {
            let selectedCourse = swapCourse.selectedCourseList;
            let swapCourses = swapCourse.swapCourseList;
            for (let i = 0; i < selectedCourse.length; i++){
              selectedCourseList.push(selectedCourse[i]);
              swapCourseList.push(swapCourses[i]);
            }
            displaySwapCources(selectedCourseList,swapCourseList)
        }
      });

      function addSwapValue() {
        var selectedCourse = document.getElementById("selected-cource").value;
        var swapCourse = document.getElementById("swap-course").value;
        var isSelectedCourseExists = selectedCourseList.includes(selectedCourse) // check the course exist or not in the list
        var isSwapCourseExists = swapCourseList.includes(swapCourse) // check the course exist or not in the list
        console.log(isSelectedCourseExists);
        console.log(isSwapCourseExists);
        if ((swapCourse != selectedCourse) && (selectedCourse != "") && (swapCourse != "")) {
          if(!isSelectedCourseExists || !isSwapCourseExists){
            swapCourseList.push(swapCourse); 
            selectedCourseList.push(selectedCourse); 
            console.log(selectedCourseList);
            console.log(swapCourseList); 
            displaySwapCources(selectedCourseList,swapCourseList) // Trigger this function to display the courses
            chrome.storage.local.set({ "swap-course": {'selectedCourseList':selectedCourseList,'swapCourseList':swapCourseList} }); // save selectedCourseList and swapCourseList
            swapInputWarnings.textContent = ""
            return true;
          }else{
            swapInputWarnings.textContent = "warnings: Already Added";
          }
        }else{
          swapInputWarnings.textContent = "warnings: Blank input or slected courses and swap courses are same";
        }
        return false;
      }

      function addSwapField() {
        var added = addSwapValue() // Trigger this function to add the courses to the list
        
        if(added){
          const fieldHtml = `
            <div class="relative m-2 rounded-md shadow-sm">  <!-- single course input fields -->
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 mr-10">
              <span class="text-gray-500 sm:text-sm ">Selected Course |</span>
            </div>
            <input type="text" name="price" id="selected-cource" class="block w-full rounded-md border-0 py-1.5 pl-[110px] pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Cse181.1">
          </div>
          <div class="relative m-2 rounded-md shadow-sm">  <!-- single course input fields -->
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 mr-10">
              <span class="text-gray-500 sm:text-sm ">Swap Course |</span>
            </div>
            <input type="text" name="price" id="swap-course" class="block w-full rounded-md border-0 py-1.5 pl-[110px] pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Cse181.2">
          </div>
        `;
        swapfieldsDiv.innerHTML = fieldHtml;
        }
      }
  
      function displaySwapCources(selectedCourse,swapCourse){
        const listLength = swapCourseList.length;
        swapdisplayCoursesDiv.innerHTML = "";
        console.log(listLength);
        if (listLength != 0) {
            for (var i = 0; i < listLength; i++) {
                var selectedCourceText = selectedCourse[i];
                var swapCourceText = swapCourse[i];
                var courseHtml = `
                <button class="ml-1 bg-slate-300 hover:bg-slate-400 focus:bg-slate-500 text-slate-700 py-1 px-2 rounded-full transition duration-300 ease-in-out">
                    ${selectedCourceText}<i class="fa fa-exchange px-2" style='color:green;'></i> ${swapCourceText}
                    <i id="${swapCourceText}" class="fa fa-close px-2 rmv-swap-course" style='color:red;'>
                        <span style='display:none'>${i}</span>
                    </i>
                </button>
                `;
                
                swapdisplayCoursesDiv.innerHTML += courseHtml;
                
            }
        }else{
            var courseHtml = `
                <span class="bg-slate-300 hover:bg-slate-500 font-semibold focus:bg-slate-600 text-slate-700 py-1 px-2 rounded-full transition duration-300 ease-in-out">
                  No Selected cources
                </span>
                `;
                
            swapdisplayCoursesDiv.innerHTML += courseHtml;
        }
      }

      function removeSwapCourse(event){
        var target = event.target;
        if (target.classList.contains("rmv-swap-course")) {
          // Find the <span> element within the <i> element
          var spanElement = target.querySelector('span');

          var listIndex = parseInt(spanElement.textContent);
          swapCourseList.splice(listIndex, 1);
          selectedCourseList.splice(listIndex, 1);
          displaySwapCources(selectedCourseList,swapCourseList) // Trigger this function to display the courses
          chrome.storage.local.set({ "swap-course": {'selectedCourseList':selectedCourseList,'swapCourseList':swapCourseList} }); // save selectedCourseList and swapCourseList
        }
      }
// script ended here 

    document.addEventListener("DOMContentLoaded", function () {
      // Wait for the document to be fully loaded

      // Find the "Add Next" button by its ID
      const addFieldBtn = document.getElementById("add-field-btn"); 
      // Find the "Add Next" button by its ID
      const addSwapFieldBtn = document.getElementById("add-swap-field-btn");
      // Find the course container by its ID
      const courseContainer = document.getElementById("course-container") 
      // Find the course container by its ID
      const swapDisplayContainer = document.getElementById("swap-display-container") 
      // Find the "select-courses-btn" button by its ID
      const selectcourseBtn = document.getElementById("select-courses-btn")
      const swapCourceBtn = document.getElementById("swap-courses-btn");
      // Find the "select-btn" button by its ID
      const selectBtn = document.getElementById("select-btn")
      // Find the "select-btn" button by its ID
      const swapBtn = document.getElementById("swap-btn")
      // Find the "select-courses-btn" button by its ID
      const selectcourseContainer = document.getElementById("select-courses-container");
      // Find the "select-courses-btn" button by its ID
      const swapcourseContainer = document.getElementById("swap-courses-container");

      selectBtn.addEventListener("click",function(){
        selectcourseContainer.style.display = "block";
        swapcourseContainer.style.display = "none";

        swapBtn.classList.remove("bg-sky-400");
        selectBtn.classList.add("bg-sky-400");
        swapBtn.classList.add("bg-sky-200");
        selectBtn.classList.remove("bg-sky-200");
      })

      swapBtn.addEventListener("click",function(){
        swapcourseContainer.style.display = "block";
        selectcourseContainer.style.display = "none";

        selectBtn.classList.remove("bg-sky-400");
        swapBtn.classList.add("bg-sky-400");
        selectBtn.classList.add("bg-sky-200");
        swapBtn.classList.remove("bg-sky-200");
      })
      // Add a click event listener to the button
      addFieldBtn.addEventListener("click", addField);
      addSwapFieldBtn.addEventListener("click", addSwapField);
      // Add a click event listener to the button
      courseContainer.addEventListener("click", removeCourse);
      swapDisplayContainer.addEventListener("click", removeSwapCourse);

      // Add a click event listener to the button for select courses
      // selectcourseBtn.addEventListener('click', async () => {
      //   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
      //   chrome.scripting.executeScript(
      //       {
      //           target: { tabId: tab.id },
      //           function: selectMyCourse,
      //           args: [courseList],
      //       },
      //   );
      // });
      selectcourseBtn.addEventListener('click', function (e) {
        if(courseList.length > 0) {
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { action: 'select-course' });
          });
        }else{
          selectInputWarnings.textContent = "No course available for select";
          setTimeout(()=>{
            selectInputWarnings.textContent = "";
          },5000)
        }
      });

      // Add a click event listener to the button for swap courses
      // swapCourceBtn.addEventListener('click', async () => {
      //   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
      //   chrome.scripting.executeScript(
      //       {
      //           target: { tabId: tab.id },
      //           function: swapMyCourse,
      //           args: [selectedCourseList,swapCourseList],
      //       },
      //   );
      // });
      swapCourceBtn.addEventListener('click', function (e) {
        if(swapCourseList.length > 0) {
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { action: 'swap-course' });
          });
        }else{
          swapInputWarnings.textContent = "No course available for select";
          setTimeout(()=>{
            swapInputWarnings.textContent = "";
          },5000)
        }
    });



      

    });
