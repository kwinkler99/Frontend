const navStyle = {
    'background-color': '#333',
    'overflow': 'hidden'
}

const linkStyle = {
    float: 'left',
    color: '#f2f2f2',
    'text-align': 'center',
    padding: '14px 16px',
    'text-decoration': 'none',
    'font-size': '17px'
}

const Navbar = () => (
  <div style={navStyle}>
    <a href="" style={linkStyle}>Home</a>
    <a href="" style={linkStyle}>Cities</a>
    <a href="" style={linkStyle}>About</a>
  </div> 
)

export default Navbar;