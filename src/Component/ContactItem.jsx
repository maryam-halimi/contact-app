import React from 'react'
import styles from './ContactItem.module.css'

function ContactItem({data:{id, name,lastName,email,phone},
    deleteHandler ,editHandler }) {
  return (
    <li className={styles.item}  key={id}>
    <p>
     {name} {lastName}
    </p>
    <p>
      {email}
    </p>
    <p>
      {phone}
    </p>
    <button onClick={ () => deleteHandler(id) } >trash</button>
    <button onClick={ () => editHandler({id, name, lastName, email, phone}) } >edit</button>


  </li>
  )
}

export default ContactItem