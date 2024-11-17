import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import GuestRoutes from './routesProtection/GuestRoutes';
import Login from './views/login/Login'
import Home from './views/home/Home'
import Recipe from './views/recipe/Recipe'
import Profile from './views/profile/Profile'
import ProtectedRoutes from './routesProtection/ProtectedRoutes';
import NewRecipe from './views/recipe/NewRecipe';
import EditRecipe from './views/recipe/EditRecipe';
import { NewRecipeContextProvider } from './contexts/NewRecipeContextProvider';
import CustomNavbar from './components/Navbar/CustomNavbar';
import { useContext } from 'react';
import { LoginContext } from './contexts/LoginContextProvider';
import CustomFooter from './components/Footer/CustomFooter';

function App() {
  const {token} = useContext(LoginContext)
  return (
    <>
      
      <BrowserRouter>
        {token && <CustomNavbar></CustomNavbar>}
        <Routes>
          <Route element={<GuestRoutes/>}>
            <Route path='/api/login' element={<Login />} />
          </Route>
          <Route element={<ProtectedRoutes/>}>
            <Route path='/' element={<Home />}/>
            <Route path='/api/recipe/:recipeId' element={<Recipe />}/>
              <Route path='/api/recipe/newRecipe' element={
                <NewRecipeContextProvider>
                  <NewRecipe />
                </NewRecipeContextProvider>    
                }/>
              <Route path='/api/recipe/editRecipe/:recipeId' element={
                <NewRecipeContextProvider>
                <EditRecipe />
              </NewRecipeContextProvider>    
              }/>
            <Route path='/api/profile/:profileId' element={<Profile />}/>
          </Route>
        </Routes>
        {token && <CustomFooter />}
      </BrowserRouter>
    </>
  );
}

export default App;
