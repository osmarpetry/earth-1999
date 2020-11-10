# Earth-1999

This application is hosted at [https://earth-19999.web.app](https://earth-19999.web.app).

### What's this application is about?

It's a React.js web application from the open Marvel's comics API

#### What this application has

- Storybook
- Visual tests on Storybook with Chromatic
- Unit Tests using @testing-library
- E2E Cypress with Cucumber (BDD) tests
- Typescript
- SWR
- Hosting on Firebase
- Sentry for error tracking
- CI/CD with Travis-CI
- Responsive
- Loading, empty, and error states

#### What's the roadmap?

- Storybook with more uses cases
- Move the container component to the Storybook. For in the container just do the API calls and handle the local storage. It would make it easier to take care of screen states and responsivity
- Better unit tests
- Better E2E tests
- React.lazy for just import the component if it's necessary (have data available to show)
- Be a PWA

## How to contribute to the project

To help, it is necessary to do the project setup, as instructed in the sub-topics below. However, it is necessary to first execute the fork of the application in the way is quoted in the following image:

![Fork button on Github](https://paper-attachments.dropbox.com/s_4C296FD04C70E1AA93F121DEEDBDB4413517CB63FFB0F178E10CA4F7986B7B6E_1561321377007_687474703a2f2f692e737461636b2e696d6775722e636f6d2f6c72346d6c2e706e67.png)

**Dependencies for installation**
You must have a version installed on your operating system, should choose the latest LTS version.

![Search for the latest NodeJS  LTS version- https://nodejs.org/en/](https://paper-attachments.dropbox.com/s_09FD78B46731843365377929C457B25A6A592DBA5A41C7B2079869D4726AC833_1562870681311_Screenshot_20190711_154433.png)

The code can be edited in any text editor, however, we recommend using the Visual Studio Code. Because it has several extensions that aid in the development.

![Visual Studio Code open](https://i.imgur.com/HQchax9.png)

**Installation**

Should do the download of the code using git, the code should be the fork you made earlier. Use the following command:

    git clone https://github.com/YOUR_GITHUB_USER/earth-1999.git

Now navigate to the page and install the dependencies with the following command:

    npm install

Finally, you can upload the project with the following command:

    npm start

Then you will have access to the project in your browser, at the address: http://localhost:3000/

![Heroes list web page](https://i.imgur.com/M0hfbGw.png)

![Hero details web page](https://i.imgur.com/Te9JpnE.png)

**Making PR to my branch**
Pull Request must be done by comparing the branch on your fork to my master branch. As you can see in the following image:

![Branch comparison from master to the fork](https://paper-attachments.dropbox.com/s_92657E8B9CBF146FAAFF1F5A42F8C9DCF1F011A1782383B18B4CB42984430344_1562858184741_pr-to-my-branch.png)
