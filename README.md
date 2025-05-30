# MentorHIT - AI Academic Advisor

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### 🎓 Your AI Academic Advisor for Holon Institute of Technology

An application providing personalized academic guidance, course recommendations, and career planning for HIT students.

---

## 🌟 Features

### 🔐 **Authentication System**
- HIT email validation (`@hit.ac.il` required)
- Mock authentication with realistic user data
- Persistent sessions with localStorage
- Professional login/signup interface

### 💬 **AI Chat Interface**
- Real-time chat simulation with typing indicators
- Intelligent response system based on keywords
- Hebrew/English bilingual support
- Message history with timestamps
- Suggested conversation starters

### 📋 **Preferences Quiz**
- Multi-step onboarding questionnaire
- Academic interests and career goals assessment
- Progress tracking with visual indicators
- Personalized recommendations based on responses

### 👤 **User Profile Dashboard**
- Academic performance tracking (GPA, courses, credits)
- Achievement showcase system
- MentorHIT usage statistics
- Preference management

### 🎨 **HIT Brand Integration**
- Official Holon Institute of Technology color palette
- Consistent design system throughout
- Professional UI/UX with modern aesthetics
- Responsive design for all device sizes

---

## 🚀 Technology Stack

### **Frontend Framework**
- **React 18.3.1** - Modern React with concurrent features
- **TypeScript 5.5.3** - Type-safe development
- **Vite 5.4.1** - Lightning-fast development server

### **Styling & UI**
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **Shadcn/ui Components** - Professional component library
- **Radix UI Primitives** - Accessible, unstyled components
- **Lucide React** - Beautiful icon library

### **State Management**
- **React Context API** - Global state management
- **React Query** - Server state management and caching
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation

### **Development Tools**
- **ESLint** - Code linting and quality
- **PostCSS & Autoprefixer** - CSS processing
- **Path Aliases** - Clean import statements (`@/`)

---

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (version 16.0 or higher)
- **npm** or **bun** package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mentorhit-academic-ai.git
   cd mentorhit-academic-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
mentorhit-academic-ai/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── auth/          # Authentication components
│   │   ├── chat/          # Chat interface components
│   │   ├── layout/        # Layout components (Sidebar, etc.)
│   │   ├── preferences/   # Preferences quiz components
│   │   ├── profile/       # User profile components
│   │   └── ui/            # Shadcn/ui reusable components
│   ├── context/           # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── ChatContext.tsx
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Top-level page components
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles with HIT branding
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

---

## 🎨 HIT Brand Colors

The application uses Holon Institute of Technology's official color palette:

```css
/* HIT Color Palette */
--hit-dark: #032F32      /* Chat bubbles, primary text */
--hit-secondary: #007377  /* Sidebar, interface elements */
--hit-primary: #0097A7    /* Headlines, buttons, accents */
--hit-light: #E8F7F8     /* Backgrounds, light elements */
```

---

## 🔧 Key Components

### **AuthContext**
Manages user authentication state, login/logout functionality, and session persistence.

### **ChatContext** 
Handles chat messages, AI response simulation, and conversation state management.

### **LoginForm**
Professional authentication interface with HIT email validation and form handling.

### **ChatInterface**
Real-time chat simulation with typing indicators, message history, and suggested prompts.

### **PreferencesQuiz**
Multi-step questionnaire for personalizing the user experience based on academic interests.

### **Dashboard**
Main application layout with navigation, header, and content area management.

---

## 🌐 Demo Credentials

For testing purposes, use any email ending with `@hit.ac.il`:

- **Email**: `student@hit.ac.il`
- **Password**: Any password
- **Name**: Your preferred display name

---

## 🚀 Features in Detail

### **Smart Response System**
The AI chat uses keyword detection to provide relevant responses:
- **Electives & Data Science** → Course recommendations
- **Programming Languages** → Advanced course suggestions  
- **Cybersecurity** → Security career path guidance
- **Grades & GPA** → Academic improvement strategies

### **Responsive Design**
- Mobile-first approach with Tailwind CSS
- Adaptive layouts for all screen sizes
- Touch-friendly interface elements
- Consistent experience across devices

### **Accessibility**
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- High contrast color schemes
- Focus management

---

## 🔮 Future Enhancements

- [ ] Real AI integration (OpenAI, Anthropic, etc.)
- [ ] Multi-language support (Hebrew/English toggle)
- [ ] Real-time notifications
- [ ] Course scheduling integration
- [ ] Grade tracking and analytics
- [ ] Peer collaboration features
- [ ] Mobile app version

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Team MentorHIT** - Hackathon Project for Holon Institute of Technology

---

## 🙏 Acknowledgments

- **Holon Institute of Technology** for inspiration and branding
- **Shadcn/ui** for the component library
- **Tailwind CSS** for the styling framework
- **React Community** for excellent documentation and resources

---

**Built with ❤️ for HIT students**

© 2024 Team MentorHIT. All rights reserved.
