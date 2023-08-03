import {useState, useEffect} from 'react'

export function StageName (props) {
  const {name, email, isError} = useProfile(props.userId)
  if (isError) {
    return <Error/>
  }
  return (
    <>
    <div style={{'fontSize': 100}}>{name} 😼</div>
    <div style={{'fontSize': 30}}>{email}</div>
    {isError ? <Error/> : null}
    </>
  )
 }

 function Error () {
  return (
    <div style={{'color': 'red'}}>shit happened</div>
  )
 }

function useProfile (userId) {
  const [name, setName] = useState('kitty');
  const [email, setEmail] = useState(null);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => {
        if (!res.ok) {
          setIsError(true)
        }
        return res.json()
        // !res.ok ? res.json() : setIsError(true)
      })
      .then(user => {
        console.log(user)
        setName(user.name)
        setEmail(user.email)
      })
  }, [userId])

  return {
    name,
    email,
    isError
  }
}