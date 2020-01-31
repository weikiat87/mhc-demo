# MHC Fullstack Demo

Sample fullstack project using following modules:

## Frontend
  - Reactjs 16.12+
  - react-bootstrap
  - react-datepicker

## Backend
  - Node
  - Express
  - Mongoose (connecting to DB)
  - Passport-Local (using DB for authentication)
  - Passport (authentication)
  - Express-Session (authentication)
  - bcrypt (didn't use it but was suppose to be used for passwords)
  - cors (security)
  - helmet (secuity)
  - dotenv (env settings)


# Pre-requirements for Demo

- Need to add SAMPLE users and event types into database first.
- Need to add .env to folder
    - PORT=3000
    - DBURI=mongodb://localhost/mhcdemo

# Building Frontend
- run yarn install client folder (only need for the first time)
- run yarn build 

# Running Demo
- run yarn install on folder (only need for the first time)
- run yarn dev (if have nodemon) or yarn start

# Assumptions Made
There were some confusion when I read the document. e.g. Who auto populate Comany Name (but there's no reference on Company Name on Company HR Admin)


User Types:
- HR Admin
- Vendor

Pages/Components:
- HR Admin Dashboard
- HR Admin Create Page
- Vendor Dashboard 
- Popup Component

Some General Assumptions Made.
- There's 2 Dashboard
    - 1 for HR Admin
    - 1 for Vendor
- HR Admin Creates Wellness Event for Vendor
- HR Admin will Tag Wellness Event to Vendor
- Vendor can APPROVE and REJECT their own event
- Each HR Admin can only see their own Events (that they created)
- Each Vendor can only see their own Events (that they are tagged)


I've also tried to create a more complex relation between the events, HR Admin, Vendor (but stopped due to time constraint)
- HR Admin will create an event and tag to an event type.
- Vendor are tagged based on event types
- Vendor can only see/approve/reject the events that belongs to the event types

# Improving the Demo
- Possible things to improve
  - e.g. didn't really handle the cookie for the login session very well 
  - separating the components for each dasboard
  - combining both dashboard together (but may be counter intuitative)
  - only can APPROVE/REJECT once (for my case it still works but will delete the fields if it changes) 
- Validating the dates for on vendor end (so that they can't have the same date)