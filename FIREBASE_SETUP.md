# Firebase Setup Guide

This app now uses Firebase Firestore for cloud data storage. Follow these steps to set up Firebase for your app.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter a project name (e.g., "rabbit-breeding-manager")
4. Follow the setup wizard (disable Google Analytics if you don't need it)

## Step 2: Enable Firestore Database

1. In your Firebase project, go to **Build → Firestore Database**
2. Click **"Create database"**
3. Select **"Start in test mode"** (we'll secure it later)
4. Choose a location closest to you
5. Click **"Enable"**

## Step 3: Get Your Firebase Configuration

1. In Firebase Console, click the **gear icon** (⚙️) → **Project settings**
2. Scroll down to **"Your apps"** section
3. Click the **Web icon** (`</>`) to add a web app
4. Register your app with a nickname (e.g., "Rabbit App")
5. Copy the `firebaseConfig` object

## Step 4: Add Configuration to Your Project

### For Local Development:

1. Create a `.env` file in the root of your project:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and paste your Firebase credentials:
   ```
   VITE_FIREBASE_API_KEY=your-api-key-here
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

3. Save the file and restart your dev server

### For Vercel Deployment:

1. Go to your Vercel project dashboard
2. Click **Settings → Environment Variables**
3. Add each variable:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
4. Click **"Save"**
5. Redeploy your app

## Step 5: Set Up Firestore Security Rules (Important!)

1. In Firebase Console, go to **Firestore Database → Rules**
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents
    // TODO: Add authentication and user-specific rules later
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click **"Publish"**

⚠️ **Note:** These rules allow anyone to read/write your data. For production, you should add authentication and user-specific rules.

## Step 6: Test Your App

1. Run `npm run dev` locally
2. Try adding a rabbit or other data
3. Check Firebase Console → Firestore Database to see your data appear in real-time!

## Collections Created

The app will automatically create these Firestore collections:
- `rabbits` - All rabbit records
- `breedings` - Breeding schedule
- `litters` - Litter records
- `events` - Deaths, sales, etc.
- `fairs` - Local fair information
- `transactions` - Financial records

## Troubleshooting

**Error: "Firebase: Error (auth/api-key-not-valid)"**
- Check that your API key is correct in `.env`
- Make sure you're using `VITE_` prefix for all variables

**No data appearing in Firestore:**
- Check browser console for errors
- Verify Firestore security rules are set correctly
- Make sure your Firebase project has Firestore enabled

**Data not syncing:**
- Check that you've added all environment variables
- Clear browser cache and reload
- Check Firebase Console for any quota limits

## Next Steps (Optional)

- Add Firebase Authentication for user login
- Set up proper security rules for multi-user access
- Enable offline persistence
- Add Firebase Storage for rabbit photos (currently using base64)
