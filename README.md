# Neighbourhood Helper (MERN Stack)

See live demo [here](https://alt-west-connect-neighbourhood-helper.vercel.app/).

**Note**: The back end is hosted on Render's free tier - please allow ~10 seconds for the initial load while the server spins up from the cold start.

## 1. Project Overview

Neighbourhood Helper is a community-driven platform where users can request or offer small favours. Whether you need a ride, groceries, or quick assistance, the app connects people in Alt-West Leipzig willing to help within their neighbourhood.

Users can:

- Browser help requests
- Register and login
- Offer help
- Ask for help
- Edit and delete help requests
- Accept or decline help offers from other users
- Edit their user account data (e.g., username, password)
- Delete their own accounts and related requests and offers

## 2. Core Features & User Stories

- As a user, I want to browse help requests without needing an account.
- As a user, I want to register and log in so I can request and offer help.
- As a user, I want to post help requests (ask for help) and see my requests displayed on the homepage.
- As a user, I want to edit and delete my requests.
- As a user, I want to offer help on one or many existing requests (these then are marked as "Helped" and no one else can offer help).
- As a user, I want to see who offered help on my requests.
- As a user, I want to be able accept or decline offers.
- As a user, I want to see a history of my past requests/offers.
- As a user, I want to edit my data (e.g., username, password).
- As a user, I want to delete my account and all related data.
- As a user, I want to log out securely.

#### Possible future features:

- As a user, I want to upload a user profile picture to display on my requests in the homepage.
- As a user, I want to filter requests by category (e.g., groceries, rides, errands).
- As a user, I want to receive a notification when someone offers help on my requests.
- As a user, I want to contact other users directly via the platform.

## 3. Main Pages

- **Register Page**: Sign up for an account
- **Login Page**: Securely log in
- **Homepage**: Browse all help requests and offer help
- **Ask for Help Page**: Post a help request on homepage
- **About Page**: Learn more about the project and the community
- **My Account Page (User Dashboard)**:
  - User Information
  - My Requests (requests the user has posted)
  - My Offers (requests the user has offered to help with)

## 4. Data Structure (MongoDB & Mongoose)

#### 4.1. User Collection (to store user information)

```js
{
  username: { type: String, required, unique },
  firstName: { type: String, required },
  lastName: { type: String, required },
  email: { type: String, required, unique },
  password: { type: String, required },
  zipCode: {
    type: String,
    enum: [
      "04177 Lindenau, Alt-Lindenau, Neu-Lindenau",
      "04178 Böhlitz-Ehrenberg, Rückmarsdorf, Burghausen",
      "04179 Leutzsch",
    ],
    required,
  },
  requests: [{ type: Schema.Types.ObjectId, ref: "Request" }], // Requests posted by the user
  offers: [{ type: Schema.Types.ObjectId, ref: "Offer" }], // Offers made by the user
  offersReceived: [{ type: Schema.Types.ObjectId, ref: "Offer" }], // Offers received on user's requests
  createdAt: { type: Date, default: Date.now },
}
```

#### 4.2. Request Collection (to store help requests information)

```js
{
  userId: { type: Schema.Types.ObjectId, ref: "User" }, // Who posted it
  description: { type: String, required },
  category: {
    type: String,
    enum: [
      "Errands",
      "Groceries",
      "Transport",
      "Household",
      "Pet Care",
      "Childcare",
      "Tutoring",
      "Tech Support",
      "Moving",
    ],
    default: "Errands",
  },
  when: { type: String, required },
  status: { type: String, enum: ["open", "helped"], default: "open" },
  acceptedHelper: { type: Schema.Types.ObjectId, ref: "User" }, // Who helped (not the user who posted the request)
  receivedOffers: [{ type: Schema.Types.ObjectId, ref: "Offer" }], // Offers received on a request (not the offers made by the user)
  createdAt: { type: Date, default: Date.now },
}
```

Note: Zip Code is already set when user registers.

#### 4.3. Offer Collection (to store help offers information)

```js
{
  requestId: { type: Schema.Types.ObjectId, ref: "Request" }, // To which request
  helperId: { type: Schema.Types.ObjectId, ref: "User" }, // Who offered help
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}
```

## 5. Backend API Design (Express & MongoDB)

#### 5.1. User Routes (`/users`)

| Method | Endpoint        | Description                                                  | Logged in User? |
| ------ | -----------     | ------------------------------------------------------       | --------------- |
| POST   | `/register`     | Create a new user                                            | ❌ No           |
| POST   | `/login`        | Authenticate user & return JWT token                         | ❌ No           |
| POST   | `/login/google` | Authenticate user & return JWT token (registration & login)  | ❌ No           |
| GET    | `/logout`       | Log out user                                                 | ✅ Yes          |
| GET    | `/data`         | Fetch logged-in user data                                    | ✅ Yes          |
| PATCH  | `/update`       | Update user data                                             | ✅ Yes          |
| DELETE | `/delete`       | Delete user account and all related offers & requests.       | ✅ Yes          |

#### How will the frontend use these?

- The register & login pages will use `/register` and `/login`.
- The frontend will store the JWT token in localStorage or cookies to authenticate the user.
- After login, the app will use `GET /data` to show the logged-in user's profile or dashboard, and to keep user logged in after refreshing page.

#### 5.2. Requests Routes (`/requests`)

| Method | Endpoint          | Description                            | Logged in User? |
| ------ | ----------------- | -------------------------------------- | --------------- |
| GET    | `/`               | Display all requests on homepage       | ❌ No           |
| GET    | `/:id`            | View details of a specific request     | ❌ No           |
| GET    | `/my-requests`    | Fetch all requests from logged-in user | ✅ Yes          |
| POST   | `/`               | Create a new help request              | ✅ Yes          |
| PATCH  | `/:id`            | Request creator edits their request    | ✅ Yes          |
| DELETE | `/:id`            | Request creator deletes their request  | ✅ Yes          |

#### How will the frontend use these?

- The homepage (`GET /requests`) will display all requests.
- The request card (`GET /requests/:id`) will show details of a specific request.
- The create request page (`POST /requests`) will let users add a new request.
- The edit request page (`PATCH /requests/:id`) will allow modifying a request.
- A delete button (`DELETE /requests/:id`) will let users remove their request.

#### 5.3. Offers Routes (`/offers`)

| Method | Endpoint           | Description                                      | Logged in User? |
| ------ | ------------------ | ------------------------------------------------ | --------------- |
| GET    | `/my-offers`       | Fetch all offers from logged-in user             | ✅ Yes          |
| POST   | `/:requestId`      | Post an offer on a request                       | ✅ Yes          |
| GET    | `/:requestId`      | Fetch all offers for a specific request          | ✅ Yes          |
| DELETE | `/cancel/:offerId` | User cancels own offers                          | ✅ Yes          |
| DELETE | `/reject/:offerId` | User rejects offers from other users             | ✅ Yes          |
| PATCH  | `/accept/:offerId` | Request owner accepts an offer                   | ✅ Yes          |
| PATCH  | `/:offerId`        | Offer owner edits their offer (NOT APPLIED)      | ✅ Yes          |

#### How will the frontend use these?

- On a request card, users will see a button "Offer Help" → This calls `POST /offers/:requestId`.
- The request owner can see who offered help → This uses `GET /offers/:requestId`.
- If a user wants to refuse a help offer, they will use `DELETE /offers/:offerId`.
- If a user wants to accept a help offer, they will use `PATCH /offers/:offerId`.

## 6. User Journey

#### 📌 User registers

1. User creates an account.
2. Automatically logged in.
3. Redirected to the homepage (see all requests).

#### 📌 User asks for help

1. User logs in.
2. Redirected to the homepage.
3. Clicks on "Ask for Help" page.
4. Fills out a form:
   - Category (e.g., "Transport").
   - Description (details about the request).
   - When (date and time).
5. Clicks "Submit Request" → Sees success message → Request is added to the homepage.
6. Other users see the request on homepage and can offer help.

#### 📌 User offers help

1. User logs in.
2. Redirected to the homepage.
3. Clicks "Offer Help" in chosen request card.
4. Fills out a form:
   - Message.
5. Clicks "Submit Offer" → Sees success message → Offer is added to the request.
6. Button "Offer Help" turned into "Offer Sent" and no more clicks are allowed on this request.

#### 📌 User securely logs out

1. User clicks "Logout".
2. JWT token is removed from storage.
3. Redirected to homepage.

#### 📌 User views their dashboard to see and manage their requests & offers

1. User logs in.
2. Redirected to the homepage (all requests).
3. Clicks on "My Account".
4. Sees:
   - User information.
   - My Requests (requests they posted).
   - My Offers (requests they offered help on).
5. Can update their account data and delete their account.
6. Can edit or delete their own requests.
7. Can accept or decline offers on other users' requests.

#### 📌 Request owner chooses who helps them by accepting or declining help offers

1. User logs in.
2. Redirected to the homepage.
3. Clicks on and goes to "My Account" page.
4. Clicks on a request with offers.
5. Sees a list of users who offered help.
6. Clicks "Accept" on one of the offers.
7. Request is marked as "Helped" and deleted from the homepage (other users can't offer help anymore).
8. Alternatively, clicks "Reject" to reject an offer.

#### 📌 User updates their data (e.g., username, password) and deletes their account

1. User logs in.
2. Redirected to the homepage.
3. Clicks on and goes to "My Account" page.
4. Clicks on "Update Profile" and updates the names, username, email, or Zip code.
5. Clicks on "Change Password" and updates the password.
6. Alternatively, clicks "Delete Account" → Account is permanently deleted.

#### 📌 User updates or deletes own requests

1. User logs in.
2. Redirected to the homepage.
3. Clicks on and goes to "My Account" page.
4. Clicks "Edit Request" and updates the message of the request.
5. Alternatively, clicks "Delete Request" → Request is removed from homepage.

## 6. Permissions

| Action                               | Unregistered User | Registered User            |
| ------------------------------------ | ----------------- | -------------------------- |
| Browse help requests in the homepage | ✅ Yes            | ✅ Yes                     |
| Register                             | ✅ Yes            | ❌ No (already registered) |
| Login                                | ❌ No             | ✅ Yes                     |
| Ask for help (post a request)        | ❌ No             | ✅ Yes                     |
| Offer help on a request              | ❌ No             | ✅ Yes                     |
| Securely logout                      | ❌ No             | ✅ Yes                     |
| Edit and delete requests             | ❌ No             | ✅ Yes                     |
| Refuse/cancel an offer               | ❌ No             | ✅ Yes                     |
| Edit user data                       | ❌ No             | ✅ Yes                     |
| Delete account                       | ❌ No             | ✅ Yes                     |

## 7. Frontend Structure

#### Pages

| Page              | Description                                                                  |
| ----------------- | ---------------------------------------------------------------------------- |
| `Register.jsx`    | Create an account                                                            |
| `Login.jsx`       | Securely log in                                                              |
| `Homepage.jsx`    | Browse help requests & "Need Help?" button                                   |
| `AskForHelp.jsx`  | Post a help request                                                          |
| `About.jsx`       | About the project and the community                                          |
| `MyAccount.jsx`   | User dashboard (see/edit/delete requests, offers, user data, & user account) |
| `NotFound.jsx`    | A 404 page for invalid URLs                                                  |

#### State Management (Context API & Reducers)

- Users (`usersReducer.js`)
- Requests (`requestsReducer.js`)
- Offers (`offersReducer.js`)
- These are managed in `Context.jsx` to provide a **global state**.

## 8. Getting Started

1. Clone the repository:

```bash
git clone git@github.com:diecatiamonteiro/neighbourhood-helper-fullstack-mern.git
```

2. Install dependencies and run the development on **`server/` (BE)**:

```bash
npm install
npm start
```

3. Install dependencies and run the development on **`client/` (FE)**:

```bash
npm install
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser **(FE)**.
