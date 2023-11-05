
  (() => {
    const selectMyCourses = () => {
      return new Promise((resolve) => {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
          if (request.courseList) {
              const courseList = request.courseList;
              
        
              for(const courseText of courseList){
                //const courseText = "ACT141.24"; // The text associated with the checkbox
                // Find all checkboxes
                const checkboxes = document.querySelectorAll('mat-checkbox input[type="checkbox"]');
                // var dispCources = document.getElementById(courseText);
                var action = document.querySelector("#action");
                for (const checkbox of checkboxes) {
                  const parentDiv = checkbox.closest('.bg-card'); // Select the parent div with class "bg-card"
                  if(parentDiv){action.textContent= "True"}else{action.textContent= "False"}
                  if (parentDiv){
                    const tooltipTriggerDiv = parentDiv.querySelector('div.mat-mdc-tooltip-trigger');
                    if(tooltipTriggerDiv){
                        const weAreWatchingYouA = tooltipTriggerDiv.querySelector('we-are-watching-you');
                        if(weAreWatchingYouA){
                            if(weAreWatchingYouA && weAreWatchingYouA.textContent.trim() === courseText.trim()){
                                if(!checkbox.checked){
                                    checkbox.checked = true;
                                    // dispCources.classList.remove("fa-close");
                                    // dispCources.classList.remove("rmv-course");
                                    // dispCources.classList.add("fa-check");
                                    // dispCources.style.color = "green";
                                }else{
                                    checkbox.checked = false;
                                }
                                break;
                            }
                        }
                    }
                  }
                  
                }
              }
          }
      
        });
      });
    };
  })();