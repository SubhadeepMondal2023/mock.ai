# 🚀 mock.ai - AI-Powered Mock Interviewer

Welcome to **mock.ai**, your AI-powered mock interview platform! 💡 Get real-time AI-generated mock interviews to improve your confidence and performance. 🎯

## Live Demo

Check out the live version of the project here: [https://mock-ai-red.vercel.app/dashboard](https://mock-ai-red.vercel.app/dashboard)

![Dashboard](https://github.com/SubhadeepMondal2023/mock.ai/blob/main/public/dashboard.png)

## 📌 What is mock.ai?

mock.ai is an AI-driven platform that simulates real interview environments, helping users prepare for job interviews with interactive, insightful feedback.

---

## ❓ Why mock.ai?

✅ **Realistic AI Interviews** - Experience AI-generated mock interviews.  
✅ **Detailed Feedback** - Receive ratings and improvement suggestions.  
✅ **Privacy Focused** - No video recordings, ensuring full privacy.  
✅ **Easy to Use** - Simple interface for seamless interview preparation.  
✅ **Interactive UI** - Navigate questions easily and review answers.  

---

## 🛠️ How to Set Up

### 1⃣ Install Dependencies

Run the following command to install all required packages:

```sh
npm install
```

### 2⃣ Run the Development Server

Start the server with:

```sh
npm run dev
```

Then open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) in your browser.

---

## 📚 How It Works

### **1. Navigate to the Dashboard**

Go to **Dashboard** → Click **"+ Add New"** to start a new mock interview session.


### **2. Enable Camera & Microphone**

Allow camera and microphone access for a fully interactive experience.

### **3. Start the Interview**

Click **"Start Interview"** to begin your AI-powered mock interview.

### **4. Answer Questions**

Click **"Record Answer"** when you are ready to respond. Use the **Next** and **Previous** buttons to navigate between questions.

### **5. Change Questions**

You can click on a question number tab to switch between different questions at any time.

### **6. End the Interview**

Once you’ve completed all questions, click **"End Interview"**.

### **7. Review Feedback & Correct Answers**

After finishing, you’ll receive a **rating** along with detailed **feedback** and the correct answers for each question.

---

## 🏰️ Architecture & Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS  
- **Authentication**: Clerk for user authentication  
- **Database**: PostgreSQL with Drizzle ORM  
- **Backend**: Serverless API functions (Next.js API routes)  
- **AI Engine**: Gemini API for interview question generation & feedback analysis  
- **Hosting**: Vercel (Frontend + API)  

---

## 🚀 Features

- AI-generated interview questions.  
- Real-time feedback and scoring.  
- Fully private: No video recordings.  
- Easy question navigation.  
- Simple and intuitive UI.  

---

## 🛢️ Deployment

Deploy using **Vercel**:

```sh
vercel deploy
```

Ensure your `.env.local` variables are configured on Vercel.

---

## 🤝 Contributing

We welcome contributions! Feel free to fork the repo, make changes, and open a pull request.

---

## 🐟 License

This project is licensed under the MIT License.

Happy Interviewing! 🎤🚀
