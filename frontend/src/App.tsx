import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './stores/authStore';
import { useThemeStore } from './stores/themeStore';
import { Layout } from './components/layout/Layout';
import { Home } from './screens/Home';
import { Menu } from './screens/Menu';
import { Cart } from './screens/Cart';
import { Orders } from './screens/Orders';
import { Profile } from './screens/Profile';
import { Login } from './screens/auth/Login';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  const { isAuthenticated, loadUser } = useAuthStore();
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route 
              path="/orders" 
              element={isAuthenticated ? <Orders /> : <Navigate to="/auth/login" />} 
            />
            <Route 
              path="/profile" 
              element={isAuthenticated ? <Profile /> : <Navigate to="/auth/login" />} 
            />
          </Route>
        </Routes>
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
              color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A',
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
