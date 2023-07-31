import { NavLink } from 'react-router-dom'
import styles from './NoMatch.css'

export default function NoMatch () {
  return (
    <>
      <h1>Uh-oh.</h1>
      <p>Looks like we sent you into a liminal space between beats.</p>
      <NavLink to="/">Go back home</NavLink>
    </>
  )
}