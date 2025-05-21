import MenuTable from "@/components/MenuTable";




export default function page() {

  return (
  <div
      className="min-h-screen text-white"
      style={{
        backgroundImage:
          'url(https://i.imgur.com/er8DtBW.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h2 className="text-4xl underline p-12 font-bold text-amber-200  ">Our Menu</h2>
      <div className="flex flex-1 justify-center items-center p-12">

      <MenuTable/>
      </div>

    </div>
  )
}
