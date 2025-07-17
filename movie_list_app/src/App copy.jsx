import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// The App component is the main component of your React application.
// It uses the useState hook to manage the count state.
// Class components are not used in this example, but you can convert it to a class component if needed.  

//class ClassComponent extends React.Component {
//  render(){ // This is a simple class component example.
//    return (
//      <div>
//        <h1>Hello from Class Component</h1>
//      </div>
//    )      

//  }
//}

// Amb els components antics necessitem impotar React i crear una classe que hereti de React.Component.

//Props are used to pass data to components, and state is used to manage local data within a component.
function App1() {} // This is a functional component 
const Card = ({ title }) => {
  const [hasLiked, setHasLiked] = useState(false); // useState is a React hook that allows you to add state to functional components.
  //hasLiked is a state variable that can be used to track whether the user has liked something.
  //setHasLiked is a function that can be used to update the hasLiked state variable
  //it is better to define the state variable inside card component to avoid unnecessary re-renders of the App component.
  //state is not persistent across re-renders, so it will reset to its initial value each time the component is rendered.
  useEffect (()=> {
    console.log(`${title} has been liked: ${hasLiked}`); // This will log a message to the console when the component mounts or updates.
    // This effect runs when the component mounts or updates.
    // You can perform side effects here, such as fetching data or subscribing to events.
    
  },[hasLiked]
  )
  useEffect (() => {
    console.log(`Component ${title} mounted`); // This will log a message to the console when the component mounts.
    return () => {
      console.log(`Component ${title} unmounted`);
     }
     }
    )
      // This will log a message to the console when the component unmounts.
      // This cleanup function runs when the component unmounts.
      // You can perform cleanup tasks here, such as unsubscribing from events or cancelling
  const [count, setCount] = useState(0); // This is another state variable that can be used to track the count of something.  

  return (
    <div className='card' onClick={() => setCount((prevState) => prevState + 1)}>

      <h2>{title} <br/>{ count ? count : null}</h2>
      <button onClick={ ()=> setHasLiked(!hasLiked)}>
        {hasLiked ? '💓': '🤍'} 
      </button>
      </div>

  )
  //inline styles are used here for simplicity, but you can also use CSS classes. 
  //inline styles are the preference when combined with CSS modules or styled-components.
} // This is another functional component that can be used within the App component.

const App = () => {

  return (
    <div className='card-container'>
    <h2>Functional Arrow Component</h2>
    <Card title="Star Wars" rating='5' isCool={true} actors={[{name:'Actors'}]}/>
    <Card title="Lion King"/>
    <Card title="Avatar"/>
    </div>

  )
} // This is another functional component that serves as the main entry point for your React app.


export default App
