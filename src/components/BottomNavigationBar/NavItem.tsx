import React from 'react'

interface NavItemProps {
  className: string
  onClick: () => void
  icon: React.ReactNode
  label: string
}

const NavItem: React.FC<NavItemProps> = ({ className, onClick, icon, label }) => (
  <div className={className} onClick={onClick}>
    {icon}
    <p className='mt-1'>{label}</p>
  </div>
)

export default NavItem
