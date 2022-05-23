# BlockVote: Voto electrónico usando Blockchain y reconocimiento facial.

## Indice

- [1. Motivacion](#1-Motivacion)
- [2. Uso en entorno local](#2-Uso-en-entorno-local)
- [3. Demo](#3-Demo)

---

## 1. Motivación

BlockVote es una aplicación web descentralizada(DApp) que permite simular la votación electrónica que realizen personas dentro de una encuesta en específico; así como el correcto registro de los votos que se asignen a cada una de las opciones de la encuesta almacenandose ellas una Blockchain.También cabe resaltar la importancia del reconocimiento facial dentro de su funcionamiento, ya que si bien una persona es registrada con un determinado DNI, Correo y Contraseña ; para hacer más seguro este sistema se hizo uso de librerías de reconocimiento facial que ofrece JavaScript tales como [Face-api.js](https://github.com/justadudewhohacks/face-api.js/), la cual através de la foto que es almacenada, y el DNI ingresado con anterioridad en la etapa de Login de la aplicación; es posible consultar si la foto asociada al DNI digitado corresponde a la persona que esta delante de la cámara web al momento de la votación.

---

## 2. Uso en entorno local

Para el uso en entorno local de BlockDoc se requiere tener instalado una version de igual o superior a Python 3.8 , se recomienda tener instalado el IDE **Visual Studio Code** , **git**, **Ganache** y **Metamask**. Se requiere instalar las siguientes librerias.

- Flask==1.1.4
- Pyrebase4==4.5.0
- Ganache==2.5.4

Se recomienda el uso de un entorno virtual usando virtualenv. Así como también la descarga de la Wallet de desarrollo [Metamask](https://metamask.io/).

1. Abrir cmd con permisos de administrador.

2. Ingresa a la ruta donde estara el proyecto.

3. Añadir los siguientes comandos :

   - `git clone https://github.com/elterribleabuelo/Blockchain-VotoElectronico.git`
   - `git init`

4. Ingresar a la carpeta servicios y ejecutar los siguientes comandos:

   - `python -m venv nombre_de_mi_entorno`
   - `.\nombre_de_mi_entorno\Scripts\activate`

5. Instalar las librerias con el comando `pip install -r requirements.txt`

6. Abrir Ganache y copiar la dirección de una de las cuentas que ofrece. Ejemplo: `0xE193268f9d05E6e2d173ef374dd222B6a9E16732`.

7. Abrir la ruta `localhost:4200` y abrir Metamask desde ahí. Luego conectarnos a `localhost:7545`, dentro de nuestra Wallet vamos al menú principal y seleccionamos la opción `Importar cuenta`; luego seleccionamos la opcion de `Private Key` y pegamos el valor copiado.

8. Ahora debemos seguir los siguientes dos pasos:

   8.1. Entrar a la carpeta frontend del proyecto y ejecutar los siguientes comandos:
   
   - `nvm install 12.22.10`
   - `nvm use 12.22.10`
   - `npm install`
   
   **Nota**: Antes de esto ya debe tener instalado [Nodejs](https://nodejs.org/es/) en su computador 

     8.2. Entrar a la carpeta servicios del proyecto y ejecuta el siguinete comando:

   - `python index.py`

9. Vamos a la ruta:localhost:4200 y creamos nuestra cuenta (La cuenta que se cree se hará con los permisos que se le ofrece al usuario votante).

10. Para terminar el registro se necesitan algunos datos adicionales tales como: DNI,Apellidos, Nombre y foto de perfil, por lo cual si se desea hacer uso de el proyecto en su totalidad se debe contactar al correo `alexgh237@gmail.com`.

---

## 3.Demo

<div style="text-align: center;">
  <br><br/>
  <!--<a href = "https://www.youtube.com/watch?v=BHlcNKi3QMI"><img src="assets/PortadaBlockDoc.png"></a>-->
  <br><br/>
</div>
