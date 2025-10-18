# Rabbit Breeding Manager

A comprehensive web application for managing a rabbit breeding operation on a homestead. Track rabbits, breeding schedules, litters, events, finances, and local fairs.

![React](https://img.shields.io/badge/React-18.x-blue)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Rabbit Management** - Track individual rabbits with breed, age, gender, and health status
- **Breeding Schedules** - Plan and monitor breeding pairs with expected kindling dates
- **Litter Tracking** - Record births, kit counts, and survival rates
- **Event Logging** - Track deaths, sales, and other important events
- **Fair Calendar** - Keep track of local fairs for breeding opportunities
- **Financial Management** - Monitor income from sales and expenses for feed/supplies
- **Dashboard Analytics** - View key metrics and profitability at a glance

## Tech Stack

- **Frontend**: React 18 with Hooks
- **Styling**: Custom CSS with modern design patterns
- **Icons**: Lucide React
- **State Management**: React useState (in-memory storage)
- **Build Tool**: Vite

## Screenshots

![Dashboard View](screenshots/dashboard.png)
*Main dashboard showing key statistics*

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/clfarr/rabbit-breeding-manager.git
   cd rabbit-breeding-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Project Structure

```
rabbit-breeding-manager/
├── public/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── .gitignore
├── package.json
├── vite.config.js
├── index.html
└── README.md
```

## Usage

### Adding Rabbits
1. Click "Add Rabbit" button
2. Fill in rabbit details (name, breed, gender, birth date)
3. Click "Save"

### Scheduling Breeding
1. Navigate to "Breeding" tab
2. Click "Schedule Breeding"
3. Select dam (mother) and sire (father)
4. Enter breeding date and expected kindling date
5. Click "Save"

### Recording Litters
1. Navigate to "Litters" tab
2. Click "Record Litter"
3. Select the breeding pair
4. Enter birth date and kit counts
5. Click "Save"

### Tracking Finances
1. Navigate to "Finances" tab
2. Click "Add Transaction"
3. Enter transaction details (income or expense)
4. View financial summary at the top

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

## Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy (automatic configuration for Vite)

### Deploy to Netlify
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect your repository
4. Build command: `npm run build`
5. Publish directory: `dist`

## Future Enhancements

- [ ] Data persistence with localStorage
- [ ] Data export to CSV/PDF
- [ ] Photo upload for rabbits
- [ ] Weight tracking with charts
- [ ] Pedigree visualization
- [ ] Print-friendly reports
- [ ] Mobile responsive improvements
- [ ] Dark mode theme

## Development

This project was built as a portfolio piece to demonstrate:
- React component architecture and hooks
- State management patterns
- CSS styling and responsive design
- CRUD operations
- User interface design
- Real-world problem-solving for agriculture/small business

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

**Carrie Farr**  
Email: carrielouisefarr@gmail.com  
GitHub: [@clfarr](https://github.com/clfarr)  
Project Link: [https://github.com/clfarr/rabbit-breeding-manager](https://github.com/clfarr/rabbit-breeding-manager)

## Acknowledgments

- Built for homestead rabbit breeders
- Inspired by Everbreed and similar breeding management tools
- Icons by [Lucide](https://lucide.dev/)
- Created as a student project for software engineering coursework

---

## Quick Start Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
