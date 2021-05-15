import NavBarDashBoard from '../components/NavBarDashBoard'
import AsideNav from '../components/AsideNav'
const Chat = () => {

    return (
        <div className="contenedorMenu">
            <AsideNav />
            <div className="contenedorWeb">
                <NavBarDashBoard />
                <div>
                    <iframe className="contenedorChat" src="https://e.widgetbot.io/channels/842475724334301234/842475724334301240" ></iframe>
                </div>
            </div>
        </div>


    )
}

export default Chat