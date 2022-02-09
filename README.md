## Summary
Robot Character Generator is a CRUD application that allow users to generate robots with random parts. A user can also authenticate with Firebase Authentication using Email and Password or with Google Authentication. As a user generate their robots, if a robot catch their interest, they can add that robot to their profile dashboard. This data will persist when a user logs back in. A user can also delete a robot from their profile dashboard.

## Getting Started

In order to connect the application with Firebase, a project must be created with Firebase first.
If you haven't created a project on Firebase, you can follow this [Firebase Setup Guide](https://firebase.google.com/docs/web/setup).

Once a Firebase project is created and you've been provided with your project's configuration:
- Replace the key/value pairs inside firebase.js located in the /lib folder.

On Firebase console, navigate to Authentication tab on the right hand side and add Sign-in method:
- Email/Password
- Google

Then enable Firestore Database and Storage.

To begin developing, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Tech Stack
- Front-end
  - ![NEXTJS](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
- Back-end
  - ![FIREBASE](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)
- Deployment
  -![VERCEL](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
#
