export default function Footer() {
  return (
    <div>
      <footer className='footer bg-dark'>
        <span className='text-muted'>
          {new Date().getFullYear()} © Vitaly Kolesnikov
        </span>
      </footer>
    </div>
  )
}
