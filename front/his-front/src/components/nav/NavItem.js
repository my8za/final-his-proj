import React from 'react'

const NavItem = ({menu, isActive}) => {
  return isActive === true ? (
    <div className='nav-item active'>
      <p>{menu.img} {menu.name}</p>
    </div>
    ) : (
    <div className='nav-item'>
      <p>{menu.img} {menu.name}</p>
    </div>
  )
}

export default NavItem
