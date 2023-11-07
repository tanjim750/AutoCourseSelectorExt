// here code starts that will execute on the browser
function selectMyCourse(courseList){

  var timeLimit = 1;
  try{
    const days = parseInt(document.querySelector('.days').textContent);
    const hours = parseInt(document.querySelector('.hours').textContent);
    const minutes = parseInt(document.querySelector('.minutes').textContent);
    const seconds = parseInt(document.querySelector('.seconds').textContent);
    if(days > 0){
      timeLimit += 86400*days;
    }
    if(hours > 0){
      timeLimit += 3600*hours;
    }
    if(minutes > 0){
      timeLimit += 60*minutes;
    }
    if(seconds > 0){
      timeLimit += seconds;
    }
  }catch (e) {
    console.log(e);
  }
  
  // const courseList = ["ACT141.24","ACT141.26","CSE161.3"]
  var umsHeader = document.querySelector(".fuse-alert-container");
  // console.log(umsHeader);
  umsHeader.innerHTML = "";
  console.log(`Time Limit in seconds: ${timeLimit} and Time Limit in miliseconds: ${timeLimit*1000}`);

  function main(){
    //const courseText = "ACT141.24"; // The text associated with the checkbox
    // Find all checkboxes
    const checkboxes = document.querySelectorAll('mat-checkbox input[type="checkbox"]');
    const checkboxesLength = checkboxes.length;
    console.log(`main function running. array length ${checkboxesLength}`);
    if(checkboxesLength>0){
      for(const courseText of courseList){
        for (const checkbox of checkboxes) {
          const parentDiv = checkbox.closest('.bg-card'); // Select the parent div with class "bg-card"
          // if(parentDiv){action.textContent= "True"}else{action.textContent= "False"}
          if (parentDiv){
            const seatLimitElement = parentDiv.querySelector('div.block.lg\\:hidden.ng-tns-c349-29');
            const seatLimit = seatLimitElement.textContent.trim().split("/");
            const tooltipTriggerDiv = parentDiv.querySelector('div.mat-mdc-tooltip-trigger');
            if(tooltipTriggerDiv){
                const weAreWatchingYouA = tooltipTriggerDiv.querySelector('we-are-watching-you');
                if(weAreWatchingYouA){
                    if(weAreWatchingYouA && weAreWatchingYouA.textContent.trim() === courseText.trim()){
                      if(parseInt(seatLimit[0])< parseInt(seatLimit[1])){
                        if(!checkbox.checked){
                            checkbox.checked = true;
                            umsHeader.innerHTML += `<b style="color:green;">${courseText} </b>, `;
                        }else{umsHeader.innerHTML += `<b style="color:yellow;">Already selected: ${courseText} </b>, `;}
                        break;
                     }else{umsHeader.innerHTML += `<b style="color:red;">No seat: ${courseText} </b>, `;}
                   }
                }
            }
            
          }
          
        }
      }
    }else{
      setTimeout(main,1000);
    }
  }
  // main function end 
  setTimeout(main,(timeLimit)*1000);
  
}


// here code ends that will execute on the browser


// here code starts that will execute on extension popup 
var fieldsDiv = document.getElementById("input-fields");
      const courseList = [];
      const displayCourcesDiv = document.getElementById("course-container");
    
      function addValue() {
        var courceInp = document.getElementById("courceInp");
        var value = courceInp.value;
        var is_exists = courseList.includes(value) // check the course exist or not in the list
        if (value != "" && !is_exists) {
            courseList.push(value);
            displayCources() // Trigger this function to display the courses
        }
      }

      function addField() {
        addValue() // Trigger this function to add the courses to the list
        
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
  
      function displayCources(){
        const listLength = courseList.length;
        displayCourcesDiv.innerHTML = "";
        if (listLength != 0) {
            for (var i = 0; i < listLength; i++) {
                var cource = courseList[i];
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
          displayCources() // Trigger this function to display the courses
        }
      }


    document.addEventListener("DOMContentLoaded", function () {
      // Wait for the document to be fully loaded

      // Find the "Add Next" button by its ID
      const addFieldBtn = document.getElementById("add-field-btn");
      // Find the course container by its ID
      const courseContainer = document.getElementById("course-container") 
      // Find the "select-courses-btn" button by its ID
      const selectcourseBtn = document.getElementById("select-courses-btn")
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
      // Add a click event listener to the button
      courseContainer.addEventListener("click", removeCourse);
      // Add a click event listener to the button
      selectcourseBtn.addEventListener('click', async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
        chrome.scripting.executeScript(
            {
                target: { tabId: tab.id },
                function: selectMyCourse,
                args: [courseList],
            },
        );
      });

    });


// here code ends that will execute on extension popup 
