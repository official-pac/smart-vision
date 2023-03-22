# smart-vision

Guidance on branch-wise code

  a. branch: main
     comment: Contains code with bootstrap UI and covers most of the functionality except for on-screen keyboard and configuration based page load.
              To access the store / seeded user, use RC number "MH05EB1234". This can be found in the session storage as well.
              
  b. branch: feature/config
     comment:  Contains configuration based input field loading. This functionality has only been implemented in the Registration page. 
               Configuration is loaded from db.json file via json-server.
               
  c. branch: feature/keyboard
     comment: Contains keyboard functionality. Third-party library "angular-onscreen-material-keyboard" has been used. This functionality has been
              implemented only in the Search page to show-case the feasibility and functioality.
              
  d. branch: feature/keyboard-manual
     comment: Contains custome made keyboard functionality. This functionality has been implemented only in the Search page to show-case the feasibility
              and functioality.            
  
  NOTE: 1. Start json-server before using the appliction. Execute below command inside the project root folder.
  
           Command: json-server --watch db.json
  
        2. Seeded RC Number: MH05EB1234
