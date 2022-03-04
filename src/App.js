import { useState } from 'react';

function App() {
  const [search, setsearch] = useState("");
  const [results, setresults] = useState([]);
  const [searchInfo, setSearch] = useState({});


  const handleSearch = async e => {
    e.preventDefault();
   if (search === '') return;
    
   const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;
 
   const response = await fetch(endpoint);
     
   console.log(response);

   if (!response.ok) {
     throw Error(response.statusText)
   }
  }
  return (
     <div className="App">
    <header>
      <h1>Search Wiki</h1>
      <form className="search-box" onSubmit={handleSearch}>
        <input 
           type="search"
           placeholder="What are you looking for?"
           value={search}
           onChange={e => setsearch(e.target.value)}
           />
        </form>
        <p>Search Result: 0</p>
    </header>
    <div className="results">
      <div className="result">
        <h3>Title goes here</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, 
          adipisicing elit. Aut, accusantium!
        </p>
        <a href="#">Read More..</a>
        </div>
      </div>
    </div>
  )
}

export default App;
