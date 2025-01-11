# Code Citations

## License: MIT
https://github.com/iwasawa15/mental_diary/tree/4e322a49ecb1e1f2f1ce7bbd7effd1091fc29227/pages/components/forms/index.tsx

```
sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
             noValidate
             autoComplete="off"
           >
             <div>
               <TextField
                 required
                 id="outlined-required"
                 label="Required"
                 defaultValue="Hello World
```

## License: MIT
https://github.com/FranDanInc/pm-test-branch/tree/74a9a8ca36d3844a0ab11062d020ebdd39565a78/src/content/pages/Components/Forms/index.js

```
<Box
             component="form"
             sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
             noValidate
             autoComplete="off"
           >
             <div>
               <TextField
                 required
                 id="outlined-required"
                 label="
```

## License: unknown
https://github.com/Vishnu-62/vac_portfolio/tree/dd971595b0748041a9dcabb483bc490fd952935c/viteapp/src/main.jsx

```
main.jsx
   import React from 'react';
   import ReactDOM from 'react-dom';
   import App from './App';

   ReactDOM.render(
     <React.StrictMode>
       <App />
     </React.StrictMode>,
     document.getElementById('root')
   );
   ```

~~~~~

ttsabbott: how can I have a react spa with material ui on one page and bootstrap on another page?

Workspace: Collecting workspace information

To use Material UI on one page and Bootstrap on another page in a React Single Page Application (SPA), you can import the respective CSS and components only on the pages where they are needed. Here's how you can do it:

1. **Install Material UI and Bootstrap**:
   ```sh
   npm install @mui/material @emotion/react @emotion/styled bootstrap react-bootstrap
   ```

2. **Create separate pages for Material UI and Bootstrap**:
   - **Material UI Page**:
     ```jsx
     // src/pages/MaterialUIPage.jsx
     import Box from '@mui/material/Box';
     import TextField from '@mui/material/TextField';
     import Container from '@mui/material/Container';

     const MaterialUIPage = () => {
       return (
         <Container maxWidth="sm">
           <Box
             component="form"
             sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
             noValidate
             autoComplete="off"
           >
             <div>
               <TextField
                 required
                 id="outlined-required"
                 label="Required"
                 defaultValue="Hello World"
               />
               <TextField
                 id="outlined-search"
                 label="Search field"
                 type="search"
               />
             </div>
           </Box>
         </Container>
       );
     };

     export default MaterialUIPage;
     ```

   - **Bootstrap Page**:
     ```jsx
     // src/pages/BootstrapPage.jsx
     import 'bootstrap/dist/css/bootstrap.min.css';
     import { Button, Container, Row, Col } from 'react-bootstrap';

     const BootstrapPage = () => {
       return (
         <Container>
           <Row>
             <Col>
               <Button variant="primary">Primary Button</Button>
             </Col>
           </Row>
         </Container>
       );
     };

     export default BootstrapPage;
     ```

3. **Set up routing in your main App component**:
   ```jsx
   // src/App.jsx
   import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
   import MaterialUIPage from './pages/MaterialUIPage';
   import BootstrapPage from './pages/BootstrapPage';

   const App = () => {
     return (
       <Router>
         <Routes>
           <Route path="/material-ui" element={<MaterialUIPage />} />
           <Route path="/bootstrap" element={<BootstrapPage />} />
         </Routes>
       </Router>
     );
   };

   export default App;
   ```

4. **Update your entry point**:
   ```jsx
   // src/main.jsx
   import React from 'react';
   import ReactDOM from 'react-dom';
   import App from './App';

   ReactDOM.render(
     <React.StrictMode>
       <App />
     </React.StrictMode>,
     document.getElementById('root')
   );
   ```

With this setup, you can navigate to `/material-ui` to see the Material UI components and `/bootstrap` to see the Bootstrap components. Each page will only load the necessary CSS and components for the respective library.

Similar code found with 2 license types
