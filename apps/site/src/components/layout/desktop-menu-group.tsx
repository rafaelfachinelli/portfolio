'use client'

import { useState } from 'react'

/**
 * The `<li>` of a desktop dropdown. The panel opens in CSS (hover or focus
 * inside); this wrapper only closes it after a link is clicked, since the
 * pointer and the focus would otherwise keep it open on the new page. It opens
 * again once the pointer leaves the menu.
 */
export function DesktopMenuGroup({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [closed, setClosed] = useState(false)

  return (
    <li
      className="group/menu relative"
      data-closed={closed || undefined}
      onClickCapture={event => {
        if ((event.target as HTMLElement).closest('a')) {
          setClosed(true)
          ;(document.activeElement as HTMLElement | null)?.blur()
        }
      }}
      onMouseLeave={() => setClosed(false)}
    >
      {children}
    </li>
  )
}
