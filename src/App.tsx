import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Routes";
// import { useTranslation } from 'react-i18next';
import "../src/assets/styles/global.scss";
// import az_flag from "./assets/icons/Flag_of_Azerbaijan.svg.png"
// import ru_flag from "./assets/icons/Flag_of_Russia.svg.png"
// import en_flag from "./assets/icons/Flag_of_the_United_Kingdom.png"
import "./App.scss"

function App() {
    // const { i18n } = useTranslation();

    // const changeLanguage = (language: string | undefined) => {
    //     i18n.changeLanguage(language);
    // };

    return (
        <>
            {/* <div>
                <div className="Login_container_language">
                    <button onClick={() => changeLanguage('az')}>
                        <img className="Login_page_flag" src={az_flag} alt="az_flag" />
                    </button>
                    <button onClick={() => changeLanguage('ru')}><img className="Login_page_flag" src={ru_flag} alt="ru_flag" /></button>
                    <button onClick={() => changeLanguage('en')}><img className="Login_page_flag" src={en_flag} alt="en_flag" /></button>
                </div>
            </div> */}
            <RouterProvider router={routes} />
        </>
    );
}

export default App;
