/*import classes from "./ControlPanel.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import MainButton from "../Header/MainButton/MainButton";
import { Navigate } from "react-router-dom";
import ModalWindow from "../ModalWindow/ModalWindow";
import HeaderClasses from "..//Header/Header.module.css";
import ModalClasses from "../ModalWindow/ModalWindow.module.css";
import ActionsBlock from "../ModalWindow/ActionsBlock/ActionsBlock";
export default function ControlPanel({
  activeTab,
  setActiveTab,
  buttonLabels,
  Icon,
  redirectPath,
  user,
  dropdownItems = {
    Добавить: "/track-add",
    Редактировать: "/track-edit",
    Удалить: (Modaltitle = "Вы уверены что хотите удалить данный трек?"),
  },
}) {
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const toggleMenu = () => {
    setIsOpenProfile((prev) => !prev);
  };
  const [isOpenModal, setIsOpen] = useState(false);
  const ShowModal = () => setIsOpen(!isOpenModal);
  return (
    <div className={classes["tabs"]}>
      {buttonLabels.map((label, index) => (
        <button
          key={index}
          className={`${classes["tab-button"]} ${
            activeTab === label ? classes["active"] : ""
          }`}
          onClick={() => setActiveTab(label)}
        >
          {label}
        </button>
      ))}

      <div className={classes["relative-container"]}>
        {user.type === "admin" ? (
          <button className={`${classes["plus-button"]}`} onClick={toggleMenu}>
            <img
              src={Icon}
              alt="plus_cover"
              className={classes["plus-button"]}
            />
          </button>
        ) : null}

        <DropdownMenu
          isOpen={isOpenProfile}
          setIsOpen={setIsOpenProfile}
          className={`${classes["dropdown-menu"]} ${
            isOpenProfile ? classes.active : ""
          }`}
        >
          {Object.keys(dropdownItems).map((item) =>
            item === "Удалить" ? (
              <MainButton onClick={() => setIsOpen(true)} key={item}>
                {item}
              </MainButton>
            ) : (
              <MainButton onClick={() => setIsOpenProfile(false)} key={item}>
                <Link to={dropdownItems[item]}>{item}</Link>
              </MainButton>
            )
          )}
        </DropdownMenu>
        <ModalWindow isOpen={isOpenModal}>
          <h3 style={{ textAlign: "center" }}>{dropdownItems["Удалить"]}</h3>
          <ActionsBlock>
            <MainButton
              className={`${HeaderClasses["logout-btn"]} ${ModalClasses.danger_button}`}
            >
              Удалить
            </MainButton>
            <MainButton
              className={`${ModalClasses.white_button}`}
              onClick={ShowModal}
            >
              Отмена
            </MainButton>
          </ActionsBlock>
        </ModalWindow>
      </div>
    </div>
  );
}
*/
import classes from "./ControlPanel.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import MainButton from "../Header/MainButton/MainButton";
import ModalWindow from "../ModalWindow/ModalWindow";
import HeaderClasses from "..//Header/Header.module.css";
import ModalClasses from "../ModalWindow/ModalWindow.module.css";
import ActionsBlock from "../ModalWindow/ActionsBlock/ActionsBlock";

export default function ControlPanel({
  activeTab,
  setActiveTab,
  buttonLabels,
  Icon,
  redirectPath,
  user,
  buttonConfig = {
    Добавить: {
      type: "Link",
      path: "/track-add",
    },
    Редактировать: {
      type: "Link",
      path: "/track-edit",
    },
    Удалить: {
      type: "WindowOnDeleteFunc",
      title: "Вы уверены что хотите удалить трек?",
      func: () => {
        console.log("Сработало");
      },
    },
  },
}) {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenModal, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpenProfile((prev) => !prev);
  };

  const ShowModal = () => setIsOpen(!isOpenModal);

  return (
    <div className={classes["tabs"]}>
      {buttonLabels.map((label, index) => (
        <button
          key={index}
          className={`${classes["tab-button"]} ${
            activeTab === label ? classes["active"] : ""
          }`}
          onClick={() => setActiveTab(label)}
        >
          {label}
        </button>
      ))}

      <div className={classes["relative-container"]}>
        {user.type === "admin" ? (
          <button className={`${classes["plus-button"]}`} onClick={toggleMenu}>
            <img
              src={Icon}
              alt="plus_cover"
              className={classes["plus-button"]}
            />
          </button>
        ) : null}

        <DropdownMenu
          isOpen={isOpenProfile}
          setIsOpen={setIsOpenProfile}
          className={`${classes["dropdown-menu"]} ${
            isOpenProfile ? classes.active : ""
          }`}
        >
          {Object.keys(buttonConfig).map((item) => {
            const buttonConfigItem = buttonConfig[item];

            if (buttonConfigItem.type === "Link") {
              return (
                <MainButton onClick={() => setIsOpenProfile(false)} key={item}>
                  <Link to={buttonConfigItem.path}>{item}</Link>
                </MainButton>
              );
            }

            if (buttonConfigItem.type === "Func") {
              return (
                <MainButton onClick={buttonConfigItem.func} key={item}>
                  {item}
                </MainButton>
              );
            }

            if (buttonConfigItem.type === "WindowOnDeleteFunc") {
              return (
                <MainButton
                  className={`${HeaderClasses["logout-btn"]} ${ModalClasses.danger_button}`}
                  onClick={ShowModal}
                  key={item}
                >
                  Удалить
                </MainButton>
              );
            }

            return null;
          })}
        </DropdownMenu>

        <ModalWindow isOpen={isOpenModal}>
          <h3 style={{ textAlign: "center" }}>
            {buttonConfig["Удалить"].title}
          </h3>
          <ActionsBlock>
            <MainButton
              onClick={buttonConfig["Удалить"].func}
              className={`${HeaderClasses["logout-btn"]} ${ModalClasses.danger_button}`}
            >
              Удалить
            </MainButton>
            <MainButton
              className={`${ModalClasses.white_button}`}
              onClick={ShowModal}
            >
              Отмена
            </MainButton>
          </ActionsBlock>
        </ModalWindow>
      </div>
    </div>
  );
}
