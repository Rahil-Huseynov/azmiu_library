import './index.scss'

const Error = () => {

    return (
        <>
            <div className="notfound" id="notfound">
                <div className="notfound__inner">
                    <div className="notfound__404">
                        <h3 className="notfound__title">Oops! Page not found</h3>
                        <h1 className="notfound__digits">
                            <span>4</span>
                            <span>0</span>
                            <span>4</span>
                        </h1>
                    </div>
                    <h2 className="notfound__description">
                        We are sorry, but the page you requested was not found
                    </h2>
                </div>
            </div>

        </>
    )
}

export default Error