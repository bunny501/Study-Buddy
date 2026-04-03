# 🚀 Study Buddy

## 🧾 Overview

**Study Buddy** is a full-stack peer-to-peer collaborative learning platform designed to enhance student interaction and group learning — without relying on AI automation.

It focuses on **real human collaboration** through notes, discussions, groups, live tests, and competitive learning features.

---

## 🎯 Core Idea

A platform where students can:

* 📒 Upload and explore notes
* 🧠 Highlight and discuss specific parts of content
* 👥 Form trusted study groups
* 🤝 Match with study partners
* 🧪 Take live peer-to-peer tests
* ⚔️ Compete in group battles
* 💬 Discuss doubts and concepts

---

## 🧱 Tech Stack

### Frontend

* React.js
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB (or in-memory for initial stages)

### Real-Time

* Socket.io

### Deployment

* Frontend → Vercel
* Backend → Render
* Database → MongoDB Atlas

---

## ✨ Features

### 🔐 Authentication

* Simple username-based login/signup
* Minimal and clean UI

---

### 📊 Dashboard

* Sidebar navigation layout
* Displays:

  * Recent notes
  * Active groups
  * Notifications (🔴 badge system)

---

### 📒 Notes System

* Upload notes with:

  * Title
  * Subject
  * Content
* Card-based UI with hover preview
* Quick access to summaries

---

### 🧠 Confusion Tagging System (Core Feature)

* Select any text in notes and tag it:

  * ❓ Confusing (Red highlight)
  * ⚠️ Important (Yellow highlight)
  * 💡 Insight (Blue highlight)

* Automatically creates:

  * 💬 Discussion threads
  * Reply system
  * Mark as resolved ✅
  * Filter by tag type

---

### 👥 Groups (Trust-Based System)

* Join via invite only
* Create private groups

**Inside Group:**

* 💬 Chat
* 📒 Shared Notes
* 📋 Tasks (Pending / Completed)

---

### 💬 Real-Time Chat System

* One-to-one chat
* Group chat
* Tag-based discussions
* Test discussions

Powered by **Socket.io**

---

### 🤝 Partner Match System

* Match based on:

  * Subject
  * Availability

**Flow:**
Request → Discussion → Accept → Friends

After matching:

* Private chat
* Take tests together
* Create private groups

---

### 🧪 Live Test System

* Two users create and attempt tests
* Supports:

  * MCQs
  * Timer-based tests

**After Test:**

* Score comparison
* Answer analysis
* Discussion chat

---

### ⚔️ Battle of Groups (Main Feature 🔥)

* Group vs Group competition
* Topic-based MCQ battles

**Includes:**

* Timer
* Leaderboard
* ⭐ Star rating system
* Difficulty levels:

  * Beginner
  * Intermediate
  * Advanced

---

### 🧠 Post-Battle Discussion

* Auto-generated discussion room

Tabs:

* 💬 General Chat
* ❓ Question-wise discussions
* 💡 Insights with upvotes 👍

---

### ❓ Doubt System

* Post doubts with:

  * Topic
  * Description

**Smart Notifications:**

* Only visible to:

  * Friends
  * Same branch
  * Same subject interest

---

### 👤 Profile Page

* Personal details
* Friends list
* Progress tracking:

  * Notes uploaded
  * Tests taken
  * Tasks completed
* Doubts posted

---

## ⚙️ Backend APIs

APIs are built for:

* Users
* Notes
* Groups
* Messages
* Tests
* Battles
* Doubts

---

## 🗂️ Project Structure

```
/frontend
  /components
  /pages

/backend
  /routes
  /controllers
  /models

/socket
```

---

## 🎨 UI/UX Design

* Clean modern dashboard UI
* Light / Dark mode toggle 🌙
* Card-based layout
* Rounded corners & soft shadows
* Smooth hover interactions
* Sidebar navigation

---

## 🚀 Deployment

| Service  | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Render        |
| Database | MongoDB Atlas |

---

## 👥 Team Collaboration

This project was developed as part of a **hackathon in a team environment**, focusing on:

* Real-time collaboration features
* Scalable backend architecture
* Clean UI/UX design

---

## 📌 Future Improvements

* Advanced analytics for learning progress
* Better recommendation system (non-AI based logic)
* Mobile app version
* Improved real-time performance

---

## 📬 Contact

* GitHub: https://github.com/bunny501
* LinkedIn: https://www.linkedin.com/in/rakesh-sainatha-reddy-bandi

---

⭐ *If you like this project, consider giving it a star!*
