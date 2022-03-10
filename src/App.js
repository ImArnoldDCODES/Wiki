import { useState } from 'react';

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});


  const handleSearch = async e => {
    e.preventDefault();
   if (search === '') return;
    
   const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;
 
   const response = await fetch(endpoint);
      
   if (!response.ok) {
     throw Error(response.statusText)
   }
   
   const json = await response.json();

   
   setResults(json.query.search);
   setSearchInfo(json.query.searchinfo);
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
           onChange={e => setSearch(e.target.value)}
           />
        </form>
       { (searchInfo.totalhits) ? <p>Search Results: 
         {searchInfo.totalhits}</p>
          : ''}

     </header>
    <div className="results">
      {results.map((results, i) =>{

        const url = `https://en.wikipedia.org/?curid=${results.pageid}`
        ;

        console.log(results.pageid);
        console.log(url);
        return (
          <div className="result" key={i}>
          <h3>{results.title}</h3>

          <p dangerouslySetInnerHTML=
          {{ __html: results.snippet}}></p>

          <a href={url}>Read More...</a>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default App;
