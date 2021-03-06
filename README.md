# React Firebase Chat Application


![Chat application built using react and firebase](https://user-images.githubusercontent.com/56753745/147826029-8912c827-ef0b-468b-a1c4-2840f9cf3dd4.png)


My goal for building this application was to gain a deeper understanding real time data handling and mimic a team-based workflow. The complete project can be found here [React Chat Application](https://reactfirebasechat.vercel.app/)

* I recorded tasks and each feature for the application in this google doc. [Tasks and Requirement Specification](https://docs.google.com/document/d/1fBldFKOj1dvne7TzPW9SU3p9w67cT5Wc-AEfDCSsjvw/edit). 


* For the design, I used this design from figma. [Application Design](https://www.figma.com/file/O9RYx9soVwm4hPJboKqso9/Qwerty---Chat-Application-(Community))


* The following is a sample account that can used to access the application

**Email:** smith@reactfirebase.com
**Password:** test123

# Tech Stack 
1. React for the frontend 
2. Firebase Realtime Database for the backend 
3. Context API for state management 
4. CSS modules for styling
5. Cloud Storage for Firebase
6. Vercel for hosting

I decided to use Context API because the application does not require complex state handling and does not have caching functionality. In terms of the backend, I considered using Node.js and Socket.IO, but my deeper familiarity with firebase meant that I could get the project up and running quicker. Besides, the Realtime Database offered plenty of features off the box; hence, there was no need to go with a custom solution. 

Finally, I opted to use React because I its component driven architecture significantly improves the process building and maintaining web applications. Using react with CSS modules allowed me to develop parts of the application quickly and in isolation.

# Additional Features 
If I had more time I would have incorporated more features, such as group chats and friends. 

# Available Scripts (Adopted from Create React App)
In the project directory, you can run:

`npm start`
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

`npm run build`
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

