export const indexHtml:string = `
<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sample App - Web Commands</title>
        <link rel="stylesheet" href="style.css">
        <link rel="icon" href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAACXBIWXMAAAsTAAALEwEAmpwYAAACnUlEQVR4nO1V61MSURT3H+xDf0Lfyqgv9qGXFY8JKORhihUkgyU+0nESSZOBJDEjdSoMMWeSikdpPnizLHv3dC93WXZRRmqmDzXc2YFz95zz+51zzzl3O+Avr442QZvgHyTgefJIhdpCSNjyWOAb/VomoNBMCRAnyMI7IrBljimx1f0fEFCs2DbYrNBvhn4TvFkS35eZimsgpL4wo74480AbONwvSthbIaC28W9w+xaE3wHDQCoJBi0s+CmI6ZrXqnmJcfPZ8rh99cbZZzgbMbMWCBAiv85HEAwQgauez+4O0qoxyPpaStk5LRhyBLFP5Z97+rG6RVK4o3TyGvT2QDIhGJIHIYMe2Mz0WMRhDBLeCqIEnpGww0gOkIsngK1XJXNQ/JHMSJnkGQw+hKXFegb7e0irwrr3oYRK4aZulGBAs+BxfSB+DjvMeUQEXdesd2oDJC0nr8H2Z1B1w9YmsT485M0Gfn6W6rHnYE+wVGQrLMLhXz4zWSqQwPl8AbQqtL6O5Sf3lo1X5hsO6kgXbW5AnwmsFsDoi36olbGQL9vuvFJ2utUKt7Hbt/M9R1TVqPlYDPTKVPiLputFIcs0JxA1HIfSafw/ORIJPN+i+VIN9s8WEOymYPyxMAr0LFaX2bs6mlNDoY+ZZNoY4beJc6eGftJIqz68OMk6De/zihmk9/Jjrmhl1AWjQycTUG0uzZw/PbwW/AqScgm6MRfY79MtJTZd9TrNpKN4ixECfppW8wyqS6lwOy2vodb1dfSVECivk4ukltC4bUV/SWgEyKRBq4RPUWkeMgIaUTx20HvTx8knSHAYHYZoRDycQq6MJy5Nrw0aNdZOTTQlkKIdfwXIFWQskPyyOOLZ5HvQ8mV5ouV/+EVrE7QJfnv9Aroil230H5uGAAAAAElFTkSuQmCC">
    </head>
    <body>
        <div class="container">
            <h1>Sample App - Web Commands</h1>
            <div class="row justify-end">
                <div class="col-auto">
                    <button id="saveEmbeddingsButton" class="btn primary">Save Embeddings</button>
                    <div id="saveMessage" class="message" hidden></div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <input type="text" id="commandInput" placeholder="Enter command" class="text-field">
                    <button id="submitButton" class="btn primary">Submit</button>
                    <div id="loadingIndicator" class="loading" hidden></div>
                </div>
            </div>
            <div class="row" id="urlContainer" hidden>
                <div class="col-12">
                    <div class="card">
                        <div class="card-title">URL</div>
                        <div class="card-text" id="urlText"></div>
                    </div>
                </div>
            </div>
        </div>
        <script type="module" src="src/app.ts"></script>
    </body>
</html>
`;