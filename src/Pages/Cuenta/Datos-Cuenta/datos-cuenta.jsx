import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ConfigurarContraseña from "../Configurar-Cuenta/configurar-contraseña";
import { Col, Container, Row, Stack } from "react-bootstrap";
import ConfigurarCuenta from "../Configurar-Cuenta/configurar-cuenta";
import { UsuariosContext } from "../../../context/UserContext";
import { useTranslation } from "react-i18next";
import "../../../styles/configurar-cuenta.css"
import ButtonDefault from "../../../components/ButtonDefault";

const DatosCuenta = () => {
  const { t } = useTranslation();

  const { logout, traerUnUsuario, usuario, Token, pasarStates } =
    useContext(UsuariosContext);

  {
    usuario === undefined && Token && traerUnUsuario();
  }

  const {
    mostrarDatos,
    setMostrarDatos,
    mostrarContraseña,
    setMostrarContraseña,
    mostrarConfigurarPerfil,
    setMostrarConfigurarPerfil,
  } = pasarStates;

  //Guardamos el id

  //Funcion para mostrar el contenedor de los datos
  const MostrarDatos = () => {
    setMostrarDatos(true);
    setMostrarContraseña(false);
    setMostrarConfigurarPerfil(false);
  };

  //Funcion para mostrar el contenedor para cambiar de contraseña
  const MostrarContraseña = () => {
    setMostrarContraseña(true);
    setMostrarDatos(false);
    setMostrarConfigurarPerfil(false);
  };

  //Funcion para mostrar el contenedor para configurar el perfil
  const MostrarConfigurarPerfil = () => {
    setMostrarConfigurarPerfil(true);
    setMostrarContraseña(false);
    setMostrarDatos(false);
  };

  return (
    <>
      <Container className="mx-5">
        <div className="ContenedorPerfil px-5">
          <div className="ContenedorCambiarUsuario-Contraseña">
            {/*Links para acceder a las distintas secciones */}
            <p
              onClick={MostrarDatos}
              className={`mt-3 ms-2 ${
                mostrarDatos ? "boton-seleccionado" : "boton-desSeleccionado"
              }`}
            >
              Datos de Usuario
            </p>
            <p
              onClick={MostrarContraseña}
              className={`mt-3 ms-2 ${
                mostrarContraseña
                  ? "boton-seleccionado"
                  : "boton-desSeleccionado"
              }`}
            >
              Cambiar Contraseña
            </p>
            {mostrarConfigurarPerfil === true && (
              <p
                className={`mt-3 ms-2 ${
                  mostrarConfigurarPerfil
                    ? "boton-seleccionado"
                    : "boton-desSeleccionado"
                }`}
              >
                Cambiar Datos
              </p>
            )}
          </div>
          {/*Expresion CondicionaL que muestra los datos si mostrarDatos es true */}
          {mostrarDatos === true && usuario && (
            <div className="Contenedor-Para-Centrar">
              <div className={`Contenedor-Datos`}>
                <div>
                  <h3>{t("miPerfil")}</h3>
                </div>
                <div>
                  <p>
                    {t("nombre")} : {usuario.nombre}
                  </p>
                  <p>
                    {t("apellido")} : {usuario.apellido}
                  </p>
                  <p>Email : {usuario.email}</p>
                </div>
                <ButtonDefault namebtn={t("editarPerfil")} Funcion={MostrarConfigurarPerfil} />
              </div>
            </div>
          )}
          {/*Expresion CondicionaL que muestra el contenedor para cambiar la contraseña si mostrarContraseña es true */}
          {mostrarContraseña === true && <ConfigurarContraseña />}
          {/*Expresion CondicionaL que muestra el contenedor para cambiar los datos si mostrarConfigurarPerfil es true */}
          {mostrarConfigurarPerfil === true && <ConfigurarCuenta />}
        </div>
      </Container>
    </>
  );
};

export default DatosCuenta;
