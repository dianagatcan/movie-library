import './navbar.scss';
import Input from '../Input/input';
import Logo from "../../assets/logo.png"


const Navbar = (props) => {

    const sendToContainer = (search) => {
        props.sendToSearch(search);
    }
    return(
        <section className='navbar'>
            <div className='logo'>
                <img className="logo__img" src={Logo} alt="logo"/>
                <p>MOVIE LIBRARY</p>
            </div>
            <Input receivedFunction={sendToContainer} />
        </section>
    )
}

export default Navbar;