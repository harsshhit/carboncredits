# 🌱 Carbon Credits Dashboard

A modern, responsive dashboard for tracking and managing carbon credit retirement certificates with full transparency. Built with React, TypeScript, and Vite.

## 🚀 Features

- **Search & Filter**: Search by project name and filter by vintage year
- **Status Tracking**: Visual status badges for Active (green) and Retired (gray) credits
- **Certificate Download**: Generate and download retirement certificates as HTML files
- **Responsive Design**: Modern UI with royal black and golden theme
- **Performance Optimized**: Pagination for handling large datasets (10,000+ credits)
- **Real-time Statistics**: Live counts of active, retired, and total credits

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS with CSS Variables for theming
- **State Management**: React Hooks (useState, useMemo, useEffect)

## 🏃‍♂️ Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SearchBar.tsx   # Search and filter controls
│   ├── CreditCard.tsx  # Individual credit display
│   └── Pagination.tsx  # Pagination controls
├── types/              # TypeScript type definitions
│   └── carbonCredit.ts # Carbon credit interfaces
├── data/               # Mock data
│   └── carbonCredits.json
├── utils/              # Utility functions
│   └── certificateGenerator.ts
└── App.tsx             # Main application component
```

## 🎨 Design Decisions

### Main Page vs Details
- **Main Page**: Shows summary statistics and all credits in a grid layout for easy scanning
- **Details**: Individual credit information is displayed within each card to avoid navigation complexity
- **Rationale**: Users need to compare multiple credits quickly, so keeping details inline improves workflow efficiency

### Clean Design Approach
- **Color Scheme**: Strict royal black and golden theme for professional, trustworthy appearance
- **Card-based Layout**: Each credit is a distinct card with clear visual separation
- **Status Indicators**: Color-coded badges (green for Active, gray for Retired) for instant recognition
- **Typography Hierarchy**: Clear heading structure with golden accents for important information
- **Spacing**: Generous padding and margins for breathing room and readability

### Performance for 10,000+ Credits
1. **Pagination**: Only render 25-100 items per page to reduce DOM nodes
2. **Memoization**: Use React.useMemo for expensive filtering operations
3. **Virtual Scrolling**: Could implement react-window for even larger datasets
4. **Debounced Search**: Would add debouncing to search input to reduce filter operations
5. **Lazy Loading**: Could implement infinite scroll or virtual scrolling for seamless UX
6. **Caching**: Implement search result caching for repeated queries

## 🔧 Performance Optimizations Implemented

- **Pagination**: Configurable items per page (10, 25, 50, 100)
- **Memoized Filtering**: Expensive operations cached with useMemo
- **Efficient Re-renders**: Components only re-render when necessary
- **Responsive Grid**: CSS Grid with auto-fill for optimal layout

## 📄 Certificate Generation

Retirement certificates include:
- UNIC ID
- Project Name
- Vintage Year
- Status
- Retirement Timestamp
- Professional styling with company branding

## 🌐 Deployment

The application can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 📝 Reflection Questions

### How did you decide what to show on the main page vs details?

I chose to display all credit information directly on the main page within individual cards rather than creating separate detail pages. This decision was based on:

1. **User Workflow**: Carbon credit buyers typically need to compare multiple credits side-by-side
2. **Information Density**: Each credit has only 4 key fields (UNIC ID, name, vintage, status) - perfect for card layout
3. **Reduced Friction**: No navigation required to see full details
4. **Search Context**: When filtering, users can immediately see all relevant information without losing context

### What design choices did you make to keep it clean?

1. **Strict Color Palette**: Only royal black and golden colors to maintain professional appearance and avoid visual clutter
2. **Card-based Architecture**: Each credit is a distinct visual unit with clear boundaries
3. **Consistent Spacing**: Generous padding and margins using CSS custom properties for uniformity
4. **Typography Hierarchy**: Clear heading structure with golden accents for important data points
5. **Status Indicators**: Intuitive color coding (green = active, gray = retired) with consistent badge styling
6. **Minimal UI Elements**: Only essential controls visible, with progressive disclosure for advanced features

### If the system had 10,000 credits, how would you keep the dashboard fast?

1. **Pagination Implementation**: Currently supports 10-100 items per page, would extend to handle larger datasets
2. **Virtual Scrolling**: Implement react-window or react-virtualized for rendering only visible items
3. **Search Optimization**: 
   - Debounced search input (300ms delay)
   - Indexed search with libraries like Fuse.js or Elasticlunr
   - Server-side search for API integration
4. **Caching Strategy**:
   - Memoize search results
   - Cache filtered datasets
   - Implement React Query for API data management
5. **Performance Monitoring**: Add React DevTools Profiler integration to identify bottlenecks
6. **Code Splitting**: Lazy load components and implement route-based splitting
7. **Database Integration**: Move from client-side filtering to server-side with proper indexing

## 🔮 Future Enhancements

- Real-time data updates
- Advanced filtering options (by project type, region, etc.)
- Bulk certificate downloads
- Data export functionality
- User authentication and role-based access
- Integration with blockchain for immutable records
