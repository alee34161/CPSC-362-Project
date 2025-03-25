// Importing React library for creating components
import React from 'react';

// Importing the Cafe component from the components folder
import Cafe from './components/Cafe';

function App() {
    return (
        // Main application container
        <div className="App">
            {/* Rendering the Cafe component */}
            <Cafe />
        </div>
    );
}

// Exporting the App component as the default export
export default App;