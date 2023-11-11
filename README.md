# Arch-Cloud

**Autor:** Luis Emilio Maldonado Rodriguez

## Descripción del Proyecto

El manejo eficiente de archivos en la nube es esencial en la actualidad, brindando acceso remoto, respaldo seguro, colaboración efectiva y ahorro de espacio local. "CloudArch" (CloudArchivos) es un sistema de gestión de archivos en la nube diseñado para una pequeña empresa, permitiendo la transferencia segura de información entre empleados.

## Objetivos

### Objetivo General

Aplicar conocimientos adquiridos para crear documentación y software que automatice procesos y almacene información de manera segura y eficiente.

### Objetivos Específicos

1. Diseñar y desarrollar una aplicación web que simule un sistema de archivos básico.
2. Utilizar MongoDB para gestionar una base de datos NoSQL.
3. Crear una REST API con NodeJS para la recolección y manejo de datos.
4. Desarrollar una interfaz gráfica amigable para interactuar con la base de datos.
5. Aplicar buenas prácticas en el desarrollo de la aplicación y la base de datos.
6. Implementar un entorno de desarrollo y despliegue eficiente y escalable utilizando Docker.

## Descripción Detallada

El sistema cuenta con un sistema de inicio de sesión para usuarios con roles de Empleado y Administrador.

### Funcionalidades de Empleado

1. **Acceso a Sistema de Archivos:**
   - Directorios: Raíz y Compartido.
   - Restricción de movimiento entre Raíz y Compartido.

2. **Gestión de Ficheros y Archivos:**
   - Explorador de archivos con operaciones en el directorio raíz.
   - Operaciones incluyen crear, editar, copiar, mover y eliminar archivos/directorios.

3. **Compartir Archivos:**
   - Compartir archivos con otros usuarios.
   - Historial de archivos compartidos.

4. **Cambio de Contraseña:**
   - Funcionalidad para cambiar la contraseña del usuario.

### Funcionalidades de Administrador

1. **Crear Trabajadores:**
   - Capacidad para crear nuevos usuarios.

2. **Acceso a Papelera:**
   - Visualización de archivos eliminados.
   - Acceso al contenido de archivos eliminados.

### Acceso a Sistema de Archivos

- Cada usuario tiene su espacio con Raíz y Compartido.
- Restricción de extensiones a ".txt" y ".html".

### Gestión de Ficheros y Archivos

- Operaciones como crear, editar, copiar, mover y eliminar.
- Creación de archivos con extensión seleccionable.
- Operaciones específicas solo en el directorio raíz.

### Compartir Archivo

- Compartir archivos con otros usuarios.
- Historial de archivos compartidos.

### Acceso a la Papelera

- Visualización de archivos eliminados.
- Acceso al contenido de archivos eliminados solo para administradores.

## Aspectos Importantes

- La implementación puede ser en una aplicación de escritorio o web.
- Sistema operativo, IDE y herramienta para diagrama entidad-relación son elecciones libres del estudiante.

---

