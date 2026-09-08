import {memo} from 'react'

const MovieCount = memo(function MovieCount({count, handleMovieCountClick}) {
    console.log("Count rendered")
  return (
    <div>
        <h2>Movies found: {count}</h2>
        <button onClick={handleMovieCountClick}>Check Count</button>
    </div>
  )
})

export default MovieCount