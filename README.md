Proyecto Final del curso de Diseñador Full Stack, archivos locales terminados.
Al ejecutar la web en netlify, se debe esperar un tiempo para que el servidor de la API se ejecute.

/------------------------------- Figma--------------------------------/

https://www.figma.com/design/C4r9JgnWBpTRVSjiQUHw7D/Gymnasio?node-id=682-5&t=gKspL5sBxk0rAGDp-1

/------------------- Para ejecutar el Proyecto-----------------------/

1) Instalar Modulo principal del proyecto

2) Instalar los modulos de cada carpeta:

Desde la carpeta Raiz, usando terminal

2.1) cd (Backend o Frontend)
2.2) npm install


3) Ejecutar con:
"Desde la carpeta Principal"

CORRER backend + frontend: npm run dev


/-----------------Servidores configurados ------------------------/

Accede al Frontend en: http://localhost:3000

Accede al Backend en: http://localhost:5000 (o el puerto configurado).


Si uso pawershell // $env:NODE_OPTIONS="--openssl-legacy-provider"; npm run dev


/------------------Cuentas admin de prueba -------------------------/

[
  { "username": "admin", "password": "admin123", "role": "admin" }
]


/-----------------Pruebas al detalle con Jest------------------------/

npm run test -- --coverage --watchAll=false


/-----------------------------------------Resultado de las pruebas --------------------------------------/

-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------|---------|----------|---------|---------|-------------------
All files              |   19.73 |    13.07 |   19.28 |   19.52 |                   
 src                   |       0 |      100 |       0 |       0 |                   
  App.js               |       0 |      100 |       0 |       0 | 7-8               
  configapi.js         |       0 |      100 |     100 |       0 | 1                 
 src/assets            |       0 |        0 |       0 |       0 | 
  assets.js            |       0 |        0 |       0 |       0 | 
 src/components        |   26.73 |    27.65 |    22.5 |    23.4 | 
  Cart.jsx             |   72.72 |       70 |   54.54 |   66.66 | 20,29,36-53      
  Footer.js            |       0 |        0 |       0 |       0 | 4-51
  Navbar.js            |       0 |        0 |       0 |       0 | 9-82
  ProductDetail.js     |       0 |        0 |       0 |       0 | 4-30
  PromotionSlider.js   |       0 |        0 |       0 |       0 | 5-111
  ProtectedRoute.jsx   |     100 |      100 |     100 |     100 | 
 src/components/user   |    6.29 |        0 |     3.7 |    6.92 | 
  AlertProfile.jsx     |       0 |        0 |       0 |       0 | 4-7
  ChatWindow.jsx       |       0 |        0 |       0 |       0 | 5-62
  DaySummary.jsx       |     100 |      100 |     100 |     100 | 
  MenuOptions.jsx      |       0 |      100 |       0 |       0 | 6-13
  NavegacionUser.jsx   |       0 |        0 |       0 |       0 | 4-38
  ProfileCard.jsx      |       0 |      100 |       0 |       0 | 7-8
  RoutineCalendar.jsx  |       0 |        0 |       0 |       0 | 10-254
  TrainersList.jsx     |       0 |        0 |       0 |       0 | 6-29
  UserMenu.jsx         |       0 |      100 |       0 |       0 | 4-5
 src/layouts           |       0 |      100 |       0 |       0 | 
  MainLayout.js        |       0 |      100 |       0 |       0 | 6-7
 src/pages             |    8.13 |      4.1 |    8.51 |    8.58 | 
  AboutDesktop.jsx     |       0 |      100 |       0 |       0 | 5-6
  CalendarUser.jsx     |       0 |      100 |       0 |       0 | 6-9
  ChatWindowsEN.jsx    |       0 |      100 |       0 |       0 | 6-8
  CheckoutShop.jsx     |       0 |        0 |       0 |       0 | 8-150
  ContactDesktop.jsx   |       0 |      100 |       0 |       0 | 5-6
  CreateDesktop.jsx    |       0 |        0 |       0 |       0 | 4-46
  HomeDesktop.jsx      |       0 |      100 |       0 |       0 | 5-6
  LoginDesktop.jsx     |   51.85 |       25 |   66.66 |   51.85 | 24-43,75-88      
  ProductDetail.jsx    |       0 |        0 |       0 |       0 | 6-30
  ProfileOrders.jsx    |       0 |        0 |       0 |       0 | 4-30
  ProfileScreen.jsx    |       0 |        0 |       0 |       0 | 5-74
  ShopDesktop.jsx      |       0 |        0 |       0 |       0 | 9-48
  UserDashboard.jsx    |       0 |      100 |       0 |       0 | 11-21
 src/redux             |   38.33 |     29.5 |   43.39 |   39.62 | 
  SliceTrainersList.js |       0 |        0 |       0 |       0 | 4-40
  exerciseSlice.js     |       0 |        0 |       0 |       0 | 5-143
  profileActions.js    |       0 |        0 |       0 |       0 | 4-17
  profileReducer.js    |     100 |      100 |     100 |     100 | 
  purchasesSlice.js    |     100 |       50 |     100 |     100 | 12-55
  routineSlice.js      |       0 |      100 |       0 |       0 | 4-28
  shopSlice.js         |     100 |    83.33 |     100 |     100 | 34
  store.js             |       0 |      100 |     100 |       0 | 11
  trainersSlice.js     |      80 |      100 |      80 |      80 | 5-6
  userRoutineSlice.js  |   83.33 |      100 |      50 |      80 | 19
 src/routes            |       0 |      100 |       0 |       0 | 
  AppRoutes.js         |       0 |      100 |       0 |       0 | 19-20
-----------------------|---------|----------|---------|---------|-------------------

Test Suites: 8 passed, 8 total
Tests:       29 passed, 29 total
Snapshots:   0 total
Time:        4.356 s
