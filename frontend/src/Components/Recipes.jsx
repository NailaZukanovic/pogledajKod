// import React, {useEffect, useState} from 'react';
// import './Recipes.css';
// import Recipe from './Recipe.css';
// import Axios from "axios";

// const Recipes = () => {

//   const APP_ID = 'a99bd604';
//   const APP_KEY = '801b3f6953e413a5d229de1043ba6dbd';

//   const [recipes, setRecipes] = useState([]);
//   const [search, setSearch] = useState('');
//   const [query, setQuery] = useState('');

//   const getRecipes = async () => {
//     var result = await Axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
//     console.log(result)
//     console.log(result.data.hits);
//     setRecipes([...recipes, result.data.hits])
  

//   useEffect(() => {
    
//     getRecipes();
//   }, [query]);

//   const updateSearch = e => {
//     setSearch(e.target.value);
//   }

//   const getSearch = e => {
//     e.preventDefault();
//     setQuery(search);
//     setSearch('');
//   }

//   return (
//     <div className="App">
//       <h1 className="app-title">Saerch for recipes</h1>
//       <form onSubmit={getSearch} className="search-form">
//         <input className="search-bar" type="text" value={search} onChange={updateSearch} placeholder="Enter an ingredient or a dish name" ></input>
//         <button className="search-button" type="submit">
//           Search
//         </button>
//       </form>
//       <div className="reciperesults">
//       {recipes.map(recipe => (
//         <Recipe 
//         key={recipe.recipe.label}
//         url={recipe.recipe.url}
//         title={recipe.recipe.label} 
//         calories={recipe.recipe.calories}
//         image={recipe.recipe.image}
//         ingredients={recipe.recipe.ingredients}></Recipe>
//       ))}
//       </div>
//     </div>
//   );
// }

// export default Recipes;

// // import Axios from "axios";
// // import { useState } from "react";
// // // import "./app.css";
// // // import RecipeTile from "./components/recipe-tile";

// // function Recipes() {
// //   const [query, setquery] = useState("");
// //   const [recipes, setrecipes] = useState([]);

// //   const YOUR_APP_ID = `82e453da`;
// //   const YOUR_APP_KEY = "3bb5d1a3b992f408b9003effd74c9c22";

// //   const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;

// //   const getRecipeInfo = async () => {
// //     var result = await Axios.get(url);
// //     setrecipes(result.data.hits);
// //     console.log(result.data.hits);
// //   };

// //   const onSubmit = (e) => {
// //     e.preventDefault();
// //     getRecipeInfo();
// //   };

// //   return (
// //     <div className="app">
// //       <h1 onClick={getRecipeInfo}>Food Recipe Plaza 🍔</h1>
// //       <form className="app__searchForm" onSubmit={onSubmit}>
// //         <input
// //           className="app__input"
// //           type="text"
// //           placeholder="enter ingridient"
// //           autoComplete="Off"
// //           value={query}
// //           onChange={(e) => setquery(e.target.value)}
// //         />
// //         <input className="app__submit" type="submit" value="Search" />
// //       </form>

// //       <div className="app__recipes">
// //         {/* {recipes !== [] &&
// //           recipes.map((recipe) => {
// //             return <RecipeTile recipe={recipe} />;
// //           })} */}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Recipes;