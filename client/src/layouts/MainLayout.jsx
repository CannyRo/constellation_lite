import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div>
      <header>
        <h1>Constellation Lite</h1>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout