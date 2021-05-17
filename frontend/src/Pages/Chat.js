import Header from '../components/Header'

const Chat = () => {

    return (
        <div className="contenedorMenu">
            <div className="contenedorWeb">
                <Header />
                <div>
                    <iframe className="contenedorChat" src="https://e.widgetbot.io/channels/842475724334301234/842475724334301240" ></iframe>
                </div>
            </div>
        </div>


    )
}

export default Chat