export const styleCss:string = `
/* General styles */
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f9;
    color: #333;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    width: 100%;
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

/* Headings */
h1 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #444;
}

/* Rows */
.row {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
}

.row.justify-end {
    justify-content: flex-end;
}

/* Columns */
.col-auto {
    flex: 0 0 auto;
}

.col-12 {
    flex: 0 0 100%;
}

/* Buttons */
.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn.primary {
    background-color: #007bff;
    color: #fff;
}

.btn.primary:hover {
    background-color: #0056b3;
}

/* Text fields */
.text-field {
    width: calc(100% - 120px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
}

/* Loading indicator */
.loading {
    border: 4px solid #f3f3f3;
    border-radius: 50%;
    margin-top: 10px;
    border-top: 4px solid #3498db;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Cards */
.card {
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
}

.card-title {
    font-size: 18px;
    margin-bottom: 10px;
    color: #007bff;
}

.card-text {
    font-size: 16px;
    color: #555;
}

/* Message */
.message {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 14px;
}
`;