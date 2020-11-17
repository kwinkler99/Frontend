const navStyle = {
    backgroundColor: '#333',
    'overflow': 'hidden'
}

const linkStyle = {
    float: 'left',
    color: '#f2f2f2',
    textAlign: 'center',
    padding: '14px 16px',
    textDecoration: 'none',
    fontSize: '17px'
}



const Navbar = () => (
  <div style={navStyle}>
    <a href="/" style={linkStyle}>Home</a>
    <a href="/cities" style={linkStyle}>Cities</a>
    <a href="/about" style={linkStyle}>About</a>
  </div> 
)

export default Navbar;