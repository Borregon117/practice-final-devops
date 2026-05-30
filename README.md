# Despliegue

## Paso 1. Clonar el repositorio:
Para iniciar hay que clonar el proyecto en la carpeta designada, obviamente tomando en cuenta que ya tienes git instalado.
~~~
git clone https://github.com/Borregon117/practice-final-devops.git
~~~

## Paso 2. Construir la imagen del contenedor:
Asegúrate de tener Podman o Docker funcionando en tu sistema. Desde la terminal, en la raíz del proyecto, ejecuta el comando para construir la imagen. El comando exacto sería:
~~~
podman build -t api-inventario:latest .
~~~

## Paso 3. Levantar la aplicación localmente:
Para iniciar el servidor y la interfaz gráfica, necesitas levantar el contenedor mapeando el puerto 3000. El comando para hacerlo es:
~~~
podman run -d -p 3000:3000 --name inventario-app localhost/api-inventario:latest
~~~
Esto dejará la aplicación corriendo en segundo plano.

## Paso 4. Acceder a la interfaz web:
Abre tu navegador de preferencia y escribe la dirección:
~~~
http://localhost:3000
~~~

Ahí cargarás la vista estática del sistema de control de inventario, donde podrás agregar o eliminar artículos e interactuar con la API directamente.

## Paso 5. Verificar el pipeline en GitHub Actions:

Para comprobar que la automatización y la seguridad funcionan, ve a la página de tu repositorio en GitHub desde el navegador. Haz clic en la pestaña "Actions" ubicada en el menú superior. Selecciona la ejecución más reciente del flujo llamado "DevSecOps Pipeline". Adentro del trabajo "build-and-scan", podrás observar el log de cada herramienta (Trufflehog para secretos, npm audit para dependencias y Trivy para contenedores). Todos los pasos deben tener un icono de verificación verde, confirmando que el proceso completo terminó en estado SUCCESS.
