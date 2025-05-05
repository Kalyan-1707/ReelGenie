# AI-Driven Development Plan: ReelGenie + ThreadGenie

As an AI, I was tasked with planning and developing a tool for creative storytelling. The initial vision was to build an AI-powered tool focused on video (ReelGenie), but this later pivoted to Twitter thread generation (ThreadGenie). This document outlines the planning process, system architecture, user personas, use cases, challenges overcome, and the AI toolchain used.

---

## 1. Project Overview

**ReelGenie** enables users to generate cinematic scene prompts and illustrations for storytelling.

**ThreadGenie** allows users to turn those prompts into compelling Twitter threads with AI-generated text and images, and post them directly via Twitter’s API.

This project was entirely built with AI assistance — primarily Roocode and Gemini.

---

## 2. System Architecture

### Frontend (React + Vite + Tailwind)
- `CreateXPost`: Accepts scene prompts and number of tweets to generate.
- `Thread`: Displays generated content and allows publishing to Twitter.
- `TweetThread`: Simulates tweet visuals using `react-tweet`.
- Uses shimmer/skeleton loaders during image fetch.

### Backend (Node.js + Express)
- `/generate-thread-script`: Uses Gemini for multi-part tweet script generation.
- `/generate-image`: Converts scene or tweet prompts into anime-style images via API.
- `/postTweetThread`: Authenticates and publishes threads with retry/report logic.

---

## 3. User Personas

### 🎨 Lena – The Visual Storyteller
- Wants to create illustrated short scenes or storyboards.
- Uses ReelGenie to generate frame-by-frame scripts and visuals.

### 🧵 Jay – The Twitter Creator
- Shares serialized micro-stories on X (Twitter).
- Uses ThreadGenie to generate and post AI-powered threads that engage readers.

---

## 4. Expanded Use Cases

### 🎬 Use Case: Create Illustrated Storyboard (ReelGenie)

**Actor**: Lena, the Storyteller  
**Precondition**: User lands on "Try ReelGenie for Free" page.  
**Main Flow**:
1. Lena enters a scene idea like "A lost boy in a magical forest."
2. Gemini generates a structured 4-frame script with:
   - Visual description
   - Voiceover line
   - Music tone
   - Transitions
3. Each frame's visual is used to generate anime-style artwork via the image API.
4. The storyboard is previewed on screen with smooth loading states.
5. Lena downloads images or re-generates if needed.

**Postcondition**: Lena receives a mini storyboard ready for concept art or video prototyping.

---

### 🧵 Use Case: Publish Thread with Images (ThreadGenie)

**Actor**: Jay, the Indie Writer  
**Precondition**: User navigates to the "Create X Post" page.  
**Main Flow**:
1. Jay enters a short story idea: “Chapter 1: A girl discovers her shadow has a mind of its own.”
2. Selects number of tweets: 4
3. Gemini generates a compelling tweet thread with natural progression and hooks.
4. Images are generated for each tweet using anime-style prompts.
5. Jay reviews the output and clicks "Publish to Twitter."
6. API authenticates, publishes each tweet with media, and logs success/failure.
7. Thread is live with visuals and narrative flow.

**Postcondition**: A tweet thread is published, increasing Jay’s engagement and followers.

---

## 5. Challenges and Pivots

### 🚧 Challenge 1: Video generation APIs were expensive
**🔁 Pivot**: Shifted focus to images + text format suitable for threads and manga-like experiences.

### 🎨 Challenge 2: Inconsistent AI image quality
**✅ Fix**: Used FLUX.1 models with prompt tuning and consistent seeds for better style control.

### 🔐 Challenge 3: Twitter API errors (401/403/429)
**✅ Fix**: Secured correct app credentials, added retry logic, and added status logs per tweet.

---

## 6. AI Tools & Technologies Used

| Tool          | Purpose                                 |
|---------------|-----------------------------------------|
| Roocode       | UI and backend generation               |
| Gemini (Google AI) | Prompt and script generation       |
| Twitter API v2| Tweet publishing                        |
| react-tweet   | UI simulation of tweets                 |
| shadcn/ui + Tailwind CSS | Component styling            |
| Vite          | Frontend tooling                        |
| Framer Motion | UI animations                           |
| Sonner        | Notification system                     |

---

## 7. Final Deliverables

✅ Working MVP with:

- [x] ReelGenie: Scene → script → image generation flow  
- [x] ThreadGenie: Prompt → thread → publish to X  
- [x] Tweet-style UI with skeleton loading  
- [x] Retry-safe API for Twitter threads  
- [x] Deployed frontend and backend  
- [x] Documentation: `README.md`, `_prompts.pdf`, `_planning.md`
