### 📸 Application Requirements

#### 1. **Initial Prompt**

- When the app launches, it says:

  > **"Please position your face and shoulders in view."**

- If the system does not detect both the face and shoulders within **15 seconds**, it repeats:

  > **"Please position your face and shoulders in view."**

- This prompt will continue periodically until both are successfully detected.

---

#### 2. **Photo Capture Process**

- Once both the face and shoulders are detected:

  - The app begins a countdown and announces:

    > **"Preparing to take your photo. In 5, 4, 3, 2, 1..."**

  - The photo is then captured and saved automatically to the system.

  - After capturing, the app confirms with:

    > **"Your photo has been taken and saved to your system!"**

---

#### 3. **Detection Failure Handling**

- If the app cannot detect both the face and shoulders, the photo will **not** be taken.

- If visibility is lost during the countdown, the capture process is canceled, and the app says:

  > **"Sorry, I am unable to detect your face and shoulders. Please adjust your position."**

---

#### 4. **Retake Option**

- A **"Retake Photo"** button is available for the user.

- When clicked, the process restarts from **Step 1**.
- Note: The **Retake Photo** option is only available **after** a photo has been taken.
  It is **disabled** during the photo-taking process.
