export default function Footer() {
  return (
    <footer className='footer'>
      <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)' }}>
        {new Date().getFullYear()} © Vitaly Kolesnikov
      </span>
    </footer>
  )
}
