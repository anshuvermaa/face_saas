import ANavbar from "@/components/admin-nav";

const AdminLayout = ({
    children
  }) => {
    return (
        <div>

        <div className='main'>
        <div className='gradient' />
      </div>
      <main className='app'>
        <ANavbar />
        {children}
      </main>
        </div>
     );
  }
   
  export default AdminLayout;