import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <header>
            <div className="container">
                <Link to="/activities">
                    <h1>Jet Set Go</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar