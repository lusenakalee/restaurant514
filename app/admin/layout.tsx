import { Nav, NavLink } from "./_components/Nav"

export const dynamic = "force-dynamic"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
        <div className="relative z-10">
         <Nav >
        <NavLink href="/admin/menu">Menu</NavLink>
        <NavLink href="/admin/categories">Categories</NavLink>
      </Nav>
      </div>
     
      <div className="container my-6 pb-10 h-screen ">{children}</div>
    </div>
  )
}