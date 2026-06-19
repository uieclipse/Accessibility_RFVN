# 🚀 How to Run Locally - Complete Guide

**Step-by-step instructions to run the Accessibility Toolkit on your computer.**

---

## 📋 Prerequisites (What You Need)

Before starting, make sure you have:

### Required:
- ✅ **Computer** (Windows, Mac, or Linux)
- ✅ **Text Editor** - VS Code, Sublime, or any editor
- ✅ **Web Browser** - Chrome, Firefox, Safari, Edge
- ✅ **ZIP extractor** - Built into most computers

### For React/Full Toolkit (Optional):
- ✅ **Git** - For version control
- ✅ **Node.js** - For npm packages
- ✅ **npm** - Comes with Node.js

---

## 🎯 Option 1: Fastest Way (5 Minutes)

### Just Use the Component (No Setup Required!)

**Step 1: Download & Extract**
```
1. Download: Accessibility-Complete.zip
2. Right-click → Extract All
3. Open the folder
```

**Step 2: Choose Your Component**

**For React Projects:**
```
📁 examples/
  └─ AccessibilityMenuConfigurable.tsx
```

**For Vanilla JavaScript:**
```
📁 examples/
  └─ accessibility-menu-configurable.js
```

**Step 3: Copy File**
```
Copy the chosen file to your project folder
```

**Step 4: Use in Your Code**

**React:**
```jsx
import AccessibilityMenuConfigurable from './AccessibilityMenuConfigurable';

export default function App() {
  return (
    <>
      <AccessibilityMenuConfigurable />
      {/* Your app */}
    </>
  );
}
```

**Vanilla JavaScript:**
```html
<script src="accessibility-menu-configurable.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    new AccessibilityMenuConfigurable().init();
  });
</script>
```

**Step 5: Test in Browser**
```
Open your website
Click ♿ button
Should see menu!
```

✅ **Done! That's it!**

---

## 🛠️ Option 2: Run Full Toolkit (Requires Node.js)

### For Developers Who Want Everything

**Step 1: Install Node.js**

Download from: https://nodejs.org/

Choose "LTS" (Long Term Support) version

**Step 2: Extract Project**
```bash
# Extract the ZIP file
# Open terminal/command prompt in extracted folder
```

**Step 3: Install Dependencies**
```bash
npm install
```

This downloads all required packages (~2 minutes)

**Step 4: Run Development Server**
```bash
npm run dev
```

You should see:
```
Local:      http://localhost:3000
VITE v5... ready in XXX ms
```

**Step 5: Open in Browser**

Go to: `http://localhost:3000`

You should see the example page with ♿ button!

---

## 💻 Windows Users: Step-by-Step

### If You've Never Used Command Line

**Step 1: Download Files**
```
1. Go to your Downloads folder
2. Download Accessibility-Complete.zip
3. Right-click it
4. Choose "Extract All"
5. Click "Extract"
```

**Step 2: Open Command Prompt**
```
1. Press: Windows key + R
2. Type: cmd
3. Press: Enter
```

**Step 3: Navigate to Folder**
```bash
# Type this and press Enter:
cd Downloads\Accessibility-

# You should see: C:\Users\YourName\Downloads\Accessibility->
```

**Step 4: Check Node.js Installation**
```bash
# Type this and press Enter:
node --version

# You should see: v18.0.0 (or similar)
# If error: Install Node.js first from nodejs.org
```

**Step 5: Install Packages**
```bash
npm install
```

Wait for it to finish (you'll see the folder grow)

**Step 6: Start Development Server**
```bash
npm run dev
```

**Step 7: Open Browser**
```
Copy the localhost URL from terminal
Paste in browser address bar
Hit Enter
```

**You're running locally!** ✅

---

## 🍎 Mac Users: Step-by-Step

### Using Terminal

**Step 1: Extract Files**
```
1. Download Accessibility-Complete.zip
2. Double-click to extract
3. Opens automatically
```

**Step 2: Open Terminal**
```
Press: Command + Space
Type: Terminal
Press: Enter
```

**Step 3: Navigate to Folder**
```bash
cd ~/Downloads/Accessibility-
```

**Step 4: Check Node.js**
```bash
node --version

# If not found, install from nodejs.org
```

**Step 5: Install Packages**
```bash
npm install
```

**Step 6: Start Server**
```bash
npm run dev
```

**Step 7: Open Browser**
```
Copy localhost URL
Paste in browser
```

**Done!** ✅

---

## 🐧 Linux Users: Step-by-Step

### Ubuntu/Debian

**Step 1: Install Node.js**
```bash
sudo apt update
sudo apt install nodejs npm
```

**Step 2: Extract Files**
```bash
cd ~/Downloads
unzip Accessibility-Complete.zip
cd Accessibility-
```

**Step 3: Install Packages**
```bash
npm install
```

**Step 4: Start Server**
```bash
npm run dev
```

**Step 5: Open Browser**
```
Go to: http://localhost:3000
```

**Done!** ✅

---

## 📚 Available Commands

Once you have it running:

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Type check
npm run type-check

# View all commands
npm scripts
```

---

## 🧪 What You Can Do Locally

### 1. **Test the Component**
- Click ♿ button
- Adjust all 12 features
- See changes live

### 2. **Modify Code**
- Edit component file
- Changes reload automatically
- Experiment freely

### 3. **View Examples**
- Look at example files
- Run them locally
- Understand how they work

### 4. **Test on Mobile**
```bash
# When running locally, see in terminal:
# Local:   http://localhost:3000
# Network: http://192.168.x.x:3000

# Go to Network URL on your phone
# Website opens on phone!
```

### 5. **Use Browser DevTools**
```
Press: F12 (Windows/Linux)
Press: Command+Option+I (Mac)

# See:
# - localStorage settings
# - CSS applied
# - JavaScript console
# - Errors (if any)
```

---

## 🔍 Troubleshooting

### Problem: "npm command not found"
**Solution:** Install Node.js from nodejs.org

### Problem: "Port 3000 already in use"
**Solution:** 
```bash
# Use different port:
npm run dev -- --port 3001
```

### Problem: "Module not found"
**Solution:**
```bash
# Delete node_modules and reinstall:
rm -rf node_modules
npm install
```

### Problem: "Changes not showing"
**Solution:**
```
1. Hard refresh browser: Ctrl+Shift+R (Windows/Linux)
2. Hard refresh browser: Cmd+Shift+R (Mac)
3. Close and reopen browser
```

### Problem: "Can't see localhost"
**Solution:**
```
Make sure development server is running
Look for "Local: http://localhost:3000" message
Check you typed the URL correctly
```

---

## 📁 Project Structure (Local)

```
Accessibility-/
│
├── examples/
│   ├── AccessibilityMenuConfigurable.tsx    ← React version
│   ├── accessibility-menu-configurable.js   ← Vanilla JS version
│   ├── AccessibilityMenuExample.tsx         ← React demo
│   └── (5 more examples)
│
├── src/
│   ├── config/          ← Configuration
│   ├── react/           ← React components
│   └── utils/           ← Utility functions
│
├── package.json         ← Dependencies list
├── tsconfig.json        ← TypeScript config
│
└── *.md                 ← Documentation
    ├── JUNIOR_DEVELOPER_GUIDE.md  ← Read first!
    ├── START_HERE.md
    └── (11 more guides)
```

---

## 🎯 Common Local Development Tasks

### Task 1: Try the Component

```bash
# 1. Start server
npm run dev

# 2. Open browser to localhost:3000

# 3. Click ♿ button

# 4. Try each feature
```

### Task 2: Edit Component

```bash
# 1. Open: examples/AccessibilityMenuConfigurable.tsx

# 2. Find: button style
  style={{
    background: '#2563eb',  ← Change this color
  }}

# 3. Change to: background: '#ff0000' (red)

# 4. Save file

# 5. Browser auto-refreshes!

# 6. Button now red!
```

### Task 3: Add Custom Features

```typescript
// In AccessibilityMenuConfigurable.tsx

// Add new setting to interface
interface AccessibilitySettings {
  // ... existing settings
  myNewFeature: boolean;  ← Add this
}

// Add to defaults
const defaultSettings: AccessibilitySettings = {
  // ... existing settings
  myNewFeature: false,    ← Add this
};

// Add UI control
<label>
  <input
    type="checkbox"
    checked={settings.myNewFeature}
    onChange={(e) => handleSettingChange('myNewFeature', e.target.checked)}
  />
  My New Feature
</label>

// Add effect
if (features.myNewFeature && newSettings.myNewFeature) {
  // Apply effect
}
```

### Task 4: View Storage

```bash
# 1. Open browser DevTools (F12)

# 2. Go to: Application tab

# 3. Look for: localStorage

# 4. Find: a11y-settings

# 5. See all saved settings!
```

---

## 📱 Testing on Phone/Tablet

### Local Network Access

```bash
# When you run: npm run dev

# You'll see something like:
Local:   http://localhost:3000
Network: http://192.168.1.100:3000

# On your phone:
# 1. Open browser
# 2. Go to: http://192.168.1.100:3000
# 3. Website appears on phone!
# 4. Test on mobile screen
```

### Best Phones to Test

- ✅ iPhone/iPad
- ✅ Android phones
- ✅ iPad tablets
- ✅ Any device on same WiFi

---

## 🚀 From Local to Production

### Step 1: Build for Production
```bash
npm run build
```

Creates optimized version in `dist/` folder

### Step 2: Test Production Build
```bash
npm run preview
```

Shows how it will look in production

### Step 3: Deploy
```bash
# Push to GitHub
git push origin your-branch

# Deploy to GitHub Pages, Vercel, etc.
# See GITHUB_DEPLOYMENT_DEV_GUIDE.md
```

---

## ✅ Success Checklist

```
Running Locally:
☐ Extracted ZIP file
☐ Opened terminal/command prompt
☐ Navigated to Accessibility- folder
☐ Ran: npm install
☐ Ran: npm run dev
☐ Opened: http://localhost:3000
☐ See ♿ button
☐ Click button → Menu opens
☐ Adjust settings → Page changes
☐ Settings save (close/reopen)

Customizing:
☐ Edited component file
☐ Saved changes
☐ Browser auto-refreshed
☐ Changes appear immediately

Testing:
☐ Tested on desktop browser
☐ Tested on mobile device
☐ Tested all 12 features
☐ Tested keyboard navigation
☐ Tested localStorage

Ready to Deploy:
☐ Built for production (npm run build)
☐ No errors in console
☐ All features working
☐ Ready to push to GitHub
```

---

## 💡 Pro Tips for Local Development

### Tip 1: Auto-Reload
```
Development server automatically reloads
when you save files
No manual refresh needed!
```

### Tip 2: Hot Module Replacement (HMR)
```
Component changes appear instantly
You don't lose state
Perfect for rapid development
```

### Tip 3: Use DevTools
```
F12 opens Browser DevTools
You can:
- See errors
- Check localStorage
- Inspect elements
- Debug JavaScript
```

### Tip 4: Terminal Stays Open
```
Keep terminal open while developing
It shows:
- Server status
- Errors
- Build progress
```

### Tip 5: Multiple Browsers
```
Test in:
- Chrome
- Firefox
- Safari
- Edge

Run once, test everywhere!
```

---

## 🔗 Useful Local URLs

| URL | Purpose |
|-----|---------|
| `http://localhost:3000` | Your website |
| `http://localhost:3000/api` | API endpoints |
| `http://192.168.x.x:3000` | Mobile testing |
| `http://localhost:5173` | Alternative port |

---

## 📚 When You're Ready to Stop

```bash
# To stop development server:
Press: Ctrl+C (Windows/Linux/Mac)

# You'll see:
$ npm run dev
  ✓ ...
  VITE ready in XXX ms
  ^C

# Terminal is back to normal
```

---

## 🎓 Next Steps After Running Locally

1. **Explore Examples**
   ```
   Open: examples/AccessibilityMenuExample.tsx
   See how it's used
   ```

2. **Read Code Comments**
   ```
   Component file has comments
   Explains each section
   ```

3. **Modify and Experiment**
   ```
   Change colors
   Change features
   Add your own code
   See what happens
   ```

4. **Test Everything**
   ```
   Try all 12 features
   Test on different devices
   Use DevTools
   ```

5. **Read Advanced Guides**
   ```
   USAGE_GUIDE.md
   ACCESSIBILITY_MENU_SETUP.md
   SOURCE CODE
   ```

---

## 🎉 You're Ready!

You now know how to:
- ✅ Run the project locally
- ✅ Test the component
- ✅ Edit code
- ✅ See changes instantly
- ✅ Test on different devices
- ✅ Build for production

**Time to start building!** 🚀

---

## 📞 Still Need Help?

1. **Check Troubleshooting** section above
2. **Look at Examples** in examples/ folder
3. **Read JUNIOR_DEVELOPER_GUIDE.md** for concepts
4. **Check README.md** for API docs
5. **Use Browser DevTools** (F12) to debug

---

## 🌟 Remember

The best way to learn is by doing:

1. Make changes locally
2. See results immediately
3. Learn from mistakes
4. Celebrate successes
5. Keep building!

**Happy coding!** ♿🚀
