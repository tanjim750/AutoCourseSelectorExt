const url = window.location.href;
let inputEvent = new Event('input', { bubbles: true });

function getTimer(){
  let timeLimit = 1;

  const days = document.querySelector('.days');
  const hours = document.querySelector('.hours');
  const minutes = document.querySelector('.minutes');
  const seconds = document.querySelector('.seconds');

  if(days){
    days = parseInt(days.textContent);
    timeLimit += 86400*days;
  }
  if(hours){
    hours = parseInt(hours.textContent);
    timeLimit += 3600*hours;
  }
  if(minutes){
    minutes = parseInt(minutes.textContent);
    timeLimit += 60*minutes;
  }
  if(seconds){
    seconds = parseInt(seconds.textContent);
    timeLimit += seconds;
  }

  return timeLimit;
}

function fuseAlart(alarts,timeout=5000){
  let notifier = document.querySelector('notifier-container ul');
  let uniqeId = "custom-fuse-alart-message"+Math.floor(Math.random() * 100) + 1;
  let tostBox = '';
  for(let alart of alarts){
    tostBox += `
    <app-toast class="ng-tns-c84-52 ng-star-inserted" style="">
      <fuse-alert class="-mt-5 -mb-5 -ml-7 -mr-7 ng-tns-c84-52 ng-tns-c83-53 ng-trigger ng-trigger-shake fuse-alert-appearance-border fuse-alert-show-icon fuse-alert-type-success ng-star-inserted">
       <div class="fuse-alert-container ng-tns-c83-53 ng-trigger ng-trigger-fadeIn ng-star-inserted" style="opacity: 1;">
          <div class="fuse-alert-border ng-tns-c83-53 ng-star-inserted" style="background:${alart.color}"></div>
          <!---->
          <div class="fuse-alert-icon ng-tns-c83-53 ng-star-inserted" style="">
             <div class="fuse-alert-custom-icon ng-tns-c83-53"></div>
             <div class="fuse-alert-default-icon ng-tns-c83-53">
                <!----><!----><!----><!----><!---->
                <mat-icon role="img" class="mat-icon notranslate ng-tns-c83-53 mat-icon-no-color ng-star-inserted" aria-hidden="true" data-mat-icon-type="svg" data-mat-icon-name="check-circle" data-mat-icon-namespace="heroicons_solid">
                   <svg xmlns="http://www.w3.org/2000/svg" style="color:${alart.color}" viewBox="0 0 20 20" fill="currentColor" fit="" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                   </svg>
                </mat-icon>
                <!----><!----><!---->
             </div>
          </div>
          <!---->
          <div class="fuse-alert-content ng-tns-c83-53">
             <div class="fuse-alert-title ng-tns-c83-53"><span fusealerttitle="" class="ng-tns-c83-53" style="color:${alart.color}">${alart.message}</span></div>
             <div class="fuse-alert-message ng-tns-c83-53"> </div>
          </div>
          <button mat-icon-button="" class="fuse-alert-dismiss-button ng-tns-c83-53 mdc-icon-button mat-mdc-icon-button mat-unthemed mat-mdc-button-base">
             <span class="mat-mdc-button-persistent-ripple mdc-icon-button__ripple"></span>
             <mat-icon role="img" class="mat-icon notranslate mat-icon-no-color" aria-hidden="true" data-mat-icon-type="svg" data-mat-icon-name="x" data-mat-icon-namespace="heroicons_solid">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" fit="" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false">
                   <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
             </mat-icon>
             <span class="mat-mdc-focus-indicator"></span><span matripple="" class="mat-ripple mat-mdc-button-ripple"></span><span class="mat-mdc-button-touch-target"></span>
          </button>
       </div>
       <!---->
     </fuse-alert>
   </app-toast><br><br>
 `
  }

  let html = `
<li id="${uniqeId}">
  <div class="cdk-overlay-container">
       <div class="cdk-global-overlay-wrapper" dir="ltr" style="justify-content: flex-end; align-items: flex-start;">
          <div id="cdk-overlay-3" class="cdk-overlay-pane" style="position: static; margin-top: 0px; margin-right: 0px;">
             <mat-snack-bar-container class="mdc-snackbar mat-mdc-snack-bar-container mdc-snackbar--open ng-tns-c82-51 ng-trigger ng-trigger-state mt-20 lg:mr-22 md:mr-7 sm:mr-7 mx-20 mr-7 ng-star-inserted" style="transform: scale(1); opacity: 1;">
                <div class="mdc-snackbar__surface ng-tns-c82-51">
                   <div class="mat-mdc-snack-bar-label ng-tns-c82-51 mdc-snackbar__label">
                      <div class="ng-tns-c82-51" aria-live="assertive">
                         <div class="ng-tns-c82-51">
                            ${tostBox}
                            <!---->
                         </div>
                      </div>
                   </div>
                </div>
             </mat-snack-bar-container>
          </div>
       </div>
    </div>
  </li>
  `;

  notifier.innerHTML += html;
  setTimeout(function() {
    let elements = notifier.querySelectorAll(`li#${uniqeId}`)
    for(let element of elements) {
      element.remove();
    }
  },timeout)
}

function contentLoaded(){
  let loading = document.querySelector('skeleton');
  
  if (loading !== null){
    setTimeout(contentLoaded,5000)
  }else{
    return true;
  }
}

function reload(){
    let menues = document.querySelectorAll('fuse-vertical-navigation-basic-item');
    menues[1].querySelector('a').click(); 
    setTimeout(function(){menues[2].querySelector('a').click();},2000)
    setTimeout(getStart,3000)
}

function selectMyCourse(courseList){

  // const courseList = ["ACT141.24","ACT141.26","CSE161.3"]
  const resultList = [];

  function main(){
    //const courseText = "ACT141.24"; // The text associated with the checkbox
    // Find all checkboxes
    console.log(`main function running. Total ${courseList.length} courses to select`);
    const searchBox =  document.querySelector('input#mat-input-0')
    const totalCourses = courseList.length;

    function select(start,end){
      if(start < end){
        let courseText = courseList[start];
        searchBox.value = courseText;
        searchBox.dispatchEvent(inputEvent);

        const courseCheckbox = document.querySelector('mat-checkbox input[type="checkbox"]');
        if(courseCheckbox !== null){
          if(!courseCheckbox.checked){
            courseCheckbox.click();
            
            function checkLoaded(){
              let notifier = document.querySelector('notifier-container ul li');
              if (notifier == null){
                setTimeout(checkLoaded,200)
              }else{
                return notifier.textContent;
              }
            }

            var alartText = checkLoaded();
            var alart = {message:alartText,color:"#56bf5f"}
            resultList.push(alart);
          }else{
            var alart = {message:`The course ${courseText} already selected`,color:"#d92121"}
            resultList.push(alart);
            fuseAlart([alart]);
          }

        }else{
          var alart = {message:`The course ${courseText} is not found`,color:"#d92121"}
          resultList.push(alart);
          fuseAlart([alart]);
        }

        // run recursive search
        start++;
        loop(start,end);
      }else if( end == start ){
        fuseAlart(resultList);
        return
      }
    }

    if(searchBox !== null){
      select(0,totalCourses)
    }else{
      setTimeout(main,1000);
    }
  }
  // main function end 
  function getStart(){
    let content_loaded = contentLoaded();
    let timeLimit = getTimer(); // returns time limit in seconds

    let umsHeader = document.querySelector(".fuse-alert-container");
    let hedaerText = 'Info: Your advising start time is not yet declared. For more information contact your coordinator.';
    // umsHeader.textContent = "he ewbj"/
    if(umsHeader.textContent.trim() != hedaerText){
      fuseAlart([{message:"Please wait until the timer ends.",color:"#56bf5f"}])
      // if(umsHeader){umsHeader.innerHTML = "<b style='color:#5d3bf5;'> Please wait until the timer ends.</b>";}
      console.log(`Time Limit in seconds: ${timeLimit} and Time Limit in miliseconds: ${timeLimit*1000}`);
      
      if (timeLimit > 60*2.5){
        setTimeout(reload,(timeLimit-60*1.5)*1000);
      }else{
        // fuseAlart([{message:`The course CSE241.13 already selected`,color:"#d92121"},{message:`CSE242.12 course was successfully selected`,color:"#56bf5f"},{message:`The course CSE282.12 was not found`,color:"#56bf5f"}]);
        setTimeout(main,(timeLimit)*1000);
      }
    }else{
      fuseAlart([{message:"Your advising start time is not yet declared",color:"#d92121"}]);
    }
    
  }

  getStart()

}

// swap courses script starts here 
function swapMyCourse(selectedCourseList,swapCourseList){
    const resultList = [];

    function checkLoaded(){
      let notifier = document.querySelector('notifier-container ul li');
      if (notifier == null){
        setTimeout(checkLoaded,200)
      }else{
        return notifier.textContent;
      }
    }

    function main(){
      //const courseText = "ACT141.24"; // The text associated with the checkbox
      // Find all checkboxes
      const checkboxes = document.querySelectorAll('mat-checkbox input[type="checkbox"]');
      const checkboxesLength = checkboxes.length;
      var selectedCourseCheckbox = null;
      var swapCourseCheckbox = null;
      console.log(`main function running. array length ${checkboxesLength}`);
      if(checkboxesLength>0){
        for(var i=0; i<swapCourseList.length; i++){
          const swapCourseText = swapCourseList[i];
          const selectedCourseText = selectedCourseList[i];
          var swapCourseSeatAbailable = false;
          for (const checkbox of checkboxes) {
            const parentDiv = checkbox.closest('.bg-card'); // Select the parent div with class "bg-card"
            // if(parentDiv){action.textContent= "True"}else{action.textContent= "False"}
            if (parentDiv){
              const seatLimitElement = parentDiv.querySelector('div.block.lg\\:hidden'); 
              // console.log("seatLimitElement");
              // console.log(seatLimitElement);
              var seatLimit = null;
              if(seatLimitElement){
                 seatLimit = seatLimitElement.textContent.trim().split("/");
              }else{ seatLimit = [20,23];}
              const tooltipTriggerDiv = parentDiv.querySelector('div.mat-mdc-tooltip-trigger');
              if(tooltipTriggerDiv){
                  const weAreWatchingYouA = tooltipTriggerDiv.querySelector('we-are-watching-you');
                  if(weAreWatchingYouA){
                      if(weAreWatchingYouA.textContent.trim().toUpperCase() === swapCourseText.trim().toUpperCase()){
                        if(parseInt(seatLimit[0])< parseInt(seatLimit[1])){
                          swapCourseCheckbox = checkbox;
                          swapCourseSeatAbailable = true;
                          if(selectedCourseCheckbox && swapCourseSeatAbailable){
                            if(!swapCourseCheckbox.checked){
                              selectedCourseCheckbox.click();
                              swapCourseCheckbox.click();
                              // umsHeader.innerHTML += `<b style="color:green;">${swapCourseText} </b>, `;
                  
                              var alartText = checkLoaded();
                              var alart = {message:alartText,color:"#56bf5f"}
                              resultList.push(alart);
                            }else{
                              var alart = {message:`The course ${swapCourseText} already selected`,color:"#d92121"}
                              resultList.push(alart);
                              fuseAlart([alart]);
                              
                            }
                            break;
                          }
                          
                        }else{
                          var alart = {message:`No seat available for the course ${swapCourseText}`,color:"#d92121"}
                          resultList.push(alart);
                          fuseAlart([alart]);
                      }
                      }
                      else if(weAreWatchingYouA.textContent.trim().toUpperCase() === selectedCourseText.trim().toUpperCase()){
                        selectedCourseCheckbox = checkbox;
                        if(swapCourseCheckbox && swapCourseSeatAbailable){
                          if(selectedCourseCheckbox.checked){
                            selectedCourseCheckbox.checked.click();
                            swapCourseCheckbox.checked.click();
                            
                            var alartText = checkLoaded();
                            var alart = {message:alartText,color:"#56bf5f"}
                            resultList.push(alart);
                          }else{
                            var alart = {message:`${selectedCourseText} couldn't swap because course wasn't selected`,color:"#d92121"}
                            resultList.push(alart);
                            fuseAlart([alart]);
                          }
                          break;
                        }
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

    function getStart(){
      let content_loaded = contentLoaded();
      let timeLimit = getTimer(); // returns time limit in seconds
  
      let umsHeader = document.querySelector(".fuse-alert-container");
      let hedaerText = 'Info: Your advising start time is not yet declared. For more information contact your coordinator.';
      // umsHeader.textContent = "he ewbj"/
      if(umsHeader.textContent.trim() != hedaerText){
        fuseAlart([{message:"Please wait until the timer ends.",color:"#56bf5f"}])
        // if(umsHeader){umsHeader.innerHTML = "<b style='color:#5d3bf5;'> Please wait until the timer ends.</b>";}
        console.log(`Time Limit in seconds: ${timeLimit} and Time Limit in miliseconds: ${timeLimit*1000}`);
        
        if (timeLimit > 60*2.5){
          setTimeout(reload,(timeLimit-60*1.5)*1000);
        }else{
          // fuseAlart([{message:`The course CSE241.13 already selected`,color:"#d92121"},{message:`CSE242.12 course was successfully selected`,color:"#56bf5f"},{message:`The course CSE282.12 was not found`,color:"#56bf5f"}]);
          setTimeout(main,(timeLimit)*1000);
        }
      }else{
        fuseAlart([{message:"Your advising start time is not yet declared",color:"#d92121"}]);
      }
      
    }
  
    getStart()
    
  }


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'select-course') {
      // Do something in response to the message
      console.log('Message received in content.js');
      chrome.storage.local.get("select-course", function (result) {
          const courseList = result['select-course'];
          console.log(result);
          if (courseList) {
            selectMyCourse(courseList)
          }
      });
  }else if (request.action === 'swap-course'){
    console.log('Message received in content.js');
    chrome.storage.local.get("swap-course", function (result) {
      const swapCourse = result['swap-course'];
      console.log(result);
      if (swapCourse) {
          let selectedCourseList = swapCourse.selectedCourseList;
          let swapCourseList = swapCourse.swapCourseList;
          swapMyCourse(selectedCourseList,swapCourseList)
      }
    });
  }else if(request.action == 'access'){
    if(url.split('/')[2] == 'ums.seu.edu.bd'){
      sendResponse({hasAccess: true});
    }else{
      sendResponse({hasAccess: false})
    }
  }
});
