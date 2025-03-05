import { useTranslation } from "react-i18next";
import './index.scss'
import az_flag from "../../../assets/icons/Flag_of_Azerbaijan.svg.png"
import ru_flag from "../../../assets/icons/Flag_of_Russia.svg.png"
import en_flag from "../../../assets/icons/Flag_of_the_United_Kingdom.png"
const Language = () => {
        const { i18n } = useTranslation();
    
        const changeLanguage = (language: string | undefined) => {
            i18n.changeLanguage(language);
        };
    return(
    <div>
        <div className="LanguageContainer">
            <button onClick={() => changeLanguage('az')}>
                <img className="LanguageContainer_flag" src={az_flag} alt="az_flag" />
            </button>
            <button onClick={() => changeLanguage('ru')}><img className="LanguageContainer_flag" src={ru_flag} alt="ru_flag" /></button>
            <button onClick={() => changeLanguage('en')}><img className="LanguageContainer_flag" src={en_flag} alt="en_flag" /></button>
        </div>
    </div>
    )
}
export default Language