# Neighbourhood Helper (MERN Stack)

## 1. Project Overview

Neighbourhood Helper is a community-driven platform where users can request or offer small favours. Whether you need a ride, groceries, or quick assistance, the app connects people willing to help within their neighbourhood.

Users can:

- Browser help requests
- Offer help
- Ask for help
- Register and login
- Edit and delete help requests
- Cancel own offers
- Reject help offers from other users
- Edit their user account data (e.g., username, password)
- Delete their own accounts and related requests and offers

## 2. Core Features & User Stories

- As a user, I want to browse help requests without needing an account.
- As a user, I want to register and log in so I can request and offer help.
- As a user, I want to post help requests (ask for help) and see my requests displayed on the homepage.
- As a user, I want to edit and delete my requests.
- As a user, I want to offer help on one or many existing requests (these then are marked as "Helped" and no one else can offer help).
- As a user, I want to edit my own offers.
- As a user, I want to see who offered help on my requests.
- As a user, I want to be able accept or reject offers.
- As a user, I want to see a history of my past requests/offers.
- As a user, I want to edit my data (e.g., username, password).
- As a user, I want to log out securely.
- As a user, I want to delete my account and all related data.

#### Possible future features:

- ❓ As a user, I want to upload a user profile picture to display on my requests in the homepage.
- ❓ As a user, I want to filter requests by category (e.g., groceries, rides, errands).
- ❓ As a user, I want to receive a notification when someone offers help.
- ❓ As a user, I want to set a time and date for my help requests using a calendar.

## 3. Main Pages

- **Register Page**: Sign up for an account
- **Login Page**: Securely log in
- **Homepage**: Browse all help request
- **My Account Page (User Dashboard)**:
  - My Requests (requests the user has posted)
  - My Offers (requests the user has offered to help with)
- ❓ **Need Help? Page**: Request/ask for help (possibly a modal to display on homepage)

## 4. Data Structure (MongoDB & Mongoose)

#### 4.1. User Collection (to store user information)

```js
{
  username: { type: String, required: true, unique: true},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  zipCode: {
    type: String,
    enum: [
      "04177 Lindenau, Alt-Lindenau, Neu-Lindenau",
      "04178 Böhlitz-Ehrenberg, Rückmarsdorf, Burghausen",
      "04179 Leutzsch", ],
    required: true },
  requests: [{ type: Schema.Types.ObjectId, ref: "Request" }],
  offers: [{ type: Schema.Types.ObjectId, ref: "Offer" }],
  createdAt: { type: Date, default: Date.now },
}
```

#### 4.2. Request Collection (to store help requests information)

```js
{
  userId: { type: Schema.Types.ObjectId, ref: "User" }, // Who posted it
  description: { type: String, required: true },
  category: { type: String,  enum: ["Errands", "Groceries", "Transport", "Household Help", "Pet Care", "Childcare", "Tutoring", "Tech Support", "Moving Help", ], default: "Errands" },
  when: { type: String, required }, // "Today", "Second week of May", "June 15, from 9 to 11 am"
  status: { type: String, enum: ["open", "helped"], default: "open" },
  createdAt: { type: Date, default: Date.now },
}
```

Note: Zip Code is already set when user registers.

#### 4.3. Offer Collection (to store help offers information)

```js
{
  requestId: { type: Schema.Types.ObjectId, ref: "Request" },
  helperId: { type: Schema.Types.ObjectId, ref: "User" }, // Who offered help
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}
```

## 5. Backend API Design (Express & MongoDB)

#### 5.1. User Routes (`/users`)

| Method | Endpoint    | Description                                            | Logged in User? |
| ------ | ----------- | ------------------------------------------------------ | --------------- |
| POST   | `/register` | Create a new user                                      | ❌ No           |
| POST   | `/login`    | Authenticate user & return JWT token                   | ❌ No           |
| GET    | `/logout`   | Log out user                                           | ✅ Yes          |
| GET    | `/data`     | Fetch logged-in user data                              | ✅ Yes          |
| PATCH  | `/update`   | Update user data                                       | ✅ Yes          |
| DELETE | `/delete`   | Delete user account and all related offers & requests. | ✅ Yes          |

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
| ❓ GET | `/?zipCode=04177` | Filter requests by zip code            | ❌ No           |

#### How will the frontend use these?

- The homepage (`GET /requests`) will display all requests.
- The request card (`GET /requests/:id`) will show details of a specific request.
- The create request page/modal (`POST /requests`) will let users add a new request.
- The user dashboard (`GET /requests?zipCode=04177`) will filter requests for the user's neighbourhood.
- The edit request page (`PUT /requests/:id`) will allow modifying a request.
- A delete button (`DELETE /requests/:id`) will let users remove their request.

#### 5.3. Offers Routes (`/offers`)

| Method | Endpoint           | Description                             | Logged in User? |
| ------ | ------------------ | --------------------------------------- | --------------- |
| GET    | `/my-offers`       | Fetch all offers from logged-in user    | ✅ Yes          |
| POST   | `/:requestId`      | Post an offer on a request              | ✅ Yes          |
| GET    | `/:requestId`      | Fetch all offers for a specific request | ✅ Yes          |
| DELETE | `/cancel/:offerId` | User cancels own offers                 | ✅ Yes          |
| DELETE | `/reject/:offerId` | User rejects offers from other users    | ✅ Yes          |
| PATCH  | `/:offerId`        | Offer owner edits their offer           | ✅ Yes          |

#### How will the frontend use these?

- On a request card, users will see a button "Offer Help" → This calls `POST /offers/:requestId`.
- The request owner can see who offered help → This uses `GET /offers/:requestId`.
- If a user wants to refuse a help offer, they will use `DELETE /offers/:offerId`.

## 6. User Journey

#### 📌 User registers

1. User creates an account.
2. Automatically logged in.
3. Redirected to the homepage (see all requests).

#### 📌 User requests/asks for help

1. User logs in.
2. Redirected to the homepage.
3. Clicks "Need Help?" button.
4. Redirected to "Need Help?" page OR modal opens on homepage.
5. Fills out a form:
   - Title (e.g., "Need a ride to the store").
   - Category (e.g., "Transport").
   - Description (details about the request).
   - Zip Code (automatically set based on user).
6. Clicks "Ask for Help" → Sees success message → Request is added to the homepage.
7. Other users see the request and can offer help.

#### 📌 User offers help

1. User logs in.
2. Redirected to the homepage.
3. Clicks "Offer Help" in chosen request card.
4. Button "Offer Help" turned into "Helped" and no more clicks are allowed.

#### 📌 User securely logs out

1. User clicks "Logout".
2. JWT token is removed from storage.
3. Redirected to homepage (or login ???).

#### 📌 User tries to perform unauthorized actions (middleware `checkOwnership`)

1. User tries to edit or delete someone else's request.
2. Server denies access (403 Forbidden).
3. User sees error message: "You are not allowed to edit this request."
4. User is redirected to homepage.

#### 📌 User views their dashboard to see and manage their requests & offers

1. User logs in.
2. Redirected to the homepage (all requests).
3. Clicks on "My Requests and Offers".
4. Sees:
   - "My Requests" (requests they posted).
   - "My Offers" (requests they offered help on).
5. Can edit or delete their own requests.
6. Can withdraw offers on other users' requests.

#### 📌 Request owner chooses who helps them by accepting or declining help offers

1. User logs in.
2. Redirected to the homepage.
3. Clicks on and goes to "My Account" page.
4. Clicks on a request with offers.
5. Sees a list of users who offered help.
6. Clicks "Accept" on one of the offers.
7. Request is marked as "Helped" on the homepage (other users can't offer help anymore).
8. Alternatively, clicks "Decline" to reject an offer.

#### 📌 User updates their data (e.g., username, password) and deletes their account

1. User logs in.
2. Redirected to the homepage.
3. Clicks on and goes to "My Account" page.
4. Clicks on "My Information".
5. Clicks "Update My Info".
6. Updates the names, username, password, or Zip code.
7. Clicks "Save" → The user data is updated.
8. Alternatively, clicks "Delete My Account" → Account is permanently deleted.

#### 📌 User updates or deletes their own offers

1. User logs in.
2. Redirected to the homepage.
3. Clicks on and goes to "My Account" page.
4. Clicks on "My Offers".
5. Clicks "Edit" on an offer.
6. Updates the message of the offer.
7. Clicks "Save" → The offer is updated.
8. Alternatively, clicks "Delete" → Offer is removed.

#### 📌 User updates or deletes own account data

1. User logs in.
2. Redirected to the homepage.
3. Clicks on and goes to "My Account" page.
4. Clicks on "My Offers".
5. Clicks "Edit" on an offer.
6. Updates the message of the offer.
7. Clicks "Save" → The offer is updated.
8. Alternatively, clicks "Delete" → Offer is removed.

#### ❓ User filters requests relevant to them

1. User visits homepage.
2. Uses search bar to find a specific request.
3. Filters by:
   - Category (e.g., "Transport", "Groceries").
   - Zip Code (only shows requests in their area).
4. Clicks on a request → Offers help.

## 6. Permissions

| Action                               | Unregistered User | Registered User            |
| ------------------------------------ | ----------------- | -------------------------- |
| Browse help requests in the homepage | ✅ Yes            | ✅ Yes                     |
| Register                             | ✅ Yes            | ❌ No (already registered) |
| Login                                | ❌ No             | ✅ Yes                     |
| Ask for help (post a request)        | ❌ No             | ✅ Yes                     |
| Offer help on a request              | ❌ No             | ✅ Yes                     |
| Securely logout                      | ❌ No             | ✅ Yes                     |
| Edit and delete requests and offers  | ❌ No             | ✅ Yes                     |
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
| `NotFound.jsx`    | A 404 page for invalid URLs                                                  |
| `MyAccount.jsx`   | User dashboard (see/edit/delete requests, offers, user data, & user account) |
| ❓ `NeedHelp.jsx` | Ask for help (can also be a modal on homepage)                               |

#### Components

| Components              | Description                                            |
| ----------------------- | ------------------------------------------------------ |
| `Navbar.jsx`            | Display logo, navigation links and login status        |
| `Register.jsx`          | Registration form                                      |
| `LoginForm.jsx`         | Login form                                             |
| `Hero.jsx`              | Hero section in homepage                               |
| `NeedHelpBtn.jsx`       | Button to ask for help (redirects to NeedHelp page)    |
| `RequestCard.jsx`       | Help request card displayed in homepage                |
| `RequestList.jsx`       | Wrapper for multiple `RequestCard`components           |
| `NeedHelpModal.jsx`     | Help request form modal displayed in homepage          |
| `ToastNotification.jsx` | Show success/error messages when performing actions    |
| `MyRequests.jsx`        | Requests list to see, edit and delete requests         |
| `MyOffers.jsx`          | Offers list to see, edit and delete offers             |
| `MyInfo.jsx`            | User data with 2 options: update info & delete account |
| ❓ `FilterBar.jsx`      | Filters requests by category/zip code                  |

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