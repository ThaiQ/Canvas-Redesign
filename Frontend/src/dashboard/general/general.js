import React, { useEffect } from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { Link } from 'react-router-dom'
import '../dashboard.css'

const General = (props) => {

  const { todo } = require('../../Config/data')

  useEffect(() => { }, [todo])

  function countTodo() {
    let count = todo.length
    for (let i = 0; i < todo.length; i++) {
      if (todo[i].done === true) count--
    }
    return count
  }

  let items = [
    {
      text: 'Announcement',
      count: 6,
      href: '/dashboard'
    },
    {
      text: 'Todo',
      count: countTodo(),
      href: '/dashboard'
    },
    {
      text: 'Inbox',
      count: 6,
      href: '/dashboard'
    },
    {
      text: 'Events',
      count: 6,
      href: '/dashboard'
    }
  ]

  return (
    <ListGroup id='dashb-general'>
      <h2 id='dashb-sub'>General</h2>

      {items.map((item, ind) => {
        return <Link to={item.href} className='dash-general-ani'>
          <ListGroupItem key={ind} className="justify-content-between">{item.text} <Badge pill>{item.count == 0 ? 0 : item.count}</Badge></ListGroupItem>
        </Link>
      })
      }
    </ListGroup >
  );
}

export default General;