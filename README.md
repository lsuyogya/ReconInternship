# Reconwithme/Banking App

**[Go through Vue Docs](https://vuejs.org/guide/introduction.html)**

## Running the project

Install the dependencies...

```bash
npm install
```

...then start in development mode:

```bash
npm run dev
```

Navigate to [localhost:3000](http://localhost:3000). The app should be running after the build is finished.

## Project

> - Build a simple banking app consisting of login and a dashboard page using vue.

1. Make a simple login page consisting of username and password. Navigate to dashboard once user logs in.

2. Make a dashboard that has following features:

- Navbar with a logo(any), username and a logout(user should return to login page) button.
- Total balance.
- Debit and Credit buttons.
- On clicking one of the button, user can see a form with fields:
  1. Date
  2. Amount
  3. Remarks
- For debit form, user input amount is deducted from the total balance.
- For credit form, user input amount is added to the total balance.
- Table with fields:
  1. Date
  2. Remarks
  3. Amount
     that displays the data user submitted in debit or credit forms.
     > - Put red background for debit and green background for credit in the table to differentiate the data.
- Link to another page when user clicks on date of the table.
  1. User can see the expenses and earnings of that particular date in this page.

3. The total balance should be updated with user input to debit or credit.

4. Make use of localstorage as database.

## Extra Points

> - If you can make login
> - If you don't make use of any global state management.

## Note

- Make use of router provided by vue for page navigation.
- Make use of event handlers provided by vue.
