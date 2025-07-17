import React from 'react'

function search({searchTerm, setSearchTerm}) {
  return (
    <div className="search">
        <div>
            <img src="./search.svg" alt="Search Icon"/>
            <input
                type="text"
                placeholder="Search for a movie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        {searchTerm}</div>
  )
}

export default search