import { useEffect, useState } from "react";
import logo from "../../../assets/icons/azmiu.webp";
import "./index.scss";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  const { t } = useTranslation();

  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newErrors: { username?: string; password?: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = t("usernameError");
    }

    if (!formData.password.trim()) {
      newErrors.password = t("passwordError");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Daxil edilmiş məlumatlar:", formData);
  };

  useEffect(() => {
    const gradient =
      "radial-gradient(circle at 11% 63%, rgba(82, 82, 82, 0.06) 0%, rgba(82, 82, 82, 0.06) 25%, rgba(136, 136, 136, 0.06) 25%, rgba(136, 136, 136, 0.06) 50%, rgba(191, 191, 191, 0.06) 50%, rgba(191, 191, 191, 0.06) 75%, rgba(245, 245, 245, 0.06) 75%, rgba(245, 245, 245, 0.06) 100%), radial-gradient(circle at 16% 28%, rgba(80, 80, 80, 0.06) 0%, rgba(80, 80, 80, 0.06) 25%, rgba(68, 68, 68, 0.06) 25%, rgba(68, 68, 68, 0.06) 50%, rgba(56, 56, 56, 0.06) 50%, rgba(56, 56, 56, 0.06) 75%, rgba(44, 44, 44, 0.06) 75%, rgba(44, 44, 44, 0.06) 100%), radial-gradient(circle at 51% 54%, rgba(179, 179, 179, 0.06) 0%, rgba(179, 179, 179, 0.06) 25%, rgba(121, 121, 121, 0.06) 25%, rgba(121, 121, 121, 0.06) 50%, rgba(62, 62, 62, 0.06) 50%, rgba(62, 62, 62, 0.06) 75%, rgba(4, 4, 4, 0.06) 75%, rgba(4, 4, 4, 0.06) 100%), linear-gradient(303deg, rgb(255, 255, 255), rgb(255, 255, 255))";

    if (location.pathname === "/client/login" || location.pathname === "/admin/login") {
      document.body.style.backgroundImage = gradient;
    } else {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundColor = "white";
    }

    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundColor = "";
    };
  }, [location.pathname]);

  return (
    <div className="containerLoginPage">
      <div className="containerLoginPage__item">
        <div className="containerLoginPage__items">
          <img src={logo} alt="logo" className="containerLoginPage__arrowIcon" />
          <p className="containerLoginPage__itemUniversityName">{t('universityName')}</p>
          <p className="containerLoginPage__itemSystemEntry">{t('loginSystem')}</p>

          <form className="containerLoginPage__itemInputContainer" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder={t('username')}
              className={`containerLoginPage__itemInputField ${errors.username ? "containerLoginPage__itemInputField--error" : ""}`}
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="containerLoginPage__itemInputContainerErrorMessage">{errors.username}</p>}

            <input
              type="password"
              name="password"
              placeholder={t('password')}
              className={`containerLoginPage__itemInputField ${errors.password ? "containerLoginPage__itemInputField--error" : ""}`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="containerLoginPage__itemInputContainerErrorMessage">{errors.password}</p>}

            <button type="submit" className="containerLoginPage__itemButton">
              {t('loginbutton')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
