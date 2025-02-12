import Navbar from "./components/navbar"

const Layout = ({ children, cartLength }) => {
    return (
        <div>
            <Navbar cartLength={cartLength} />
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout