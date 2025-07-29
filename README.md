# 📝 Note Taking App

A full-stack note-taking application built using the latest technologies. Users can register using **Email + OTP** or **Google OAuth**, 
and securely create or delete personal notes. This project follows modern practices, is fully responsive, and has been deployed to the cloud.

---

## 🚀 Live URLs

 [https://note-taking-app](https://note-taking-sandy-ten.vercel.app/)


---

## 🧰 Tech Stack

| Layer     | Tech Used                     |
|-----------|-------------------------------|
| Frontend  | ReactJS (TypeScript), Tailwind CSS |
| Backend   | Node.js (TypeScript), Express |
| Database  | MongoDB (Mongoose)            |
| Auth      | JWT, Google OAuth 2.0, OTP via Email |
| Deployment| Render + vercel (Cloud Hosting)        |
| Versioning| Git + GitHub                  |

---

## ✨ Features

- 🔐 **User Authentication**
  - Sign Up with Email + OTP verification
  - Sign In with Google OAuth
  - JWT-based token authentication

- 📝 **Note Management**
  - Create personal notes
  - Delete notes
  - Notes are user-specific

- 📱 **UI & UX**
  - Mobile responsive design
  - Animated buttons and clean layout using Tailwind CSS

- ☁️ **Cloud Deployment**
  - frontend on vercel & backend hosted on Render

---

## 🛠️ Getting Started (Local Setup)

### 1. Clone Repository

```bash
git clone https://github.com/sahbadal/note-taking.git

cd backend
npm install

create .env file
PORT=your_port
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EXPIRATION_TIME=time
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=your_url


Start : npm run dev

cd ../frontend
npm install

create .env

Start : npm run dev

```

Made with ❤️ By Badal sah
